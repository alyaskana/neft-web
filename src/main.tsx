import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./fonts.scss";
import "./react-tabs.scss";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
