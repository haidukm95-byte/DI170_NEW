import { RecipeItem } from './RecipeItem.js';

export class RecipeCollection {
    private recipes: RecipeItem[] = [];
    private nextId: number = 1;
    private readonly storageKey = 'recipeBook';

    constructor() {
        this.loadFromStorage();
    }

    add(title: string, ingredients: string[], instructions: string): RecipeItem {
        const recipe = new RecipeItem(this.nextId++, title, ingredients, instructions);
        this.recipes.push(recipe);
        this.saveToStorage();
        return recipe;
    }

    remove(id: number): void {
        this.recipes = this.recipes.filter(r => r.id !== id);
        this.saveToStorage();
    }

    toggleFavorite(id: number): void {
        const recipe = this.recipes.find(r => r.id === id);
        if (recipe) {
            recipe.isFavorite = !recipe.isFavorite;
            this.saveToStorage();
        }
    }

    clear(): void {
        this.recipes = [];
        this.saveToStorage();
    }

    getAll(): RecipeItem[] {
        return this.recipes;
    }

    private saveToStorage(): void {
        localStorage.setItem(this.storageKey, JSON.stringify(this.recipes));
    }

    private loadFromStorage(): void {
        const raw = localStorage.getItem(this.storageKey);
        if (!raw) return;
        const parsed = JSON.parse(raw) as RecipeItem[];
        this.recipes = parsed.map(
            r => new RecipeItem(r.id, r.title, r.ingredients, r.instructions, r.isFavorite)
        );
        this.nextId = this.recipes.reduce((max, r) => Math.max(max, r.id), 0) + 1;
    }
}
