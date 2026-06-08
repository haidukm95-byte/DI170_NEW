export class RecipeItem {
    public id: number;
    public title: string;
    public ingredients: string[];
    public instructions: string;
    public isFavorite: boolean;

    constructor(
        id: number,
        title: string,
        ingredients: string[],
        instructions: string,
        isFavorite: boolean = false
    ) {
        this.id = id;
        this.title = title;
        this.ingredients = ingredients;
        this.instructions = instructions;
        this.isFavorite = isFavorite;
    }
}
