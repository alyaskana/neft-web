import { createEffect, createEvent, split } from "effector";

export type TMessage = {
  type: "plantHasGrown";
  text: string;
};

export const messageReceived = createEvent<TMessage>();
export const loginPageMounted = createEvent();
export const plantHasGrownFX = createEffect<TMessage, void>((msg) => {
  console.log("plantHasGrown message received :", msg);
});

split({
  source: messageReceived,
  match: {
    plantHasGrown: (msg) => msg.type === "plantHasGrown",
  },
  cases: {
    plantHasGrown: plantHasGrownFX,
  },
});
