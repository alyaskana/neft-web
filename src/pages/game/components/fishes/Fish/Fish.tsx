import { TFish } from "@/types/game";
import { FC, useState } from "react";
import { FishAvatar } from "../FishAvatar/FishAvatar";
import { FishModal } from "../FishModal/FishModal";

type TFishProps = {
  fish: TFish;
};

export const Fish: FC<TFishProps> = ({ fish }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <FishAvatar fish={fish} onClick={() => setIsOpen(!isOpen)} />
      <FishModal
        fish={fish}
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
      />
    </>
  );
};
