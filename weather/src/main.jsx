import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ClimaProvider } from "./contexts/ClimaContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ClimaProvider>
      <App />
    </ClimaProvider>
  </React.StrictMode>
);
