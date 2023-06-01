import { FC } from "react";
import cn from "classnames";

import { TFish } from "@/types/game";
import { ProgressBar } from "../ProgressBar/ProgressBar";
import s from "./FishAvatar.module.scss";

type TFishAvatar = {
  onClick: () => void;
  fish: TFish;
};

export const FishAvatar: FC<TFishAvatar> = ({ fish, onClick }) => {
  return (
    <div className={cn(s.fishAvatar, "step-8")} onClick={onClick}>
      <img src={fish.image} />
      <div className={s.fishProgressBar}>
        <ProgressBar fish={fish} />
      </div>
    </div>
  );
};
