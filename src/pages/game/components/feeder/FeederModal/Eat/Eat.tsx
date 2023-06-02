import { useEffect, useState } from "react";
import { useStore } from "effector-react";

import { $stash, $activeFish, $activeTour, $crops } from "@/pages/game/model";
import { eatCropFx, eatDishFx } from "@/api/games";
import {
  Button,
  Card,
  EmptyPanel,
  LeftPanel,
  MiniCard,
  RightPanel,
} from "@/share/components";

import s from "./Eat.module.scss";
import { useTour } from "@reactour/tour";

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
  const activeTour = useStore($activeTour);
  const { currentStep, setCurrentStep } = useTour();

  useEffect(() => {
    if (activeTour && currentStep == 10) {
      setCurrentStep(11);
    }
  }, [activeTour, currentStep]);

  useEffect(() => {
    setActiveCard(activeCard || buildCards()[0]);
  }, [stash]);

  const handleClick = (card: TCard) => {
    if (card.type === "crop") {
      const crop = stash.crops.find((crop) => crop.id == card.id)!;
      eatCropFx({ crop_id: crop.id, fish_id: activeFish.id });
    }
    if (card.type === "dish") {
      const dish = stash.dishes.find((dish) => dish.id == card.id)!;
      eatDishFx({ dish_id: dish.id, fish_id: activeFish.id });
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
    const dishes = stash.dishes.map((dish) => {
      return {
        id: dish.id,
        count: dish.count,
        image: dish.recipe.image,
        name: dish.recipe.name,
        description: dish.recipe.description,
        experience: dish.recipe.experience,
        type: dish.type,
        key: `${dish.type}-${dish.id}`,
      };
    });

    return [...crops, ...dishes];
  }

  if (buildCards().length === 0) {
    return (
      <EmptyPanel>
        <span style={{ color: "#BAC24F", fontSize: "24px" }}>
          В кормушке нет еды :(
        </span>
        <br />
        Вырастите растения или приготовьте
        <br />
        блюдо, чтобы съесть
      </EmptyPanel>
    );
  }

  return (
    <>
      <LeftPanel>
        {buildCards().map((card, index) => (
          <MiniCard
            active={card.key == activeCard.key}
            image={card.image}
            onClick={() => setActiveCard(card)}
            key={card.key}
            count={card.count}
          />
        ))}
      </LeftPanel>
      <RightPanel className="step-11">
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
