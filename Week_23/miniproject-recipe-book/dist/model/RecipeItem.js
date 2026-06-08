export class RecipeItem {
    id;
    title;
    ingredients;
    instructions;
    isFavorite;
    constructor(id, title, ingredients, instructions, isFavorite = false) {
        this.id = id;
        this.title = title;
        this.ingredients = ingredients;
        this.instructions = instructions;
        this.isFavorite = isFavorite;
    }
}
//# sourceMappingURL=RecipeItem.js.map