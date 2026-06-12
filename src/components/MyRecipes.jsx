import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useState } from "react";
import "./MyRecipes.css";
import {
  deleteRecipeAPI,
  updateRecipeAPI,
  toggleFavoriteAPI,
  addRecipeAPI
} from "../services/api";

function MyRecipes({ recipes, setRecipes }) {

  const [editRecipe, setEditRecipe] = useState(null);
  const [deletedItem, setDeletedItem] = useState(null);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  // 🗑️ DELETE
 const handleDelete = async (id) => {
  try {
    await deleteRecipeAPI(id);

    const updated = recipes.filter(
      (r) => r._id !== id && r.id !== id
    );

    setRecipes(updated);

    toast.error("🗑️ Recipe deleted!");
  } catch (error) {
    console.log("Deleting ID:", id);
  }
};

  // ↩️ UNDO DELETE
  const handleUndo = async () => {
    if (!deletedItem) return;

    try {
      const restored = await addRecipeAPI(deletedItem);

      setRecipes([...recipes, restored.data]);

      setDeletedItem(null);

      toast.success("↩️ Undo successful!");
    } catch (error) {
      console.log(error);
    }
  };

  // ✏️ EDIT OPEN
  const handleEdit = (recipe) => {
    setEditRecipe(recipe);
  };

  // 💾 UPDATE
  const handleUpdate = async () => {
    try {
      const res = await updateRecipeAPI(editRecipe._id, editRecipe);

      const updatedList = recipes.map((r) =>
        r._id === editRecipe._id ? res.data : r
      );

      setRecipes(updatedList);
      setEditRecipe(null);

      toast.success("✏️ Recipe updated!");
    } catch (error) {
      console.log("Update error:", error);
    }
  };

  // ❤️ FAVORITE
  const handleFavorite = async (id) => {
  try {
    const res = await toggleFavoriteAPI(id);

    const updated = recipes.map((r) =>
      r._id === id ? res.data : r
    );

    setRecipes(updated);

    // ✅ ADD THIS (SYNC FAVORITES)
    const fav = updated.filter((r) => r.isFavorite === true);
    localStorage.setItem("favorites", JSON.stringify(fav));

    toast.success("❤️ Favorite updated!");
  } catch (error) {
    console.log(error);
  }
};

  // 👁 OPEN POPUP
  const openRecipe = (recipe) => {
    setSelectedRecipe(recipe);
  };

  return (
    <div className="my-recipes">
      <h2>📚 My Recipes</h2>

        <div className="search-box">
          <input
             type="text"
             placeholder="🔍 Search recipes..."
             value={search}
             onChange={(e) => setSearch(e.target.value)}
            />
        </div>

      <div className="my-recipes-grid">

        {recipes
               .filter((recipe) =>
               recipe.name.toLowerCase().includes(search.toLowerCase())
                  )
                 .map((recipe) => (
          <div className="my-recipe-card" key={recipe._id}>

            <img
              src={recipe.image || "https://via.placeholder.com/300"}
              alt={recipe.name}
            />

            <div className="recipe-info">

              <h3>{recipe.name}</h3>

              <p>🔥 {recipe.calories} kcal</p>
              <p>💪 {recipe.protein} g protein</p>
              <p>🩸 {recipe.iron} mg iron</p>

            <div className="recipe-actions">

                 <button
                   className={`heart-btn ${recipe.isFavorite ? "active" : ""}`}
                   onClick={() => {
                   handleFavorite(recipe._id);
                   navigate("/favorites");
                   }}
                   >
                   ❤️
                 </button>

                  <button
                   className="action-btn"
                   onClick={() => handleEdit(recipe)}
                  >
                   ✏️
                  </button>

                   <button
                    className="action-btn"
                    onClick={() => handleDelete(recipe._id)}
                  >
                      🗑️
                  </button>

                  <button
                   className="action-btn"
                   onClick={() => handleDelete(recipe._id || recipe.id)}
                  >
                    👁️
                  </button>

                </div>

              </div>
            </div>
        ))}

      </div>

      {/* ✏️ EDIT POPUP */}
      {editRecipe && (
        <div className="edit-popup">
          <div className="edit-box">

            <h3>✏️ Edit Recipe</h3>

            <input
              value={editRecipe.name}
              onChange={(e) =>
                setEditRecipe({ ...editRecipe, name: e.target.value })
              }
              placeholder="Name"
            />

            <input
              value={editRecipe.calories}
              onChange={(e) =>
                setEditRecipe({ ...editRecipe, calories: e.target.value })
              }
              placeholder="Calories"
            />

            <input
              value={editRecipe.protein}
              onChange={(e) =>
                setEditRecipe({ ...editRecipe, protein: e.target.value })
              }
              placeholder="Protein"
            />

            <input
              value={editRecipe.iron}
              onChange={(e) =>
                setEditRecipe({ ...editRecipe, iron: e.target.value })
              }
              placeholder="Iron"
            />

            <button onClick={handleUpdate}>💾 Save</button>
            <button onClick={() => setEditRecipe(null)}>❌ Cancel</button>

          </div>
        </div>
      )}

      {/* 👁 RECIPE DETAIL POPUP */}
      {selectedRecipe && (
        <div className="popup-overlay" onClick={() => setSelectedRecipe(null)}>

          <div className="popup-card" onClick={(e) => e.stopPropagation()}>

            <img
              src={selectedRecipe.image}
              alt={selectedRecipe.name}
              className="popup-img"
            />

            <h2>{selectedRecipe.name}</h2>

            <p>🔥 Calories: {selectedRecipe.calories}</p>
            <p>💪 Protein: {selectedRecipe.protein}</p>
            <p>🩸 Iron: {selectedRecipe.iron}</p>

            <hr />

            <h3>🥕 Ingredients</h3>
            <p>{selectedRecipe.ingredients}</p>

            <h3>👨‍🍳 Steps</h3>
            <p>{selectedRecipe.steps}</p>

            <button
              className="close-btn"
              onClick={() => setSelectedRecipe(null)}
            >
              ❌ Close
            </button>

          </div>
        </div>
      )}

    </div>
  );
}

export default MyRecipes;