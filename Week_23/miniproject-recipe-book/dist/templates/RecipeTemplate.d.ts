import type { RecipeItem } from '../model/RecipeItem.js';
export declare class RecipeTemplate {
    private container;
    private onDelete;
    private onToggleFavorite;
    constructor(container: HTMLElement, onDelete: (id: number) => void, onToggleFavorite: (id: number) => void);
    render(recipes: RecipeItem[]): void;
    private createCard;
}
//# sourceMappingURL=RecipeTemplate.d.ts.map