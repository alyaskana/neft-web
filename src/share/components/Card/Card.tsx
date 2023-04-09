import { FC } from "react";
import cn from "classnames";

import { ReactComponent as CurrencyIcon } from "@/assets/icons/currency.svg";
import { ReactComponent as TimeIcon } from "@/assets/icons/time.svg";
import { ReactComponent as ArrowUpIcon } from "@/assets/icons/arrow-up.svg";

import s from "./Card.module.scss";
import { TCrop, TSeedStock } from "@/types/game";

type TCardProps = {
  item?: TSeedStock | TCrop;
};

export const Card: FC<TCardProps> = ({ item }) => {
  if (!item) return null;

  return (
    <div className={s.card}>
      <div className={s.cardImage}>
        <img
          src={
            item?.type == "crop" ? item?.plant.image : item?.plant.seed_image
          }
        />
      </div>
      <div className={s.cardName}>{item?.plant.name}</div>
      <div className={s.cardDescription}>{item?.plant.description}</div>
      <div className={s.cardRarity}>
        Редкость:
        <div className={s.cardRarityItems}>
          {Array(5)
            .fill(null)
            .map((_, index) => (
              <div
                key={index}
                className={cn(s.cardRarityItem, {
                  [s.active]: index < item?.plant.rarity,
                })}
              />
            ))}
        </div>
      </div>
      <div className={s.specifications}>
        <div className={s.specificationsItem}>
          <CurrencyIcon />
          <div className={s.specificationsItemText}>
            {item?.plant.seed_price} DSC
          </div>
        </div>
        {item?.type == "seed_stock" && (
          <div className={s.specificationsItem}>
            <TimeIcon />
            <div className={s.specificationsItemText}>
              {item?.plant.growing_time} мин
            </div>
          </div>
        )}
        {item?.type == "crop" && (
          <div className={s.specificationsItem}>
            <ArrowUpIcon />
            <div className={s.specificationsItemText}>
              {item?.plant.experience} XP
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
