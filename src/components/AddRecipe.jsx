import { toast } from "react-toastify";
import { addRecipeAPI } from "../services/api";
import { useState } from "react";
import "./AddRecipe.css";

function AddRecipe({ addRecipe }) {

  const [formData, setFormData] = useState({
    name: "",
    image: "",
    calories: "",
    protein: "",
    iron: "",
    ingredients: "",
    steps: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name) return;

    try {
       const res = await addRecipeAPI(formData);

       props.addRecipe(newRecipe);

// 🔥 Add UI update
       addRecipe(recipeData);

// 🔔 TOAST SUCCESS
       toast.success("🍳 Recipe added successfully!");

      // 🔄 Reset form
      setFormData({
        name: "",
        image: "",
        calories: "",
        protein: "",
        iron: "",
        ingredients: "",
        steps: ""
      });

    } catch (error) {
      console.log("Error saving recipe:", error);
    }
  };

  return (
    <div className="recipe-studio">
      <div className="studio-header">
        <h2>🍳 Recipe Studio</h2>
        <p>Create and manage your own recipes</p>
      </div>

      <form className="recipe-form" onSubmit={handleSubmit}>

        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="🍽 Recipe Name"
        />

        <input
          name="image"
          value={formData.image}
          onChange={handleChange}
          placeholder="📸 Image URL"
        />

        <input
          name="calories"
          value={formData.calories}
          onChange={handleChange}
          placeholder="🔥 Calories"
        />

        <input
          name="protein"
          value={formData.protein}
          onChange={handleChange}
          placeholder="💪 Protein"
        />

        <input
          name="iron"
          value={formData.iron}
          onChange={handleChange}
          placeholder="🩸 Iron"
        />

        <textarea
          name="ingredients"
          value={formData.ingredients}
          onChange={handleChange}
          placeholder="🥕 Ingredients"
        />

        <textarea
          name="steps"
          value={formData.steps}
          onChange={handleChange}
          placeholder="👨‍🍳 Cooking Steps"
        />

        <button type="submit" className="save-btn">
          🍳 Save Recipe
        </button>

      </form>
    </div>
  );
}

export default AddRecipe;

