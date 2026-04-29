# ⚡ NEXUS FITNESS | Gamified Workout Tracker

Nexus Fitness is a production-grade, Single Page Application (SPA) built entirely in **Vanilla JS** that gamifies the workout experience. 

This project was built to demonstrate advanced frontend architecture, avoiding modern frameworks (like React or Vue) to prove a deep understanding of state management, immutability, data flow, and DOM manipulation.

## 🚀 Technical Highlights

* **Custom Redux-Style State Container:** Implemented a ground-up store featuring strict reducer patterns, Redux-style middleware pipelines (including asynchronous Thunks), and deep state freezing (`Object.freeze`) for pure immutability in development.
* **Selector-Based Rendering Engine:** Engineered a React-style subscription model using shallow-equality diffing. UI components only re-render when their specific slice of state mutates, eliminating DOM thrashing.
* **Custom Virtual-DOM Builder:** Eliminated all `innerHTML` and string-based rendering in favor of a pure JS component creation utility (`el()`), complete with event binding and attribute mapping.
* **Hardware-Accelerated Animation System:** Built a custom `requestAnimationFrame` engine utilizing `WeakMap` to manage non-blocking, leak-proof animations for XP counters and statistics.
* **60FPS Canvas Particle Engine:** Features a mathematical particle explosion engine triggered by level-ups to provide a high-impact "Signature Experience."
* **Defensive Storage & Versioning:** `localStorage` integration protected by schema versioning checks to prevent app crashes from outdated cached data.

## 🛠️ Stack

* HTML5 (Semantic & Accessible)
* CSS3 (Grid, Custom Properties, Glassmorphism, Animations)
* Vanilla JavaScript (ES6+ Modules, Closures, DOM API, Canvas API)

## 💻 How to Run Locally

Because this project utilizes strict ES6 Modules (`type="module"`), it cannot be opened directly from the file system. 

1. Clone the repository.
2. Open the project in VS Code.
3. Use the **Live Server** extension (or any local HTTP server) to serve `index.html`.
4. Log a workout to see the async Thunks and state engine in action!
