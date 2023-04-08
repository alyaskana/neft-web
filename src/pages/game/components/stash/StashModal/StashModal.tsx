import { FC, useEffect, useState } from "react";
import { useStore } from "effector-react";
import { Tabs, TabPanel } from "react-tabs";
import cn from "classnames";

import { Modal, TModal } from "@/share/components";
import { $stash, $crops } from "@/pages/game/model";
import { TCrop, TSeedStock } from "@/types/game";

import { ReactComponent as CurrencyIcon } from "@/assets/icons/currency.svg";
import { ReactComponent as TimeIcon } from "@/assets/icons/time.svg";
import s from "./StashModal.module.scss";

type TStashModal = TModal;

type TStachItem = {
  item: TSeedStock | TCrop;
  active: boolean;
  onClick: (item: TSeedStock | TCrop) => void;
};

const StachItem: FC<TStachItem> = ({ item, active, onClick }) => {
  return (
    <div
      className={cn(s.stashItem, { [s.active]: active })}
      onClick={() => {
        onClick(item);
      }}
    >
      <div className={s.stashItemImage}>
        <img src={item.plant.seed_image} />
        <div className={s.stashItemCount}>{item.count}</div>
      </div>
    </div>
  );
};

export const StashModal: FC<TStashModal> = (props) => {
  const stash = useStore($stash);
  const crops = useStore($crops);
  const [activeStashItem, setActiveStashItem] = useState<TSeedStock | TCrop>(
    stash.seedStocks[0] || stash.crops[0]
  );

  useEffect(() => {
    const activeItem = activeStashItem
      ? activeStashItem
      : stash.seedStocks[0] || stash.crops[0];
    setActiveStashItem(activeItem);
  }, [stash]);

  return (
    <Modal {...props}>
      <Tabs>
        <TabPanel>
          <div className={s.stash}>
            <div className={s.leftPanel}>
              <div className={s.stashItems}>
                {Object.values(stash).map((stashGroups) => {
                  return stashGroups.map((stashItem) => (
                    <StachItem
                      item={stashItem}
                      active={
                        stashItem.id == activeStashItem?.id &&
                        stashItem.type == activeStashItem?.type
                      }
                      onClick={setActiveStashItem}
                      key={`${stashItem.type}-${stashItem.id}`}
                    />
                  ));
                })}
              </div>
            </div>
            <div className={s.rightPanel}>
              <div className={s.info}>
                <div className={s.infoImage}>
                  <img src={activeStashItem?.plant.seed_image} />
                </div>
                <div className={s.infoName}>{activeStashItem?.plant.name}</div>
                <div className={s.infoDescription}>
                  {activeStashItem?.plant.description}
                </div>
                <div className={s.infoRarity}>
                  Редкость:
                  <div className={s.infoRarityItems}>
                    {Array(5)
                      .fill(null)
                      .map((_, index) => (
                        <div
                          key={index}
                          className={cn(s.infoRarityItem, {
                            [s.active]: index < activeStashItem?.plant.rarity,
                          })}
                        />
                      ))}
                  </div>
                </div>
                <div className={s.specifications}>
                  <div className={s.specificationsItem}>
                    <CurrencyIcon />
                    <div className={s.specificationsItemText}>
                      {activeStashItem?.plant.seed_price} DSC
                    </div>
                  </div>
                  <div className={s.specificationsItem}>
                    <TimeIcon />
                    <div className={s.specificationsItemText}>
                      {activeStashItem?.plant.growing_time} мин
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabPanel>
        <TabPanel>
          {crops.map((crop) => {
            return (
              <div key={crop.id}>
                <img src={crop.plant.image} />
                <div>{crop.plant.name}</div>
                <div>количество: {crop.count}</div>
              </div>
            );
          })}
        </TabPanel>
      </Tabs>
    </Modal>
  );
};
