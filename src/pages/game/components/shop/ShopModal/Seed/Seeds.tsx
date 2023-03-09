import { useStore } from "effector-react";

import { $plants } from "@/pages/game/model";
import { TPlant } from "@/types/game";
import { buySeedFx } from "@/api/games";

import s from "./Seeds.module.scss";

export const Seeds = () => {
  const plants = useStore($plants);

  const handleClick = (plant: TPlant) => {
    buySeedFx({ plant_id: plant.id });
  };

  return (
    <div>
      <h2>Семена</h2>
      {plants.map((plant) => {
        return (
          <div
            key={plant.id}
            className={s.seed}
            onClick={() => handleClick(plant)}
          >
            <img src={plant.seed_image} />
            <div>{plant.name}</div>
            <div>{plant.seed_price}</div>
            <hr />
          </div>
        );
      })}
    </div>
  );
};
