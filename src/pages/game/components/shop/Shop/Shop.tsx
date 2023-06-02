import { useState } from "react";
import { useStore } from "effector-react";

import { ShopIcon } from "../ShopIcon/ShopIcon";
import { ShopModal } from "../ShopModal/ShopModal";
import { useTour } from "@reactour/tour";
import { $activeTour } from "@/pages/game/model";

export const Shop = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { setCurrentStep, currentStep } = useTour();
  const activeTour = useStore($activeTour);

  const handleClick = () => {
    setIsOpen(true);
    if (activeTour && currentStep == 1) {
      setCurrentStep(2);
    }
    if (activeTour && currentStep == 6) {
      setCurrentStep(7);
    }
  };
  return (
    <>
      <ShopIcon onClick={handleClick} />
      <ShopModal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        title="Рынок"
      />
    </>
  );
};
