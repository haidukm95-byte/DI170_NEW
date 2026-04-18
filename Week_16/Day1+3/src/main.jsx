import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

const elem = <h2>my first {1 + 1} jsx</h2>;

createRoot(document.getElementById("root")).render(<App />);
