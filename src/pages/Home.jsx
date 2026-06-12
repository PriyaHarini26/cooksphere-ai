import "./Home.css";
import { useState, useEffect } from "react";
import { getRecipes } from "../services/api";
import AddRecipe from "../components/AddRecipe";
import MyRecipes from "../components/MyRecipes";

function Home() {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [favorites, setFavorites] = useState([]);

 useEffect(() => {
  const savedRecipes = JSON.parse(localStorage.getItem("recipes")) || [];
  const savedFav = JSON.parse(localStorage.getItem("favorites")) || [];

  setRecipes(savedRecipes);
  setFavorites(savedFav);

  fetchRecipes();
}, []);


const addRecipe = async (recipeData) => {
  try {
    const res = await createRecipe(recipeData);

    // ✅ IMPORTANT: update UI immediately
    setRecipes((prev) => [...prev, res.data]);

  } catch (error) {
    console.log(error);
  }
};
  const fetchRecipes = async () => {
    try {
      const res = await getRecipes();
      if (res?.data) setRecipes(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // ❤️ LIKE
  const saveFavorite = (recipe) => {
    const exists = favorites.some((r) => r.name === recipe.name);
    if (exists) return;

    const updated = [...favorites, recipe];
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  // 📤 SHARE
  const shareRecipe = (recipe) => {
    const text = `Check out this recipe 🍽️: ${recipe.name}`;

    if (navigator.share) {
      navigator.share({
        title: "Recipe Share",
        text,
        url: window.location.href,
      });
    } else {
      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(
        text + " " + window.location.href
      )}`;
      window.open(whatsappUrl, "_blank");
    }
  };

  // 🔍 SEARCH (ONLY BACKEND RECIPES)
  const filteredRecipes = recipes.filter((r) =>
    r.name.toLowerCase().includes(search.toLowerCase())
  );

  // 🔥 TRENDING RECIPES (STATIC + ENRICHED DATA)
  const trendingRecipes = [
    {
      name: "Cheese Pizza",
      category: "Pizza",
      image:
        "https://images.unsplash.com/photo-1513104890138-7c749659a591",
      calories: 285,
      protein: "12g",
      iron: "2mg",
      steps: ["Prepare dough", "Add sauce and cheese", "Bake for 15 minutes"],
    },
    {
      name: "Chicken Burger",
      category: "Burger",
      image:
        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
      calories: 450,
      protein: "25g",
      iron: "3mg",
      steps: [
        "Grill chicken patty",
        "Toast buns",
        "Add lettuce, sauce, assemble",
      ],
    },
    {
      name: "Healthy Salad",
      category: "Salad",
      image:
        "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
      calories: 150,
      protein: "5g",
      iron: "4mg",
      steps: ["Chop vegetables", "Add olive oil", "Mix and serve fresh"],
    },
  ];

  return (
    <div className="home">

      {/* HEADER */}
      <div className="top-header">
        <h1>🍳 CookSphere AI</h1>

        <input
          className="search-bar"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search recipes..."
        />
      </div>

      <AddRecipe addRecipe={addRecipe} />
      <MyRecipes recipes={filteredRecipes} />

      {/* TRENDING */}
      <h2 className="title">🔥 Trending Recipes</h2>

      <div className="recipe-grid">
        {trendingRecipes.map((recipe, i) => (
          <div key={i} className="recipe-card">

            <img src={recipe.image} alt={recipe.name} />
            <h3>{recipe.name}</h3>

            <div className="btn-group">
              <button onClick={() => saveFavorite(recipe)}>❤️ Like</button>
              <button onClick={() => setSelectedRecipe(recipe)}>View</button>
              <button onClick={() => shareRecipe(recipe)}>Share</button>
            </div>

          </div>
        ))}
      </div>

      {/* MODAL (SAFE VERSION) */}
      {selectedRecipe && (
        <div className="modal" onClick={() => setSelectedRecipe(null)}>
          <div
            className="modal-box recipe-detail"
            onClick={(e) => e.stopPropagation()}
          >
            <h2>{selectedRecipe.name}</h2>

            <img src={selectedRecipe.image} alt="" />

            {/* SAFE CHECKS */}
            <div className="nutrition-box">
              <p>🔥 Calories: {selectedRecipe.calories || "N/A"} kcal</p>
              <p>💪 Protein: {selectedRecipe.protein || "N/A"}</p>
              <p>🧲 Iron: {selectedRecipe.iron || "N/A"}</p>
            </div>

            <div className="steps-box">
              <h3>👨‍🍳 Steps</h3>

              <ol>
                {(selectedRecipe.steps || []).map((step, i) => (
                  <li key={i}>{step}</li>
                ))}
              </ol>
            </div>

            <button onClick={() => setSelectedRecipe(null)}>
              Close
            </button>
          </div>
        </div>
      )}

      {/* STATS */}
      <div className="stats">
        <p>🧾 Recipes: {recipes.length}</p>
        <p>❤️ Favorites: {favorites.length}</p>
      </div>

    </div>
  );
}

export default Home;