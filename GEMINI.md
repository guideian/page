# Project Overview

This is a static website for **Guideian**, an AI-powered local audio guide. The site is built with HTML, CSS, and vanilla JavaScript.

## Key Features

*   **AI-Powered Audio Guides:** The main product is an AI that generates personalized audio guides for users based on their location and interests.
*   **Dynamic Content:** The navigation and footer are loaded dynamically into the pages using JavaScript's `fetch` API.
*   **Modern UI:** The site features a modern, responsive design with smooth scrolling and fade-in animations.

## File Structure

*   `index.html`: The main landing page.
*   `legal.html`, `privacy.html`, `terms.html`, `data-deletion.html`, `contact.html`: Standard legal and contact pages.
*   `styles.css`: Contains all the styles for the website.
*   `script.js`: Handles dynamic content loading, animations, and other interactive features.
*   `nav.html` & `footer.html`: Reusable navigation and footer components.
*   `img/`: Contains images used on the site.

## Development

This is a simple static website. There is no build process. To "run" the project, you can open the `.html` files directly in a web browser. For the dynamic `fetch` to work, you will need to serve the files from a simple web server (e.g., `python -m http.server`).

### Conventions

*   **CSS:** The project uses CSS custom properties (variables) for theming and a consistent color palette.
*   **JavaScript:** The code is written in modern, vanilla JavaScript. It includes features like `async/await` for asynchronous operations and `IntersectionObserver` for scroll animations.
*   **HTML:** The HTML is semantic and includes meta tags for SEO and social media (Open Graph).