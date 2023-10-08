import { createRoot } from 'react-dom/client';
import "/src/index.css";
import App from "/src/App.jsx";
import * as serviceWorker from "/src/service-worker.js";

const container = document.getElementById("app");
const root = createRoot(container);

root.render(<App tab="home" />);

serviceWorker.register();