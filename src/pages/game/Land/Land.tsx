import { useEffect, useRef, useState } from "react";
import { useStore } from "effector-react";
import { Subscription } from "@rails/actioncable";

import { $user } from "@/pages";
import { Plot } from "../Plot/Plot";
import { useActionCable } from "@/hooks/useActionCable";

import { messageReceived, TMessage } from "./model";

import s from "./Land.module.scss";

const buildSpiral = (size: number): number[][] => {
  if (size === 1) return [[1]];
  if (size === 2)
    return [
      [3, 4],
      [2, 1],
    ];
  let spiral = buildSpiral(size - 2);
  // add a prefix and a postfix number to those rows:
  let start = size * (size - 1);
  let end = (size - 2) * (size - 2) + 1;
  for (let row of spiral) {
    row.unshift(start--);
    row.push(end++);
  }
  // add extra row at top and bottom
  start = size * (size - 1) + 1;
  spiral.unshift(spiral[0].map(() => start++));
  end = size * (size - 2) + 2;
  spiral.push(spiral[0].map(() => end--));
  return spiral;
};

export const Land = () => {
  const user = useStore($user);
  const spiral = buildSpiral(10);
  const { consumer } = useActionCable();
  const [gameChannel, setGameChannel] = useState<Subscription | null>(null);

  useEffect(() => {
    window.scrollTo(window.innerWidth / 2 - 240, window.innerHeight / 2 + 240);
  }, []);

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
  }, [consumer, user?.id]);

  if (!user) return null;

  return (
    <div className={s.land}>
      {spiral.map((rowArray, rowId) => {
        return rowArray.map((id, colId) => {
          return (
            <Plot
              plot={user.plots[id - 1]}
              key={`cell-${rowId}-${colId}`}
              column={colId + 1}
              row={rowId + 1}
            />
          );
        });
      })}
    </div>
  );
};
