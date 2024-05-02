import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./webapp/app/App.tsx";
import "./webapp/app/styles.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
