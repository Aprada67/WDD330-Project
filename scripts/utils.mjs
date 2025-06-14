// API Keys
export const SPOONACULAR_API_KEY = "1b9a8dbb01c04ede8a68b0eeddd5cdb9";
const GIPHY_API_KEY = "iwAtkywjb8bMiT4MkUjP3UkHRhxhKK7D";

/**
 * Load and parse a Json file from the provided url
 * @param {string} url - The url route
 * @returns {Promise<object>} - Returns a promise with the parsed content
 */
export async function loadJSON(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Error loading the JSON file");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error loading the JSON:", error);
        throw error;
    }
}

/**
 * Fetch recipes from Spoonacular API based on ingredients
 * @param {string} ingredients - Comma-separated ingredients string
 * @returns {Promise<Array>} - List of recipes
 */
export async function getRecipesByIngredients(ingredients) {
    const url = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${encodeURIComponent(ingredients)}&number=6&apiKey=${SPOONACULAR_API_KEY}`;
    return await loadJSON(url);
}

/**
 * Get a GIF from Giphy based on a search terx  m
 * @param {string} searchTerm
 * @returns {Promise<string>} - URL of a GIF
 */
export async function getGif(searchTerm) {
    const url = `https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_API_KEY}&q=${encodeURIComponent(searchTerm)}&limit=5&rating=g&lang=en`;
    try {
        const data = await loadJSON(url);

        if (!data.data || data.data.length === 0) {
            throw new Error(`No GIFs found for "${searchTerm}"`);
        }

        // Buscar el primer gif cuyo título contenga el término de búsqueda
        const relevantGif = data.data.find(gif =>
            gif.title.toLowerCase().includes(searchTerm.toLowerCase())
        );

        if (!relevantGif) {
            throw new Error(`No relevant GIFs found for "${searchTerm}"`);
        }

        return relevantGif.images.original.url;
    } catch (error) {
        console.error(`GIF search failed for "${searchTerm}":`, error.message);
        throw error;
    }
}
