import { FC } from "react";
import StashUrl from "/src/assets/sprites/stash.png";
import s from "./StashIcon.module.scss";

type TStashIcon = {
  onClick: () => void;
};

export const StashIcon: FC<TStashIcon> = ({ onClick }) => {
  return (
    <div className={s.stashIcon} onClick={onClick}>
      <img src={StashUrl} alt="Stash" />
    </div>
  );
};
