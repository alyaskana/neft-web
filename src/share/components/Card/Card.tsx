import { FC } from "react";
import cn from "classnames";

import { ReactComponent as CurrencyIcon } from "@/assets/icons/currency.svg";
import { ReactComponent as TimeIcon } from "@/assets/icons/time.svg";
import { ReactComponent as ArrowUpIcon } from "@/assets/icons/arrow-up.svg";

import s from "./Card.module.scss";

type TCardProps = {
  image: string;
  name: string;
  description: string;
  rarity: number;
  seedPrice?: number;
  growingTime?: number;
  experience?: number;
  sellingPrice?: number;
};

export const Card: FC<TCardProps> = ({
  image,
  name,
  description,
  rarity,
  seedPrice,
  growingTime,
  experience,
  sellingPrice,
}) => {
  return (
    <div className={s.card}>
      <div className={s.cardImage}>
        <img src={image} />
      </div>
      <div className={s.cardName}>{name}</div>
      <div className={s.cardDescription}>{description}</div>
      <div className={s.cardRarity}>
        Редкость:
        <div className={s.cardRarityItems}>
          {Array(5)
            .fill(null)
            .map((_, index) => (
              <div
                key={index}
                className={cn(s.cardRarityItem, {
                  [s.active]: index < rarity,
                })}
              />
            ))}
        </div>
      </div>
      <div className={s.specifications}>
        {seedPrice && (
          <div className={s.specificationsItem}>
            <CurrencyIcon />
            <div className={s.specificationsItemText}>{seedPrice} DSC</div>
          </div>
        )}
        {sellingPrice && (
          <div className={s.specificationsItem}>
            <CurrencyIcon />
            <div className={s.specificationsItemText}>{sellingPrice} DSC</div>
          </div>
        )}
        {growingTime && (
          <div className={s.specificationsItem}>
            <TimeIcon />
            <div className={s.specificationsItemText}>{growingTime} мин</div>
          </div>
        )}
        {experience && (
          <div className={s.specificationsItem}>
            <ArrowUpIcon />
            <div className={s.specificationsItemText}>{experience} XP</div>
          </div>
        )}
      </div>
    </div>
  );
};
