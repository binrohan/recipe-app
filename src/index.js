import { setFilters } from './filter';
import { createRecipe, getRecipes, loadRecipes } from './recipe';
import { renderRecipes } from './views';

renderRecipes();

document.querySelector('#create-recipe').addEventListener('click', (e) => {
  const id = createRecipe();
  location.assign(`/edit.html#${id}`);
});

document.querySelector('#search-text').addEventListener('input', (e) => {
  setFilters({ searchText: e.target.value });
  renderRecipes();
});

window.addEventListener('storage', (e) => {
  if (e.key === 'recipes') {
    loadRecipes();
    renderRecipes();
  }
});
