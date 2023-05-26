import { attach, createEffect } from "effector";
import { Subscription } from "@rails/actioncable";
import { $gameChannel } from "@/pages/game/model";
import { TCableMessage } from "@/types/cable";

type TBackendRequest = {
  message: TCableMessage;
  channel: Subscription | null;
};
const backendRequestFx = createEffect<TBackendRequest, void>(
  ({ message, channel }) => {
    console.log("backendRequestFx", message, channel);

    channel?.send(message);
  }
);

export const gameChannelRequestFx = attach({
  effect: backendRequestFx,
  source: $gameChannel,
  mapParams: (message: TCableMessage, channel) => ({
    message,
    channel,
  }),
});
