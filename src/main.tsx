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
    content:
      "Это твой участок, на нем можно выращивать водоросли и добывать ресурсы. Давай соберем первый урожай.",
  },
  {
    selector: ".step-1",
    content:
      "Здесь у нас рынок, на котором можно продать урожай и купить что-то полезное для фермы",
  },
  {
    selector: ".step-2",
    content: "Давай продадим весь урожай, чтобы купить новых семян",
  },
  {
    selector: ".step-3",
    content: "Теперь на вырученные деньги давай купим еще семян",
  },
  {
    selector: ".step-4",
    content:
      "Здесь можно найти содержимое сундука твоей рыбки. Давай выберем семена и посадим их на участке.",
  },
  {
    selector: ".step-5",
    content: "Посади семена и собери урожай",
  },
  {
    selector: ".step-6",
    content:
      "Теперь давай научимся добывать ресурсы с участка, для этого нужно купить коралловый нож",
  },
  {
    selector: ".step-7",
    content:
      "Коралловый нож срезает ресурс только один раз, но его можно купить на рынке в любой момент",
  },
  {
    selector: ".step-8",
    content: "Давай выберем его в инвентаре",
  },
  {
    selector: ".step-9",
    content: "Просто кликни на ресурс, чтобы добыть его!",
  },
  {
    selector: ".step-10",
    content: "Пора посмотреть, что лежит в кормушке и покормить рыбку",
  },
  {
    selector: ".step-11",
    content: "Выросшие растения при съедании дают рыбке несколько очков опыта",
  },
  {
    selector: ".step-12",
    content:
      "На этом пока все! Продолжай кормить рыбку и прокачивать ее уровень, чтобы открыть новые навыки! При клике на ее аватарку можно посмотреть карточку, где отображен текущий опыт и уровень персонажа",
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
    onClickMask={() => {}}
    styles={{
      popover: (base) => ({
        ...base,
        borderRadius: 12,
        border: "3px solid #FAB140",
        padding: "16px 16px 14px",
        fontFamily: "Jeko",
        color: "#9F6100",
        maxWidth: 270,
        textAlign: "center",
        lineHeight: "20px",
        fontSize: 16,
        backgroundColor: "#FFEFD6",
      }),
      maskArea: (base) => ({ ...base, rx: 16 }),
    }}
  >
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </TourProvider>
  // </React.StrictMode>
);
