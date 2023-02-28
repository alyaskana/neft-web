import { useEffect, useState } from "react";
import { useEvent } from "effector-react";
import { setGameChannel } from "./model";

import { useActionCable } from "@/hooks/useActionCable";

import {
  Land,
  FishAvatar,
  Stash,
  Shop,
  MoneyLabel,
  LastSeeds,
} from "./components";
import { gamePageMounted } from "./model";
import { messageReceived, TMessage } from "./model";

export const GamePage = () => {
  const handleGamePageMounted = useEvent(gamePageMounted);
  const { consumer } = useActionCable();

  useEffect(() => {
    handleGamePageMounted();
  }, [handleGamePageMounted]);

  useEffect(() => {
    let gameChannel: any = null;

    gameChannel = consumer?.subscriptions.create(
      {
        channel: "GameChannel",
      },
      {
        received: (data: TMessage) => {
          messageReceived(data);
        },
      }
    );

    setGameChannel(gameChannel);

    return () => {
      gameChannel?.unsubscribe();
      setGameChannel(null);
    };
  }, [consumer]);

  return (
    <div>
      <div>
        <FishAvatar />
        <MoneyLabel />
        <LastSeeds />
        <Stash />
        <Shop />
        <Land />
      </div>
    </div>
  );
};
