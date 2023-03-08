import { FC } from "react";
import { useStore } from "effector-react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

import { Modal, TModal } from "@/share/components";
import { $plants } from "@/pages/game/model";

import "react-tabs/style/react-tabs.css";

type TShopModal = TModal;

export const ShopModal: FC<TShopModal> = (props) => {
  const plants = useStore($plants);

  return (
    <Modal {...props}>
      <Tabs>
        <TabList>
          <Tab>Купить</Tab>
          <Tab>Продать</Tab>
        </TabList>

        <TabPanel>
          <h2>Семена</h2>
          {plants.map((plant) => {
            return (
              <div key={plant.id}>
                <img src={plant.seed_image} />
                <div>{plant.name}</div>
                <div>{plant.price}</div>
                <hr />
              </div>
            );
          })}
        </TabPanel>
        <TabPanel>
          <h2>Продать контент</h2>
        </TabPanel>
      </Tabs>
    </Modal>
  );
};
