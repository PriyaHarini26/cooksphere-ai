import { useEffect, useState } from "react";
import "./Favorites.css";
import { getFavoriteRecipesAPI } from "../services/api";

function Favorites() {

  const [favorites, setFavorites] = useState([]);
useEffect(() => {
  try {
    const fav = JSON.parse(localStorage.getItem("favorites"));

    if (Array.isArray(fav)) {
      setFavorites(fav);
    } else {
      setFavorites([]);
    }
  } catch (error) {
    console.log("Favorites load error:", error);
    setFavorites([]);
  }
}, []);
  const loadFavorites = async () => {
    try {
      const res = await getFavoriteRecipesAPI();

      // Only favorite recipes
      const favs = res.data.filter(
        (recipe) => recipe.isFavorite === true
      );

      setFavorites(favs);

    } catch (error) {
      console.log("Error loading favorites:", error);
    }
  };
const addRecipe = async (recipeData) => {
  try {
    const res = await createRecipe(recipeData);

    // ✅ IMPORTANT: update UI immediately
    setRecipes((prev) => [...prev, res.data]);

  } catch (error) {
    console.log(error);
  }
};
  return (
    <div className="favorites-page">

      <h1>❤️ Saved Recipes</h1>

      {favorites.length === 0 ? (

        <div style={{ textAlign: "center" }}>
          <h2>💔 No Saved Recipes Yet</h2>
          <p>Start adding recipes to favorites ❤️</p>
        </div>

      ) : (

        <div className="favorites-grid">

          {favorites.map((recipe) => (
            <div
              className="favorite-card"
              key={recipe._id}
            >

              <img
                src={recipe.image}
                alt={recipe.name}
              />

              <div className="fav-info">

                <h3>{recipe.name}</h3>

                <p>🔥 {recipe.calories} kcal</p>

                <p>💪 {recipe.protein} g protein</p>

                <p>🩸 {recipe.iron} mg iron</p>

                <span className="saved-badge">
                  ❤️ Saved
                </span>

              </div>

            </div>
          ))}

        </div>

      )}

    </div>
  );
}

export default Favorites;