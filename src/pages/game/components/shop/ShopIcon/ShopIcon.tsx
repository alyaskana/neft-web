import { FC } from "react";
import cn from "classnames";

import { ReactComponent as MarketIconSvg } from "/src/assets/icons/market.svg";

import s from "./ShopIcon.module.scss";

type TShopIcon = {
  onClick: () => void;
};

export const ShopIcon: FC<TShopIcon> = ({ onClick }) => {
  return (
    <div className={cn(s.shopIcon, cn("step-1"))} onClick={onClick}>
      <MarketIconSvg />
    </div>
  );
};
