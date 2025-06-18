import { FavoritesManager } from "./favoritesManager.js";

const favoritesContainer = document.getElementById("favoritesContainer");
const clearFavoritesButton = document.getElementById("clearFavorites");
const favoritesManager = new FavoritesManager();

function renderFavorites() {
    favoritesContainer.innerHTML = "";

    const favorites = favoritesManager.getAll();

    if (favorites.length === 0) {
        favoritesContainer.innerHTML = "<p>No favorites yet.</p>";
        return;
    }

    favorites.forEach(recipe => {
        const recipeCard = document.createElement("div");
        recipeCard.classList.add("recipe-card");

        recipeCard.innerHTML = `
            <h3 class="recipe-heading">${recipe.title}</h3>
            <img src="${recipe.image}" class="recipe-img" alt="${recipe.title}" loading="lazy">
            <p><strong>Ready in:</strong> ${recipe.readyInMinutes} minutes</p>
            <p><strong>Servings:</strong> ${recipe.servings}</p>
            <button class="removeFavorite" data-id="${recipe.id}">Remove</button>
        `;

        favoritesContainer.appendChild(recipeCard);
    });

    // Quitar receta favorita
    document.querySelectorAll(".removeFavorite").forEach(button => {
        button.addEventListener("click", (e) => {
            const recipeId = parseInt(e.target.dataset.id);
            favoritesManager.remove(recipeId);
            renderFavorites();
        });
    });
}

// Borrar todos los favoritos
clearFavoritesButton.addEventListener("click", () => {
    favoritesManager.saveAll([]);
    renderFavorites();
});

renderFavorites();