import { FC } from "react";
import { useStore } from "effector-react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

import { Modal, TModal } from "@/share/components";
import { TFish, TCrop } from "@/types/game";
import { eatCropFx } from "@/api/games";
import { $crops } from "@/pages/game/model";

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
          <Tab>Кормёжка</Tab>
        </TabList>

        <TabPanel>
          <div>
            <img src={fish.image} className={s.avatar} />
            <div>Уровень: {fish.level}</div>
            <div>Опыт: {fish.experience}</div>
          </div>
        </TabPanel>
        <TabPanel>
          {crops.map((crop) => {
            return (
              <div className={s.crop} key={crop.id}>
                <div className={s.cropImage}>
                  <img src={crop.plant.image} />
                  <div className={s.cropsCount}>{crop.count}</div>
                </div>
                <div className={s.cropInfo}>
                  <div className={s.cropName}>{crop.plant.name}</div>
                  <button
                    className={s.cropEat}
                    onClick={() => heandleEat(crop)}
                  >
                    Съесть
                  </button>
                </div>
              </div>
            );
          })}
        </TabPanel>
      </Tabs>
    </Modal>
  );
};
