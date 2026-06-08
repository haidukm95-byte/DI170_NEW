import { RecipeItem } from './RecipeItem.js';
export declare class RecipeCollection {
    private recipes;
    private nextId;
    private readonly storageKey;
    constructor();
    add(title: string, ingredients: string[], instructions: string): RecipeItem;
    remove(id: number): void;
    toggleFavorite(id: number): void;
    clear(): void;
    getAll(): RecipeItem[];
    private saveToStorage;
    private loadFromStorage;
}
//# sourceMappingURL=RecipeCollection.d.ts.map