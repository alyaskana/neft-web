import { useEffect, useState } from "react";
import { useStore } from "effector-react";

import { $plants } from "@/pages/game/model";
import { TPlant } from "@/types/game";
import { buySeedFx } from "@/api/games";

import s from "./Seeds.module.scss";
import {
  Button,
  Card,
  LeftPanel,
  MiniCard,
  RightPanel,
} from "@/share/components";

export const Seeds = () => {
  const plants = useStore($plants);
  const [activePlant, setActivePlant] = useState<TPlant>(plants[0]);

  useEffect(() => {
    setActivePlant(plants[0]);
  }, [plants]);

  const handleClick = (plant: TPlant) => {
    buySeedFx({ plant_id: plant.id });
  };

  return (
    <>
      <LeftPanel>
        {plants.map((plant, index) => (
          <MiniCard
            active={plant.id == activePlant?.id}
            image={plant.seed_image}
            onClick={() => setActivePlant(plant)}
            // TODO: Переделать на правильную проверку
            isBlocked={index > 2}
            key={plant.id}
          />
        ))}
        ;
      </LeftPanel>
      <RightPanel>
        <Card
          name={activePlant.name}
          image={activePlant.seed_image}
          description={activePlant.description}
          rarity={activePlant.rarity}
          seedPrice={activePlant.seed_price}
          growingTime={activePlant.growing_time}
        />
        <Button
          onClick={() => {
            handleClick(activePlant);
          }}
        >
          купить
        </Button>
      </RightPanel>
    </>
  );
};
