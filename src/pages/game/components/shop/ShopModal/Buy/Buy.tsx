import { useEffect, useState } from "react";
import { useStore } from "effector-react";

import { $plants } from "@/pages/game/model";
import { $instruments } from "@/pages/game/model";
import { TPlant } from "@/types/game";
import { buySeedFx } from "@/api/games";

import s from "./Buy.module.scss";
import {
  Button,
  Card,
  LeftPanel,
  MiniCard,
  RightPanel,
} from "@/share/components";

type TCard = {
  id: number;
  image: string;
  key: string;
  name: string;
  description: string;
  price: number;
  growingTime?: number;
  type: string;
};

export const Buy = () => {
  const plants = useStore($plants);
  const instruments = useStore($instruments);
  const [activeCard, setActiveCard] = useState<TCard>(buildCards()[0]);

  const handleClick = (card: TCard) => {
    if (card.type === "plant") {
      buySeedFx({ plant_id: card.id });
    }
    if (card.type === "instrument") {
      buyInstrumentFx({ instrument_id: card.id });
    }
  };

  function buildCards() {
    const plants_cards = plants.map((plant) => ({
      id: plant.id,
      image: plant.seed_image,
      key: `plant-${plant.id}`,
      name: plant.name,
      description: plant.description,
      price: plant.seed_price,
      growingTime: plant.growing_time,
      type: "plant",
    }));
    const instruments_cards = instruments.map((instrument) => ({
      id: instrument.id,
      image: instrument.image,
      key: `instrument-${instrument.id}`,
      name: instrument.name,
      description: instrument.description,
      price: instrument.price,
      type: "instrument",
    }));
    return [...plants_cards, ...instruments_cards];
  }

  return (
    <>
      <LeftPanel>
        {buildCards().map((card) => (
          <MiniCard
            active={card.key == activeCard.key}
            image={card.image}
            onClick={() => setActiveCard(card)}
            key={card.key}
          />
        ))}
      </LeftPanel>
      <RightPanel>
        <Card
          name={activeCard.name}
          image={activeCard.image}
          description={activeCard.description}
          seedPrice={activeCard.price}
          growingTime={activeCard.growingTime}
        />
        <Button
          onClick={() => {
            handleClick(activeCard);
          }}
        >
          купить
        </Button>
      </RightPanel>
    </>
  );
};
