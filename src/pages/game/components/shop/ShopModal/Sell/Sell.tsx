import { useEffect, useState } from "react";
import { useStore } from "effector-react";

import { $stash } from "@/pages/game/model";
import { TCrop } from "@/types/game";
import { sellCropFx, sellMineralFx } from "@/api/games";
import {
  Button,
  Card,
  EmptyPanel,
  LeftPanel,
  MiniCard,
  RightPanel,
} from "@/share/components";

import s from "./Sell.module.scss";

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

export const Sell = () => {
  const stash = useStore($stash);
  const [activeCard, setActiveCard] = useState<TCard>(buildCards()[0]);

  useEffect(() => {
    setActiveCard(activeCard || buildCards()[0]);
  }, [stash]);

  const handleClick = (card: TCard) => {
    if (card.type === "crop") {
      const crop = stash.crops.find((crop) => crop.id == card.id)!;
      sellCropFx({ crop_id: crop.id });
    }
    if (card.type === "mineral_stock") {
      const mineralStock = stash.mineralStocks.find(
        (mineralStock) => mineralStock.id == card.id
      )!;
      sellMineralFx({ mineral_stock_id: mineralStock.id });
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
        price: crop.plant.price,
        experience: crop.plant.experience,
        type: crop.type,
        key: `${crop.type}-${crop.id}`,
      };
    });
    const mineralStocks = stash.mineralStocks.map((mineralStock) => {
      return {
        id: mineralStock.id,
        count: mineralStock.count,
        image: mineralStock.mineral.image,
        name: mineralStock.mineral.name,
        description: mineralStock.mineral.description,
        price: mineralStock.mineral.price,
        type: mineralStock.type,
        key: `${mineralStock.type}-${mineralStock.id}`,
      };
    });

    return [...crops, ...mineralStocks];
  }

  if (buildCards().length === 0) {
    return (
      <LeftPanel>
        <EmptyPanel>У вас нет ресурсов для продажи</EmptyPanel>
      </LeftPanel>
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
            key={card.id}
            count={card.count}
          />
        ))}
      </LeftPanel>
      <RightPanel>
        {activeCard && (
          <>
            <Card
              name={activeCard.name}
              image={activeCard.image}
              description={activeCard.description}
              seedPrice={activeCard.price}
            />
            <Button
              onClick={() => {
                handleClick(activeCard);
              }}
            >
              Продать за {activeCard.price}
            </Button>
          </>
        )}
      </RightPanel>
    </>
  );
};
