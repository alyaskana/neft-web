import { TFish } from "@/types/game";
import { FC } from "react";
import s from "./FishAvatar.module.scss";

type TFishAvatar = {
  onClick: () => void;
  fish: TFish;
};

export const FishAvatar: FC<TFishAvatar> = ({ fish, onClick }) => {
  return (
    <div className={s.fishAvatar} onClick={onClick}>
      <img src={fish.image} />
    </div>
  );
};
