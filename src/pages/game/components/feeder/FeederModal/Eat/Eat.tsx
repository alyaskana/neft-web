import { useEffect, useState } from "react";
import { useStore } from "effector-react";

import { $stash, $activeFish } from "@/pages/game/model";
import { eatCropFx, eatRecipeFx } from "@/api/games";
import {
  Button,
  Card,
  LeftPanel,
  MiniCard,
  RightPanel,
} from "@/share/components";

import s from "./Eat.module.scss";

type TCard = {
  id: number;
  count: number;
  image: string;
  key: string;
  name: string;
  description: string;
  price?: number;
  growing_time?: number;
  experience?: number;
  type: string;
};

export const Eat = () => {
  const stash = useStore($stash);
  const activeFish = useStore($activeFish);
  const [activeCard, setActiveCard] = useState<TCard>(buildCards()[0]);

  useEffect(() => {
    setActiveCard(activeCard || buildCards()[0]);
  }, [stash]);

  const handleClick = (card: TCard) => {
    if (card.type === "crop") {
      const crop = stash.crops.find((crop) => crop.id == card.id)!;
      eatCropFx({ crop_id: crop.id, fish_id: activeFish.id });
    }
    if (card.type === "recipe_stock") {
      const recipeStock = stash.recipeStocks.find(
        (recipeStock) => recipeStock.id == card.id
      )!;
      eatRecipeFx({ recipe_stock_id: recipeStock.id, fish_id: activeFish.id });
    }
  };

  function buildCards() {
    const crops = stash.crops.map((crop) => {
      return {
        id: crop.id,
        count: crop.count,
        image: crop.plant.image,
        name: crop.plant.name,
        description: crop.plant.description,
        experience: crop.plant.experience,
        type: crop.type,
        key: `${crop.type}-${crop.id}`,
      };
    });
    const recipeStocks = stash.recipeStocks.map((recipeStock) => {
      return {
        id: recipeStock.id,
        count: recipeStock.count,
        image: recipeStock.recipe.image,
        name: recipeStock.recipe.name,
        description: recipeStock.recipe.description,
        experience: recipeStock.recipe.experience,
        type: recipeStock.type,
        key: `${recipeStock.type}-${recipeStock.id}`,
      };
    });

    return [...crops, ...recipeStocks];
  }

  return (
    <>
      <LeftPanel>
        {buildCards().map((card, index) => (
          <MiniCard
            active={card.key == activeCard.key}
            image={card.image}
            onClick={() => setActiveCard(card)}
            key={card.id}
            count={card.count}
          />
        ))}
        ;
      </LeftPanel>
      <RightPanel>
        {activeCard && (
          <>
            <Card
              name={activeCard.name}
              image={activeCard.image}
              description={activeCard.description}
              experience={activeCard.experience}
            />
            <Button
              onClick={() => {
                handleClick(activeCard);
              }}
            >
              Съесть
            </Button>
          </>
        )}
      </RightPanel>
    </>
  );
};
