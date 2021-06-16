import {
  addIngredient,
  loadRecipes,
  removeRecipe,
  updateRecipe,
} from './recipe';
import {
  generateStatusText,
  initializeEditPage,
  renderIngredients,
} from './views';

const titleEl = document.querySelector('#recipe-title');
const procedureEl = document.querySelector('#recipe-procedure');
const removeRecipeEl = document.querySelector('#remove-recipe');
const statusEl = document.querySelector('#ingredient-status');
const ingredientForm = document.querySelector('#ingredient-form');
const recipeId = location.hash.substring(1);

initializeEditPage(recipeId);

titleEl.addEventListener('input', (e) => {
  updateRecipe(recipeId, { title: e.target.value });
});

procedureEl.addEventListener('input', (e) => {
  updateRecipe(recipeId, { procedure: e.target.value });
});

removeRecipeEl.addEventListener('click', (e) => {
  removeRecipe(recipeId);
  location.assign('/index.html');
});

ingredientForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = e.target.elements.newIngredient.value.trim();
  if (text.length > 0) {
    addIngredient(text, recipeId);
    renderIngredients(recipeId);
    statusEl.textContent = generateStatusText(recipeId);
    e.target.elements.newIngredient.value = '';
  }
});

window.addEventListener('storage', (e) => {
  if (e.key === 'recipes') {
    loadRecipes();
    initializeEditPage(recipeId);
  }
});
