import { FC, useEffect, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

import { Modal, TModal } from "@/share/components";
import { Buy } from "./Buy/Buy";
import { Sell } from "./Sell";
import { $activeTour, $crops, $seedStocks } from "@/pages/game/model";
import { useStore } from "effector-react";
import { useTour } from "@reactour/tour";
import { log } from "console";

type TShopModal = TModal;

export const ShopModal: FC<TShopModal> = (props) => {
  const activeTour = useStore($activeTour);
  const crops = useStore($crops);
  const seedStocks = useStore($seedStocks);
  const [currentTab, setCurrentTab] = useState(1);
  const { currentStep, setCurrentStep } = useTour();

  useEffect(() => {
    console.log("activeTour", currentStep);
    if (activeTour && currentStep == 3) {
      setCurrentTab(0);
    }
  }, [activeTour, currentStep]);

  useEffect(() => {
    if (activeTour && currentStep == 2 && crops[0]?.count == 0) {
      setCurrentTab(0);
      setCurrentStep(3);
    }
  }, [crops, activeTour, currentStep]);

  useEffect(() => {
    if (activeTour && currentStep == 3 && seedStocks[0]?.count == 3) {
      if (props.onRequestClose) {
        props.onRequestClose();
        setCurrentStep(4);
      }
    }
  }, [seedStocks, activeTour, currentStep]);

  return (
    <Modal {...props}>
      <Tabs
        defaultIndex={activeTour && currentStep == 2 ? 1 : currentTab}
        selectedIndex={currentTab}
        onSelect={(index) => setCurrentTab(index)}
      >
        <TabList>
          <Tab>Купить</Tab>
          <Tab>Продать</Tab>
        </TabList>

        <TabPanel>
          <Buy closePopup={props.onRequestClose} />
        </TabPanel>
        <TabPanel>
          <Sell setCurrentTab={setCurrentTab} />
        </TabPanel>
      </Tabs>
    </Modal>
  );
};
