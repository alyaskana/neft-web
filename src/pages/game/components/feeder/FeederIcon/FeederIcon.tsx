import { FC } from "react";
import cn from "classnames";

import { ReactComponent as FeederIconSvg } from "/src/assets/icons/market.svg";
import s from "./FeederIcon.module.scss";

type TFeederIcon = {
  onClick: () => void;
};

export const FeederIcon: FC<TFeederIcon> = ({ onClick }) => {
  return (
    <div className={cn(s.feederIcon, "step-6")} onClick={onClick}>
      <FeederIconSvg />
    </div>
  );
};
