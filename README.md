# AuraCraft - AI Hackathon E-Commerce Frontend

AuraCraft is a premium, high-performance Single Page Application (SPA) e-commerce storefront designed specifically for an AI Hackathon. It features a clean, utilitarian aesthetic (inspired by leading e-commerce platforms like Amazon), comprehensive catalog management, and a fully integrated Natural Language AI Shopping Assistant.

An AI-assisted e-commerce website developed during the Newton School of Technology AI Headstart Bootcamp using Antigravity and Google Gemini Code.

## 🌟 Key Features

*   **Integrated AI Shopping Assistant**: A sophisticated NLP chatbot located in the bottom right corner. Users can interact with the bot using natural language to filter the catalog (e.g., "Show me bags"), add items to their cart (e.g., "add visor to cart"), or manage their orders.
*   **Dynamic Product Catalog**: Features dynamic filtering (by Category, Rating, Price) and sorting algorithms. All pricing is fully localized to Indian Rupees (₹).
*   **Persistent State Management**: Uses browser `localStorage` to save the user's Shopping Cart, Wishlist, and Order History across sessions without needing a backend database.
*   **Interactive Checkout Protocol**: A multi-step simulated secure checkout form that processes the cart and generates an order manifest in the user's dashboard.
*   **Amazon-Style UI/UX**: Clean, responsive grid layouts, crisp SVG iconography, floating panels, and detailed 3-column product description pages.

## 🛠 Tech Stack

*   **HTML5**: Semantic structure and SVG icon integration.
*   **CSS3**: Custom variables, responsive Flexbox/Grid layouts, and modular component styling (Zero external CSS frameworks).
*   **Vanilla JavaScript (ES6)**: State management, DOM manipulation, routing, and the AI chatbot logic (`products.js`, `app.js`, `ai-assistant.js`).

## 🚀 How to Run Locally

Since this project is entirely front-end and uses vanilla web technologies, you don't need to install any heavy dependencies (like `npm` or `node_modules`).

**Method 1: Local HTTP Server (Recommended)**
If you have Python installed, you can serve the directory to prevent any CORS issues when loading local assets.
1. Open your terminal in the project directory.
2. Run the following command:
   ```bash
   python3 -m http.server 8080
   ```
3. Open your web browser and navigate to: `http://localhost:8080/`

**Method 2: Direct File Open**
1. Simply double-click the `index.html` file in your file explorer to open it directly in your default web browser.

## 📁 Project Structure

*   `index.html`: The main structural shell containing all application views (Home, Shop, Detail, Checkout, Dashboard, Cart).
*   `index.css`: The global stylesheet defining the clean, utilitarian e-commerce aesthetic.
*   `app.js`: The core application controller handling routing, cart logic, and dynamic DOM rendering.
*   `ai-assistant.js`: The standalone module powering the natural language chat widget.
*   `products.js`: The central product database array.
*   `images/`: Directory containing the premium product and hero visual assets.
