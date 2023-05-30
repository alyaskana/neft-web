import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { TourProvider } from "@reactour/tour";

import App from "./App";
import "./fonts.scss";
import "./react-tabs.scss";
import "./index.css";

const steps = [
  {
    selector: ".first-step",
    content: "This is my first Step",
  },
];

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // <React.StrictMode>
  <TourProvider steps={steps}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </TourProvider>
  // </React.StrictMode>
);
