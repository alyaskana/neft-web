import { FC } from "react";
import ShopUrl from "/src/assets/sprites/shop.png";
import s from "./ShopIcon.module.scss";

type TShopIcon = {
  onClick: () => void;
};

export const ShopIcon: FC<TShopIcon> = ({ onClick }) => {
  return (
    <div className={s.shopIcon} onClick={onClick}>
      <img src={ShopUrl} alt="Shop" />
    </div>
  );
};
