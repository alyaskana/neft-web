import { FC } from "react";
import { useStore } from "effector-react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

import { Modal, TModal } from "@/share/components";
import { $seedStock, $crops } from "@/pages/game/model";

import "react-tabs/style/react-tabs.css";

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
          <h2>Семена</h2>
          {seedStock.map((seedStockItem) => {
            return (
              <div key={seedStockItem.id}>
                <img src={seedStockItem.plant.image} />
                <div>{seedStockItem.plant.name}</div>
                <div>количество: {seedStockItem.count}</div>
                <hr />
              </div>
            );
          })}
        </TabPanel>
        <TabPanel>
          <h2>Урожай контент</h2>
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
