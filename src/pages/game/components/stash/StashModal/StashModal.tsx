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
import { $stash, $activeFish, $userRecipes } from "@/pages/game/model";

import s from "./StashModal.module.scss";
import { eatCropFx } from "@/api/games";
import { log } from "console";

type TStashModal = TModal;

type TCard = {
  id: number;
  count?: number;
  image: string;
  key: string;
  name: string;
  description: string;
  price?: number;
  time?: number;
  experience?: number;
  type: string;
};

export const StashModal: FC<TStashModal> = (props) => {
  const stash = useStore($stash);
  const activeFish = useStore($activeFish);
  const userRecipes = useStore($userRecipes);

  const [activeCard, setActiveCard] = useState<TCard>(buildCards()[0]);

  useEffect(() => {
    const activeItem = activeCard ? activeCard : buildCards()[0];
    setActiveCard(activeItem);
  }, [stash]);

  const heandleEat = (card: TCard) => {
    const crop = stash.crops.find((crop) => crop.id == card.id)!;
    eatCropFx({ crop_id: crop.id, fish_id: activeFish.id });
  };

  function buildCards(): TCard[] {
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
        time: seedStock.plant.growing_time,
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
    const userRecipeCards = userRecipes.map((userRecipe) => {
      return {
        id: userRecipe.id,
        image: userRecipe.recipe.image,
        name: userRecipe.recipe.name,
        description: userRecipe.recipe.description,
        experience: userRecipe.recipe.experience,
        time: userRecipe.recipe.cooking_time,
        type: userRecipe.type,
        key: `${userRecipe.type}-${userRecipe.id}`,
      };
    });

    return [
      ...crops,
      ...seedStocks,
      ...instrumentStocks,
      ...mineralStocks,
      ...userRecipeCards,
    ];
  }

  return (
    <Modal {...props}>
      <Tabs>
        <TabPanel>
          <LeftPanel>
            {buildCards().map((card) => (
              <MiniCard
                count={card.count}
                image={card.image}
                active={activeCard?.key == card.key}
                onClick={() => setActiveCard(card)}
                key={card.key}
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
                  experience={activeCard.experience}
                  seedPrice={activeCard.price}
                  growingTime={activeCard.time}
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
