export class FavoritesManager {

    // Key we will use to save in localStorage
    constructor() {
        this.key = "favorites"
    }

    // get all data saved in favorites
    getAll() {
        const data = localStorage.getItem(this.key);
        return data ? JSON.parse(data) : [];
    }

    // Save the full list of favorites in localStorage
    saveAll(favorites) {
        localStorage.setItem(this.key, JSON.stringify(favorites));
    }

    // Add recipe if there is not repeated
    add(recipe) {
        const favorites = this.getAll();
        const exists = favorites.some(fav => fav.id === recipe.id);
        if (!exists) {
            favorites.push(recipe);
            this.saveAll(favorites);
        }
    }

    // Remove recipe by ID
    remove(recipeID) {
        const updated = this.getAll().filter(fav => fav.id !== recipeID);
        this.saveAll(updated);
    }

    // Verify if the recipe is in favorites
    exists(recipeID) {
        return this.getAll().some(fav => fav.id === recipeID);
    }
}