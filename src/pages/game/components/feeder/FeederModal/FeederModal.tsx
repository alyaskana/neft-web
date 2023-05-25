import { FC } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

import { Modal, TModal } from "@/share/components";
import { Eat } from "./Eat/Eat";
import { Cook } from "./Cook";

type TFeederModal = TModal;

export const FeederModal: FC<TFeederModal> = (props) => {
  return (
    <Modal {...props}>
      <Tabs>
        <TabList>
          <Tab>Съесть</Tab>
          <Tab>Приготовить</Tab>
        </TabList>

        <TabPanel>
          <Eat />
        </TabPanel>
        <TabPanel>
          <Cook />
        </TabPanel>
      </Tabs>
    </Modal>
  );
};
