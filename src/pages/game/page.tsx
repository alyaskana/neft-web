import { useEffect, useState } from "react";
import { useEvent } from "effector-react";
import { Subscription } from "@rails/actioncable";

import { useActionCable } from "@/hooks/useActionCable";

import { Land } from "./Land/Land";
import { FishAvatar } from "./fishes";
import { StashIcon } from "./stash";
import { Shop } from "./shop";
import { MoneyLabel } from "./money";

import { gamePageMounted } from "./model";
import { messageReceived, TMessage } from "./model";

export const GamePage = () => {
  const handleGamePageMounted = useEvent(gamePageMounted);
  const { consumer } = useActionCable();
  const [gameChannel, setGameChannel] = useState<Subscription | null>(null);

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
    };
  }, [consumer]);

  return (
    <div>
      <div>
        <FishAvatar />
        <MoneyLabel />
        <StashIcon />
        <Shop />
        <Land />
      </div>
    </div>
  );
};
