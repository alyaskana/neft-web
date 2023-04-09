import { useEffect, useState } from "react";
import { useStore } from "effector-react";

import { $stash } from "@/pages/game/model";
import { TCrop } from "@/types/game";
import { sellCropFx } from "@/api/games";
import {
  Button,
  Card,
  LeftPanel,
  MiniCard,
  RightPanel,
} from "@/share/components";

import s from "./Sell.module.scss";

export const Sell = () => {
  const stash = useStore($stash);
  const [activeCrop, setActiveCrop] = useState<TCrop>(stash?.crops[0]);

  useEffect(() => {
    setActiveCrop(activeCrop || stash.crops[0]);
  }, [stash]);

  const handleClick = (crop: TCrop) => {
    sellCropFx({ crop_id: crop.id });
  };

  return (
    <>
      <LeftPanel>
        {stash.crops.map((crop, index) => (
          <MiniCard
            active={crop.id == activeCrop?.id}
            image={crop.plant.image}
            onClick={() => setActiveCrop(crop)}
            key={crop.id}
            count={crop.count}
          />
        ))}
        ;
      </LeftPanel>
      <RightPanel>
        <Card
          name={activeCrop.plant.name}
          image={activeCrop.plant.image}
          description={activeCrop.plant.description}
          rarity={activeCrop.plant.rarity}
          seedPrice={activeCrop.plant.price}
          growingTime={activeCrop.plant.experience}
        />
        <Button
          onClick={() => {
            handleClick(activeCrop);
          }}
        >
          продать
        </Button>
      </RightPanel>
    </>
  );
};
