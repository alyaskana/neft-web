import { useState } from "react";
import { FeederIcon } from "../FeederIcon/FeederIcon";
import { FeederModal } from "../FeederModal/FeederModal";

export const Feeder = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <FeederIcon onClick={() => setIsOpen(!isOpen)} />
      <FeederModal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        title="Кормушка"
      />
    </>
  );
};
