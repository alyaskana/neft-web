import { FC } from "react";
import cn from "classnames";

import { TCrop, TSeedStock } from "@/types/game";

import s from "./MiniCard.module.scss";

type TMiniCardProps = {
  item: TSeedStock | TCrop;
  active: boolean;
  onClick: (item: TSeedStock | TCrop) => void;
};

export const MiniCard: FC<TMiniCardProps> = ({ item, active, onClick }) => {
  const imgHref =
    item.type == "crop" ? item.plant.image : item.plant.seed_image;
  return (
    <div
      className={cn(s.miniCard, { [s.active]: active })}
      onClick={() => {
        onClick(item);
      }}
    >
      <div className={s.miniCardImage}>
        <img
          src={imgHref}
          className={cn({
            [s.seed]: item.type == "seed_stock",
            [s.plant]: item.type == "crop",
          })}
        />
      </div>
      <div className={s.miniCardCount}>{item.count}</div>
    </div>
  );
};
