import { FC } from "react";
import ShopUrl from "/src/assets/icons/market.png";
import { ReactComponent as MarketIconSvg } from "/src/assets/icons/market.svg";

import s from "./ShopIcon.module.scss";

type TShopIcon = {
  onClick: () => void;
};

export const ShopIcon: FC<TShopIcon> = ({ onClick }) => {
  return (
    <div className={s.shopIcon} onClick={onClick}>
      <MarketIconSvg />
    </div>
  );
};
