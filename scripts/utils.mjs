/**
 * Load and parse a Json file from the provided url
 * @param {string} url - The url route
 * @returns {Promise<object>} - Returns a promise with the parsed content
 */

export async function loadJSON(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Error loading the json file")
        }
    } catch (error) {
        console.error("Error loading the json:", error);
        throw error;
    }
}