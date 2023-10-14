import { createRoot } from 'react-dom/client';
import "./index.css";
import App from "./App.jsx";

// Use document.getElementById to find the container by its ID
const container = document.getElementById("root");
const root = createRoot(container);

root.render(<App tab="home" />);