import { FC } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

import { Modal, TModal } from "@/share/components";
import { Seeds } from "./Seed/Seeds";
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
          <Seeds />
        </TabPanel>
        <TabPanel>
          <Sell />
        </TabPanel>
      </Tabs>
    </Modal>
  );
};
