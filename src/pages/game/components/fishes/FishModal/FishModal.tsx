import { FC } from "react";
import { useStore } from "effector-react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

import { Modal, TModal } from "@/share/components";
import { TFish, TCrop } from "@/types/game";
import { eatCropFx } from "@/api/games";
import { $crops } from "@/pages/game/model";

import "react-tabs/style/react-tabs.css";
import s from "./FishModal.module.scss";

type TFishModal = TModal & {
  fish: TFish;
};

export const FishModal: FC<TFishModal> = ({ fish, ...props }) => {
  const crops = useStore($crops);
  const heandleEat = (crop: TCrop) => {
    eatCropFx({ crop_id: crop.id, fish_id: fish.id });
  };

  return (
    <Modal {...props}>
      <Tabs>
        <TabList>
          <Tab>Статистика</Tab>
          <Tab>Кормешка</Tab>
        </TabList>

        <TabPanel>
          <h2>Статистика</h2>
          <div>
            <img src={fish.image} className={s.avatar} />
            <div>Уровень: {fish.level}</div>
            <div>Опыт: {fish.experience}</div>
          </div>
        </TabPanel>
        <TabPanel>
          <h2>Доступная еда</h2>
          {crops.map((crop) => {
            return (
              <div key={crop.id}>
                <img src={crop.plant.image} />
                <div>{crop.plant.name}</div>
                <div>количество: {crop.count}</div>
                <button onClick={() => heandleEat(crop)}>Съесть</button>
                <hr />
              </div>
            );
          })}
        </TabPanel>
      </Tabs>
    </Modal>
  );
};
