import { FC } from "react";
import { useStore } from "effector-react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

import { Modal, TModal } from "@/share/components";
import { $seeds } from "@/pages/game/model";

import "react-tabs/style/react-tabs.css";

type TShopModal = TModal;

export const ShopModal: FC<TShopModal> = (props) => {
  const seeds = useStore($seeds);

  return (
    <Modal {...props}>
      <Tabs>
        <TabList>
          <Tab>Купить</Tab>
          <Tab>Продать</Tab>
        </TabList>

        <TabPanel>
          <h2>Семена</h2>
          {seeds.map((seed) => {
            return (
              <div key={seed.id}>
                <img src={seed.image} />
                <div>{seed.name}</div>
                <div>{seed.price}</div>
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
