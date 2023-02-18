import ShopUrl from "/src/assets/sprites/shop.png";
import s from "./ShopIcon.module.scss";

export const ShopIcon = () => {
  return (
    <div className={s.shopIcon}>
      <img src={ShopUrl} alt="Shop" />
    </div>
  );
};
