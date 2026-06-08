import { RecipeItem } from './RecipeItem.js';
export class RecipeCollection {
    recipes = [];
    nextId = 1;
    storageKey = 'recipeBook';
    constructor() {
        this.loadFromStorage();
    }
    add(title, ingredients, instructions) {
        const recipe = new RecipeItem(this.nextId++, title, ingredients, instructions);
        this.recipes.push(recipe);
        this.saveToStorage();
        return recipe;
    }
    remove(id) {
        this.recipes = this.recipes.filter(r => r.id !== id);
        this.saveToStorage();
    }
    toggleFavorite(id) {
        const recipe = this.recipes.find(r => r.id === id);
        if (recipe) {
            recipe.isFavorite = !recipe.isFavorite;
            this.saveToStorage();
        }
    }
    clear() {
        this.recipes = [];
        this.saveToStorage();
    }
    getAll() {
        return this.recipes;
    }
    saveToStorage() {
        localStorage.setItem(this.storageKey, JSON.stringify(this.recipes));
    }
    loadFromStorage() {
        const raw = localStorage.getItem(this.storageKey);
        if (!raw)
            return;
        const parsed = JSON.parse(raw);
        this.recipes = parsed.map(r => new RecipeItem(r.id, r.title, r.ingredients, r.instructions, r.isFavorite));
        this.nextId = this.recipes.reduce((max, r) => Math.max(max, r.id), 0) + 1;
    }
}
//# sourceMappingURL=RecipeCollection.js.map