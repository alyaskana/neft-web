import { FC } from "react";
import cn from "classnames";

import { ReactComponent as CurrencyIcon } from "@/assets/icons/currency.svg";
import { ReactComponent as TimeIcon } from "@/assets/icons/time.svg";
import { ReactComponent as ArrowUpIcon } from "@/assets/icons/arrow-up.svg";

import s from "./Card.module.scss";
import { TCrop, TRecipePlant } from "@/types/game";
import { $crops } from "@/pages/game/model";
import { useStore } from "effector-react";

type TCardProps = {
  image: string;
  name: string;
  description: string;
  seedPrice?: number;
  growingTime?: number;
  experience?: number;
  sellingPrice?: number;
  ingredients?: TRecipePlant[];
};

const Ingredient: FC<{ ingredient: TRecipePlant; crop?: TCrop }> = ({
  ingredient,
  crop,
}) => {
  return (
    <div className={s.cardIngredient}>
      <div className={s.cardIngredientName}>{ingredient.plant.name}</div>
      <div
        className={cn(s.cardIngredientCount, {
          [s.success]: crop?.count || 0 >= ingredient.count,
          [s.fail]: crop?.count || 0 < ingredient.count,
        })}
      >
        {`${crop?.count || 0}/${ingredient.count}`}
      </div>
    </div>
  );
};
export const Card: FC<TCardProps> = ({
  image,
  name,
  description,
  seedPrice,
  growingTime,
  experience,
  sellingPrice,
  ingredients,
}) => {
  const crops = useStore($crops);

  return (
    <div className={s.card}>
      <div className={s.cardImage}>
        <img src={image} />
      </div>
      <div className={s.cardName}>{name}</div>
      <div className={s.cardDescription}>{description}</div>
      <div>
        {ingredients &&
          ingredients.map((ingredient) => (
            <div className={s.cardIngredients}>
              <Ingredient
                ingredient={ingredient}
                crop={crops.find(
                  (crop) => crop.plant.id == ingredient.plant.id
                )}
              />
            </div>
          ))}
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
            <div className={s.specificationsItemText}>
              {growingTime / 60} мин
            </div>
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
