import { getRecipesByIngredients, getGif, SPOONACULAR_API_KEY } from "./utils.mjs";

// DOM Variables
const form = document.getElementById('ingredientForm');
const recipesContainer = document.getElementById('recipesContainer');
const dialog = document.getElementById('recipeDialog');
const dialogContent = document.getElementById('recipeContent');
const closeDialog = document.getElementById('closeDialog');
const addToFavorites = document.getElementById('addToFavorites');

// Find Recipe
form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const ingredients = document.getElementById("ingredients").value;
    recipesContainer.innerHTML = "";

    try {
        const recipes = await getRecipesByIngredients(ingredients);

        if (!recipes || recipes.length === 0) {
            recipesContainer.innerHTML = `<p class="error-recipe">No recipes found. Please check your spelling or try different ingredients.</p>`;
            return;
        }

        for (const recipe of recipes) {
            let gifUrl = "";
            try {
                gifUrl = await getGif(recipe.title);
            } catch (gifError) {
                console.error('Error fetching GIF:', gifError.message);
                gifUrl = "";
            }

            const recipeCard = document.createElement("div");
            recipeCard.classList.add("recipe-card");

            recipeCard.innerHTML = `
                    <h3 class="recipe-heading">${recipe.title}</h3>
                    <img src="${recipe.image}" class="recipe-img" alt="${recipe.title}" loading="lazy">
                <button data-id="${recipe.id}" class="viewRecipe">View Recipe</button>
            `;

            recipesContainer.appendChild(recipeCard);
        }

        document.querySelectorAll(".viewRecipe").forEach(button => {
            button.addEventListener("click", async (event) => {
                try {
                    const recipeId = event.target.dataset.id;
                    const recipeDetailsUrl = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${SPOONACULAR_API_KEY}`;
                    const recipeData = await fetch(recipeDetailsUrl).then(res => res.json());

                    dialogContent.innerHTML = `
                        <h2>${recipeData.title}</h2>
                        <img src="${recipeData.image}" class="recipe-img" alt="${recipeData.title}">
                        <p><strong>Ready in:</strong> ${recipeData.readyInMinutes} minutes</p>
                        <p><strong>Servings:</strong> ${recipeData.servings}</p>
                        <p>${recipeData.summary}</p>
                    `;
                    dialog.showModal();
                } catch (error) {
                    console.error('Error loading recipe details:', error);
                    dialogContent.innerHTML = '<p>Error loading recipe details</p>';
                    dialog.showModal();
                }
            });
        });
    } catch (error) {
        console.error('Error fetching recipes:', error);
        recipesContainer.innerHTML = '<p>Could not fetch recipes. Try again later.</p>';
    }
});

// Close dialog event
closeDialog.addEventListener("click", () => {
    dialog.close();
});

// Close dialog when clicks outside
dialog.addEventListener('click', (e) => {
    const dialogDimensions = dialog.getBoundingClientRect();
    if (
        e.clientX < dialogDimensions.left ||
        e.clientX > dialogDimensions.right ||
        e.clientY < dialogDimensions.top ||
        e.clientY > dialogDimensions.bottom
    ) {
        dialog.close();
    }
});