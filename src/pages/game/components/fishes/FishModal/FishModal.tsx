import { FC } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

import { Modal, TModal } from "@/share/components";
import { TFish } from "@/types/game";

import "react-tabs/style/react-tabs.css";
import s from "./FishModal.module.scss";

type TFishModal = TModal & {
  fish: TFish;
};

export const FishModal: FC<TFishModal> = ({ fish, ...props }) => {
  return (
    <Modal {...props}>
      <Tabs>
        <TabList>
          <Tab>Статистика</Tab>
        </TabList>

        <TabPanel>
          <h2>Статистика</h2>
          <div>
            <img src={fish.image} className={s.avatar} />
            <div>Уровень: {fish.level}</div>
            <div>Опыт: {fish.experience}</div>
          </div>
        </TabPanel>
      </Tabs>
    </Modal>
  );
};
