import uuidv4 from 'uuid/v4';
import { renderIngredients } from './views';

let recipes = [];

// Create new recipe
const createRecipe = () => {
  const id = uuidv4();

  const recipe = new Recipe(id);

  recipes.push(new Recipe(id));

  saveRecipes();

  return id;
};

// Read recipes from localstorage
const loadRecipes = () => {
  const recipesJSON = localStorage.getItem('recipes');

  try {
    recipes = recipesJSON ? JSON.parse(recipesJSON) : [];
  } catch (ex) {
    recipes = [];
  }
};

loadRecipes();

// Expose recipes
const getRecipes = () => recipes;

// Save recipes in localstorage
const saveRecipes = () => {
  localStorage.setItem('recipes', JSON.stringify(recipes));
};

// Delete a recipe
const removeRecipe = (id) => {
  const recipeIndex = recipes.findIndex((recipe) => recipe.id === id);

  recipes.splice(recipeIndex, 1);

  saveRecipes();
};

// Update recipe
const updateRecipe = (recipeId, { title, procedure }) => {
  const recipe = getRecipe(recipeId);

  if (!recipe) {
    return false;
  }

  if (typeof title === 'string') {
    recipe.title = title;
  }

  if (typeof procedure === 'string') {
    recipe.procedure = procedure;
  }

  saveRecipes();

  return recipe;
};

// Add new ingredient in a recipe
const addIngredient = (ingredientName, recipeId) => {
  const ingredient = new Ingredient(uuidv4(), ingredientName);
  const recipe = getRecipe(recipeId);

  recipe.ingredients.push(ingredient);

  saveRecipes();
};

// Remove a ingredient from a recipe
const removeIngredient = (recipeId, ingredientId) => {
  const recipe = getRecipe(recipeId);
  const ingredientIndex = recipe.ingredients.findIndex(
    (ingredient) => ingredient.id === ingredientId
  );

  recipe.ingredients.splice(ingredientIndex, 1);

  saveRecipes();
};

// Toggle ingredient checkbox
const toggleIngredientAvaiability = (recipeId, ingredientId) => {
  const recipe = getRecipe(recipeId);
  const ingredientIndex = recipe.ingredients.findIndex(
    (ingredient) => ingredient.id === ingredientId
  );

  recipe.ingredients[ingredientIndex].isAvailable =
    !recipe.ingredients[ingredientIndex].isAvailable;

  saveRecipes();
};

// Get a recipe
const getRecipe = (recipeId) =>
  recipes.find((recipe) => recipe.id === recipeId);

// Ingredient
class Ingredient {
  constructor(id, ingredientName) {
    this.id = id;
    this.ingredientName = ingredientName;
    this.isAvailable = false;
  }
}

// Recipe
class Recipe {
  constructor(id) {
    this.id = id;
    this.title = '';
    this.procedure = '';
    this.ingredients = [];
  }
}

export {
  createRecipe,
  getRecipes,
  getRecipe,
  updateRecipe,
  removeRecipe,
  addIngredient,
  toggleIngredientAvaiability,
  removeIngredient,
  loadRecipes,
};
