import { useState } from "react";
import { ShopIcon } from "../ShopIcon/ShopIcon";
import { ShopModal } from "../ShopModal/ShopModal";

export const Shop = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <ShopIcon onClick={() => setIsOpen(!isOpen)} />
      <ShopModal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        title="Рынок"
      />
    </>
  );
};
