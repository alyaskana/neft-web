import { useState } from "react";
import { ShopIcon } from "../ShopIcon/ShopIcon";
import { ShopModal } from "../ShopModal/ShopModal";
import { useTour } from "@reactour/tour";

export const Shop = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { setCurrentStep } = useTour();

  const handleClick = () => {
    setIsOpen(!isOpen);
    setCurrentStep(2);
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
