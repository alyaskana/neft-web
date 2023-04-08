import { FC } from "react";
import { ReactComponent as StashIconSvg } from "/src/assets/icons/stash.svg";
import s from "./StashIcon.module.scss";

type TStashIcon = {
  onClick: () => void;
};

export const StashIcon: FC<TStashIcon> = ({ onClick }) => {
  return (
    <div className={s.stashIcon} onClick={onClick}>
      <StashIconSvg />
    </div>
  );
};
