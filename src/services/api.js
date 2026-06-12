import axios from "axios";

const API = "http://localhost:5000/api/recipes";

export const getRecipes = () => axios.get(API);

export const addRecipeAPI = (data) => axios.post(API, data);
export const deleteRecipeAPI = (id) =>
  axios.delete(`http://localhost:5000/api/recipes/${id}`);
export const updateRecipeAPI = (id, data) =>
  axios.put(`http://localhost:5000/api/recipes/${id}`, data);
export const toggleFavoriteAPI = (id) =>
  axios.put(`http://localhost:5000/api/recipes/favorite/${id}`);
export const getFavoriteRecipes = () =>
  axios.get("http://localhost:5000/api/recipes");
export const getFavoriteRecipesAPI = () =>
  axios.get("http://localhost:5000/api/recipes/favorites");
export const createRecipe = (data) =>
  axios.post(API, data);