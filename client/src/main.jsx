import { createRoot } from 'react-dom/client';
import "./index.css";
import App from "./App.jsx";
import * as serviceWorker from "./service-worker.js";

// Use document.getElementById to find the container by its ID
const container = document.getElementById("root");
console.log(container)
const root = createRoot(container);

root.render(<App tab="home" />);

serviceWorker.register();
