import { getFilters } from './filter';
import {
  getRecipe,
  getRecipes,
  removeIngredient,
  toggleIngredientAvaiability,
} from './recipe';

// Render list of recipes
const renderRecipes = () => {
  const filters = getFilters();
  const filterRecipes = getRecipes().filter((recipe) =>
    recipe.title.toLowerCase().includes(filters.searchText)
  );
  const recipesEl = document.querySelector('#recipes');

  recipesEl.innerHTML = '';

  if (filterRecipes.length === 0) {
    const emptyMessageEl = document.createElement('P');
    emptyMessageEl.textContent = 'No recipe found!';
    emptyMessageEl.classList.add('empty-message');
    recipesEl.appendChild(emptyMessageEl);

    return false;
  }

  filterRecipes.forEach((recipe) => {
    const recipeEl = generateRecipeDOM(recipe);
    recipesEl.appendChild(recipeEl);
  });
};

// Create recipe card
const generateRecipeDOM = (recipe) => {
  const recipeEl = document.createElement('A');
  const textEl = document.createElement('P');
  const statusEl = document.createElement('P');

  // Setup the recipe title text
  textEl.textContent = recipe.title;
  textEl.classList.add('list-item__title');
  recipeEl.appendChild(textEl);

  // Setup the recipe status text
  statusEl.textContent = generateStatusText(recipe.id);
  statusEl.classList.add('list-item__subtitle');
  recipeEl.appendChild(statusEl);

  // Setup the link
  recipeEl.setAttribute('href', `/edit.html#${recipe.id}`);
  recipeEl.classList.add('list-item');

  return recipeEl;
};

// Create status text
const generateStatusText = (recipeId) => {
  const recipe = getRecipe(recipeId);
  const availableIngredients = recipe.ingredients.filter(
    (ingredient) => ingredient.isAvailable
  );

  if (availableIngredients.length === 0) {
    return `None of the needed ingredient available`;
  } else if (availableIngredients.length === recipe.ingredients.length) {
    return `All ingredients availalbe`;
  } else {
    return `${availableIngredients.length} out of ${recipe.ingredients.length} ingreadients availalbe`;
  }
};

// Ready the Recipe detail page DOM
const initializeEditPage = (id) => {
  const titleEl = document.querySelector('#recipe-title');
  const procedureEl = document.querySelector('#recipe-procedure');
  const statusEl = document.querySelector('#ingredient-status');

  const { id: recipeId, title, procedure, ingredients } = getRecipe(id);

  if (!recipeId) {
    location.assign('/index.html');
  }

  titleEl.value = title;
  procedureEl.value = procedure;
  statusEl.textContent = generateStatusText(recipeId);
  renderIngredients(id);
};

// Render ingredient list
const renderIngredients = (recipeId) => {
  const ingredientsEl = document.querySelector('#ingredients');
  const statusEl = document.querySelector('#ingredient-status');

  const recipe = getRecipe(recipeId);
  const ingredients = recipe.ingredients;

  ingredientsEl.innerHTML = '';

  if (ingredients.length === 0) {
    // Tmre pore dekhtasi
    const emptyMessageEl = document.createElement('P');
    emptyMessageEl.textContent = 'No ingredient enlisted';
    emptyMessageEl.classList.add('empty-message');
    ingredientsEl.appendChild(emptyMessageEl);

    return false;
  }

  ingredients.forEach((ingredient) => {
    const ingredientEl = generateIngredientDOM(recipeId, ingredient);
    ingredientsEl.appendChild(ingredientEl);
  });

  statusEl.textContent = generateStatusText(recipeId);
};

// Create ingredient DOM element
const generateIngredientDOM = (
  recipeId,
  { id: ingredientId, ingredientName, isAvailable }
) => {
  const ingredientEl = document.createElement('LABEL');
  const containerEl = document.createElement('DIV');
  const textEl = document.createElement('SPAN');
  const button = document.createElement('BUTTON');
  const checkbox = document.createElement('INPUT');

  // Setup ingredient checkbox
  checkbox.setAttribute('type', 'checkbox');
  checkbox.checked = isAvailable;
  containerEl.appendChild(checkbox);
  checkbox.addEventListener('change', () => {
    toggleIngredientAvaiability(recipeId, ingredientId);
    renderIngredients(recipeId);
  });

  // Setup ingredient text
  textEl.textContent = ingredientName;
  containerEl.appendChild(textEl);

  // Setup container
  ingredientEl.classList.add('list-item');
  containerEl.classList.add('list-item__container');
  ingredientEl.appendChild(containerEl);

  // Setup ingredient remove button
  button.textContent = 'remove';
  button.classList.add('button', 'button--text');
  ingredientEl.appendChild(button);
  button.addEventListener('click', () => {
    removeIngredient(recipeId, ingredientId);
    renderIngredients(recipeId);
  });

  return ingredientEl;
};

export {
  generateRecipeDOM,
  generateIngredientDOM,
  renderRecipes,
  renderIngredients,
  initializeEditPage,
  generateStatusText,
};
