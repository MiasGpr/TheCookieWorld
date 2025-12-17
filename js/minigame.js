document.addEventListener('DOMContentLoaded', () => {

    // --- DOM Elements ---
    const baseElement = document.getElementById('cookie-base');
    const priceDisplay = document.getElementById('current-price');
    const faceElement = document.querySelector('.cookie-face');
    const ingredientButtons = document.querySelectorAll('.ingredient-btn');
    const resetButton = document.getElementById('reset-button');
    const orderButton = document.getElementById('order-button');


    // --- CRITICAL LOOKUP TABLE ---
    // Maps the simplified IDs (from HTML data-id) to the EXACT file paths you provided.
    // NOTE: Ensure these paths are CORRECT relative to your HTML file!
    const IMAGE_LOOKUP = new Map([
        
        // BASE EXAMPLES (Assuming 'none' for frosting/topping)
        // ** THIS IS THE KEY THAT MUST BE CORRECT FOR RED VELVET TO SHOW **
        ["redvelvet_none_none", "MG/redvelvet.jpg"],
        ["matcha_none_none", "MG/matcha.jpg"], 
        ["chocolate_none_none", "MG/chocolate.jpg"], 
        ["vanilla_none_none", "MG/nature.jpg"],
        
        // COMBINATIONS YOU SPECIFICALLY MENTIONED:
        ["vanilla_pinkicing_sprinkles", "vanillafrosting"],
        ["redvelvet_pinkicing_none", "photoCookie/Nutrition _ Crumbl.jpg"], 
        ["chocolate_whitecream_none", "photoCookie/Crumbl - Freshly Baked Cookies & Desserts.jpg"],

        // TOPPING EXAMPLES (These files may represent toppings on various bases - please adjust keys if needed)
        ["redvelvet_none_sprinkles", "photoCookie/Red Velvet Cookies.jpg"], 
        ["chocolate_none_drizzle", "photoCookie/téléchargé (1).jpg"], 
        ["matcha_none_drizzle", "photoCookie/The BEST Brown Butter Matcha Cookies Recipe - EricTriesIt.jpg"],


        // --- YOU MUST ADD ALL OTHER COMBINATIONS YOU HAVE IMAGES FOR HERE ---
        // Example: ["vanilla_whitecream_drizzle", "photoCookie/Your_Vanilla_White_Drizzle_File.jpg"],
        
        // Default (Blank State)
        ["none_none_none", ""] 
    ]);


    // --- State object ---
    let currentCookie = {
        base: { name: 'None', id: 'none', cost: 0.00 },
        frosting: { name: 'None', id: 'none', cost: 0.00 },
        topping: { name: 'None', id: 'none', cost: 0.00 },
        totalCost: 0.00
    };

    // --- Core Functions ---

    /**
     * Finds the image path from the lookup table based on current selections.
     * @returns {string | null} The EXACT path from the map, or null if not found.
     */
    function buildImagePath() {
        const base = currentCookie.base.id;
        const frosting = currentCookie.frosting.id;
        const topping = currentCookie.topping.id;

        const key = `${base}_${frosting}_${topping}`;
        
        // Use the Map to look up the exact file path
        const path = IMAGE_LOOKUP.get(key);

        if (base === 'none') {
             // Return null if no base is selected, forcing the visual clear.
            return null; 
        }
        
        if (!path) {
            // **Crucial Check:** Log if a combination is missing. This is a common failure point.
            console.warn(`Image missing for combination key: ${key}. Please ensure this exact combination is in IMAGE_LOOKUP.`);
            return null; 
        }

        return path;
    }

    /**
     * Updates the cookie visual by setting the background image of the base layer.
     */
    function updateCookieVisuals() {
        const imagePath = buildImagePath();
        
        if (imagePath) {
            // NOTE: Using template literals for the URL to correctly handle spaces/special characters
            // The image path 'minigame/redvelvet.jpg' must be correct relative to your HTML/JS file location.
            baseElement.style.backgroundImage = `url('${imagePath}')`;
            faceElement.style.visibility = 'visible';
        } else {
            // Clear the image if no combination is found or no base is selected
            baseElement.style.backgroundImage = 'none';
            faceElement.style.visibility = 'hidden';
        }
    }

    function calculateTotalCost() {
        const cost = currentCookie.base.cost + currentCookie.frosting.cost + currentCookie.topping.cost;
        currentCookie.totalCost = cost;
        priceDisplay.textContent = cost.toFixed(2);
    }
    
    /**
     * Handles the click event for an ingredient button, updating state and visuals.
     * @param {HTMLElement} btn - The ingredient button clicked.
     */
    function updateCookieState(btn) {
        const type = btn.dataset.type;
        const name = btn.dataset.name;
        const id = btn.dataset.id;
        const cost = parseFloat(btn.dataset.cost);

        // 1. Update State
        currentCookie[type] = { name, id, cost };
        
        // 2. Update Visuals
        updateCookieVisuals();

        // 3. Update Cost
        calculateTotalCost();

        // 4. Update Button Active Class
        // Remove 'selected' from all buttons of the same type
        document.querySelectorAll(`.ingredient-btn[data-type="${type}"]`).forEach(b => {
            b.classList.remove('selected');
        });
        // Add 'selected' to the clicked button
        btn.classList.add('selected');
    }

    function resetCookie() {
        currentCookie = {
            base: { name: 'None', id: 'none', cost: 0.00 },
            frosting: { name: 'None', id: 'none', cost: 0.00 },
            topping: { name: 'None', id: 'none', cost: 0.00 },
            totalCost: 0.00
        };

        updateCookieVisuals();
        calculateTotalCost();
        
        ingredientButtons.forEach(btn => btn.classList.remove('selected'));
    }

    // --- Event Listeners ---

    ingredientButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            updateCookieState(event.currentTarget);
        });
    });

    resetButton.addEventListener('click', resetCookie);

    orderButton.addEventListener('click', () => {
        if (currentCookie.base.id !== 'none') {
            alert(`Order Placed! Your ${currentCookie.base.name} cookie with ${currentCookie.frosting.name} and ${currentCookie.topping.name} costs $${currentCookie.totalCost.toFixed(2)}.`);
        } else {
            alert('Please select a cookie base first!');
        }
    });

    // --- Initialization ---
    // Start with a clean slate when the script loads
    resetCookie(); 
});