import { useEffect } from "react";
import { useEvent, useStore } from "effector-react";
import { setGameChannel, $fishes } from "./model";

import { useActionCable } from "@/hooks/useActionCable";

import { Land, Fish, Stash, Shop, MoneyLabel, QucikPanel } from "./components";
import { gamePageMounted } from "./model";
import { messageReceived, TMessage } from "./model";

export const GamePage = () => {
  const handleGamePageMounted = useEvent(gamePageMounted);
  const { consumer } = useActionCable();
  const fishes = useStore($fishes);

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
        {fishes.map((fish) => (
          <Fish fish={fish} key={fish.id} />
        ))}
        <MoneyLabel />
        <QucikPanel />
        <Stash />
        <Shop />
        <Land />
      </div>
    </div>
  );
};
