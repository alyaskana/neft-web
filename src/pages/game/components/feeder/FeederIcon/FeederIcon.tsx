import { FC } from "react";
import { ReactComponent as FeederIconSvg } from "/src/assets/icons/market.svg";

import s from "./FeederIcon.module.scss";

type TFeederIcon = {
  onClick: () => void;
};

export const FeederIcon: FC<TFeederIcon> = ({ onClick }) => {
  return (
    <div className={s.feederIcon} onClick={onClick}>
      <FeederIconSvg />
    </div>
  );
};
