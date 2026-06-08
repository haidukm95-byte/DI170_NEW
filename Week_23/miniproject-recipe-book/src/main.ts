import { RecipeCollection } from './model/RecipeCollection.js';
import { RecipeTemplate } from './templates/RecipeTemplate.js';

const collection = new RecipeCollection();
const container = document.getElementById('recipeContainer') as HTMLElement;

const template = new RecipeTemplate(
    container,
    (id) => { collection.remove(id); template.render(collection.getAll()); },
    (id) => { collection.toggleFavorite(id); template.render(collection.getAll()); }
);

template.render(collection.getAll());

const form = document.getElementById('recipeEntryForm') as HTMLFormElement;
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = (document.getElementById('recipeTitle') as HTMLInputElement).value.trim();
    const rawIngredients = (document.getElementById('ingredients') as HTMLTextAreaElement).value.trim();
    const instructions = (document.getElementById('instructions') as HTMLTextAreaElement).value.trim();
    const ingredients = rawIngredients.split('\n').map(i => i.trim()).filter(Boolean);

    collection.add(title, ingredients, instructions);
    template.render(collection.getAll());
    form.reset();
});

document.getElementById('clearRecipesButton')?.addEventListener('click', () => {
    collection.clear();
    template.render(collection.getAll());
});
