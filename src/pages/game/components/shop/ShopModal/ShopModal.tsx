import { FC } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

import { Modal, TModal } from "@/share/components";
import { Buy } from "./Buy/Buy";
import { Sell } from "./Sell";

type TShopModal = TModal;

export const ShopModal: FC<TShopModal> = (props) => {
  return (
    <Modal {...props}>
      <Tabs>
        <TabList>
          <Tab>Купить</Tab>
          <Tab>Продать</Tab>
        </TabList>

        <TabPanel>
          <Buy />
        </TabPanel>
        <TabPanel>
          <Sell />
        </TabPanel>
      </Tabs>
    </Modal>
  );
};
