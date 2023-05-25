import { FC, useEffect, useState } from "react";
import { useStore } from "effector-react";
import { Tabs, TabPanel } from "react-tabs";

import {
  Card,
  LeftPanel,
  RightPanel,
  MiniCard,
  Modal,
  TModal,
  Button,
} from "@/share/components";
import { $stash, $activeFish } from "@/pages/game/model";

import s from "./StashModal.module.scss";
import { eatCropFx } from "@/api/games";

type TStashModal = TModal;

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

export const StashModal: FC<TStashModal> = (props) => {
  const stash = useStore($stash);
  const activeFish = useStore($activeFish);

  const [activeCard, setActiveCard] = useState<TCard>(buildCards()[0]);

  useEffect(() => {
    const activeItem = activeCard ? activeCard : buildCards()[0];
    setActiveCard(activeItem);
  }, [stash]);

  const heandleEat = (card: TCard) => {
    const crop = stash.crops.find((crop) => crop.id == card.id)!;
    eatCropFx({ crop_id: crop.id, fish_id: activeFish.id });
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
    const seedStocks = stash.seedStocks.map((seedStock) => {
      return {
        id: seedStock.id,
        count: seedStock.count,
        image: seedStock.plant.seed_image,
        name: seedStock.plant.name,
        description: seedStock.plant.description,
        price: seedStock.plant.seed_price,
        growing_time: seedStock.plant.growing_time,
        type: seedStock.type,
        key: `${seedStock.type}-${seedStock.id}`,
      };
    });
    const instrumentStocks = stash.instrumentStocks.map((instrumentStock) => {
      return {
        id: instrumentStock.id,
        count: instrumentStock.count,
        image: instrumentStock.instrument.image,
        name: instrumentStock.instrument.name,
        description: instrumentStock.instrument.description,
        price: instrumentStock.instrument.price,
        type: instrumentStock.type,
        key: `${instrumentStock.type}-${instrumentStock.id}`,
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

    return [
      ...crops,
      ...seedStocks,
      ...instrumentStocks,
      ...mineralStocks,
      ...recipeStocks,
    ];
  }

  return (
    <Modal {...props}>
      <Tabs>
        <TabPanel>
          <LeftPanel>
            {buildCards().map((Card) => (
              <MiniCard
                count={Card.count}
                image={Card.image}
                active={activeCard?.key == Card.key}
                onClick={() => setActiveCard(Card)}
                key={Card.key}
              />
            ))}
          </LeftPanel>
          <RightPanel>
            {activeCard && (
              <>
                <Card
                  image={activeCard.image}
                  name={activeCard.name}
                  description={activeCard.description}
                  seedPrice={activeCard.price}
                  growingTime={activeCard.growing_time}
                />
                {activeCard.type == "crop" && (
                  <Button
                    onClick={() => {
                      heandleEat(activeCard);
                    }}
                  >
                    съесть
                  </Button>
                )}
              </>
            )}
          </RightPanel>
        </TabPanel>
      </Tabs>
    </Modal>
  );
};
