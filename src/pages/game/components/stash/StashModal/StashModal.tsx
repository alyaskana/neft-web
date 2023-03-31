import { FC } from "react";
import { useStore } from "effector-react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

import { Modal, TModal } from "@/share/components";
import { $seedStock, $crops } from "@/pages/game/model";

import s from "./StashModal.module.scss";

type TStashModal = TModal;

export const StashModal: FC<TStashModal> = (props) => {
  const seedStock = useStore($seedStock);
  const crops = useStore($crops);

  return (
    <Modal {...props}>
      <Tabs>
        <TabList>
          <Tab>Семена</Tab>
          <Tab>Урожай</Tab>
        </TabList>

        <TabPanel>
          <div className={s.seeds}>
            {seedStock.map((seedStockItem) => {
              return (
                <div className={s.seed} key={seedStockItem.id}>
                  <div className={s.seedImage}>
                    <img src={seedStockItem.plant.seed_image} />
                    <div className={s.seedsCount}>{seedStockItem.count}</div>
                  </div>
                  <div className={s.seedInfo}>
                    <div className={s.seedName}>{seedStockItem.plant.name}</div>
                    <div className={s.seedDescription}>
                      {seedStockItem.plant.description}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </TabPanel>
        <TabPanel>
          {crops.map((crop) => {
            return (
              <div key={crop.id}>
                <img src={crop.plant.image} />
                <div>{crop.plant.name}</div>
                <div>количество: {crop.count}</div>
                <hr />
              </div>
            );
          })}
        </TabPanel>
      </Tabs>
    </Modal>
  );
};
