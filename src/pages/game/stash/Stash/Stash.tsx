import { useState } from "react";
import { StashIcon } from "../StashIcon/StashIcon";
import { StashModal } from "../StashModal/StashModal";

export const Stash = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <StashIcon onClick={() => setIsOpen(!isOpen)} />
      <StashModal isOpen={isOpen} onRequestClose={() => setIsOpen(false)} />
    </>
  );
};
