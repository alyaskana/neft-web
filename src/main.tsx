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
    selector: ".step-0",
    content: "This is my 0 Step",
  },
  {
    selector: ".step-1",
    content: "This is my 1 Step",
  },
  {
    selector: ".step-2",
    content: "This is my 2 Step",
  },
  {
    selector: ".step-3",
    content: "This is my 3 Step",
  },
  {
    selector: ".step-4",
    content: "This is my 4 Step",
  },
  {
    selector: ".step-5",
    content: "This is my 5 Step",
  },
  {
    selector: ".step-6",
    content: "This is my 6 Step",
  },
  {
    selector: ".step-7",
    content: "This is my 7 Step",
  },
  {
    selector: ".step-8",
    content: "This is my 8 Step",
  },
];

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // <React.StrictMode>
  <TourProvider
    steps={steps}
    showDots={false}
    showBadge={false}
    showCloseButton={false}
    showNavigation={false}
    // onClickMask={() => {}}
  >
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </TourProvider>
  // </React.StrictMode>
);
