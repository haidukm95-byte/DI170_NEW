export class RecipeTemplate {
    container;
    onDelete;
    onToggleFavorite;
    constructor(container, onDelete, onToggleFavorite) {
        this.container = container;
        this.onDelete = onDelete;
        this.onToggleFavorite = onToggleFavorite;
    }
    render(recipes) {
        this.container.innerHTML = '';
        for (const recipe of recipes) {
            this.container.appendChild(this.createCard(recipe));
        }
    }
    createCard(recipe) {
        const card = document.createElement('div');
        card.className = `recipe-card${recipe.isFavorite ? ' favorite' : ''}`;
        const header = document.createElement('div');
        header.className = 'recipe-header';
        header.innerHTML = `<h3>${recipe.title}</h3>`;
        header.addEventListener('click', () => details.classList.toggle('hidden'));
        const details = document.createElement('div');
        details.className = 'recipe-details hidden';
        details.innerHTML = `
            <h4>Ingredients</h4>
            <ul>${recipe.ingredients.map(i => `<li>${i}</li>`).join('')}</ul>
            <h4>Instructions</h4>
            <p>${recipe.instructions}</p>
        `;
        const actions = document.createElement('div');
        actions.className = 'recipe-actions';
        const favBtn = document.createElement('button');
        favBtn.className = 'btn-favorite';
        favBtn.textContent = recipe.isFavorite ? 'Unfavorite' : 'Favorite';
        favBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.onToggleFavorite(recipe.id);
        });
        const delBtn = document.createElement('button');
        delBtn.className = 'btn-delete';
        delBtn.textContent = 'Delete';
        delBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.onDelete(recipe.id);
        });
        actions.append(favBtn, delBtn);
        card.append(header, details, actions);
        return card;
    }
}
//# sourceMappingURL=RecipeTemplate.js.map