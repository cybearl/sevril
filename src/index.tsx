import React from "react";
import { createRoot } from "react-dom/client";

import { MatrixProvider } from "@/components/Contexts/MatrixContext";
import Home from "@/pages/Home";
import "@/styles/globals.css";
import "@/styles/terminal.css";
import "@/styles/fonts.css";


const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Root element not found");

createRoot(rootElement).render(
    <React.StrictMode>
        <MatrixProvider>
            <Home />
        </MatrixProvider>
    </React.StrictMode>
);