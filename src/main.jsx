// 1. Importações fundamentais do React
import React from "react";
import ReactDOM from "react-dom/client";

// 2. Importação do componente raiz (onde configuramos as rotas)
import App from "./App.jsx";

// 3. O SEGREDO DO TAILWIND: Importamos o CSS global aqui
import "./index.css";

// 4. Inicialização e renderização do app na árvore do navegador (DOM)
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
