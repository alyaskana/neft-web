import { FC, useEffect, useState } from "react";
import { useStore } from "effector-react";
import { Tabs, TabPanel } from "react-tabs";

import {
  Card,
  LeftPanel,
  RightPanel,
  MiniCard,
  Modal,
  TModal,
} from "@/share/components";
import { $stash } from "@/pages/game/model";
import { TCrop, TSeedStock } from "@/types/game";

import s from "./StashModal.module.scss";

type TStashModal = TModal;

export const StashModal: FC<TStashModal> = (props) => {
  const stash = useStore($stash);
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
            <LeftPanel>
              {Object.values(stash).map((stashGroups) => {
                return stashGroups.map((stashItem) => (
                  <MiniCard
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
            </LeftPanel>
            <RightPanel>
              <Card item={activeStashItem} />
            </RightPanel>
          </div>
        </TabPanel>
      </Tabs>
    </Modal>
  );
};
