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
} from "@/share/components";
import { $stash } from "@/pages/game/model";
import { TCrop, TSeedStock, TStash } from "@/types/game";

import s from "./StashModal.module.scss";

type TStashModal = TModal;

export const StashModal: FC<TStashModal> = (props) => {
  const stash = useStore($stash);
  const [activeStashItem, setActiveStashItem] = useState<TSeedStock | TCrop>(
    stash.seedStocks[0] || stash.crops[0]
  );

  useEffect(() => {
    const activeItem = activeStashItem
      ? activeStashItem
      : stash.seedStocks[0] || stash.crops[0];
    setActiveStashItem(activeItem);
  }, [stash]);

  return (
    <Modal {...props}>
      <Tabs>
        <TabPanel>
          <LeftPanel>
            {Object.keys(stash).map((key) => {
              return stash[key as keyof TStash].map((stashItem) => (
                <MiniCard
                  count={stashItem.count}
                  image={
                    stashItem.type == "crop"
                      ? stashItem.plant.image
                      : stashItem.plant.seed_image
                  }
                  active={
                    stashItem.id == activeStashItem?.id &&
                    stashItem.type == activeStashItem?.type
                  }
                  onClick={() => setActiveStashItem(stashItem)}
                  key={`${stashItem.type}-${stashItem.id}`}
                />
              ));
            })}
          </LeftPanel>
          <RightPanel>
            {activeStashItem && activeStashItem.type == "crop" && (
              <Card
                image={activeStashItem.plant.image}
                name={activeStashItem.plant.name}
                description={activeStashItem.plant.description}
                rarity={activeStashItem.plant.rarity}
                sellingPrice={activeStashItem.plant.price}
                experience={activeStashItem.plant.experience}
              />
            )}
            {activeStashItem && activeStashItem.type == "seed_stock" && (
              <Card
                image={activeStashItem.plant.seed_image}
                name={activeStashItem.plant.name}
                description={activeStashItem.plant.description}
                rarity={activeStashItem.plant.rarity}
                seedPrice={activeStashItem.plant.seed_price}
                growingTime={activeStashItem.plant.growing_time}
              />
            )}
          </RightPanel>
        </TabPanel>
      </Tabs>
    </Modal>
  );
};
