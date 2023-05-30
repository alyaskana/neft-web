import { TFish } from "@/types/game";
import { FC, useState } from "react";
import { FishAvatar } from "../FishAvatar/FishAvatar";
import { FishModal } from "../FishModal/FishModal";
import { Explore } from "../Explore";

type TFishProps = {
  fish: TFish;
};

export const Fish: FC<TFishProps> = ({ fish }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <FishAvatar fish={fish} onClick={() => setIsOpen(!isOpen)} />
      <Explore fish={fish} />
      <FishModal
        fish={fish}
        isOpen={isOpen}
        title="Моя рыбка"
        onRequestClose={() => setIsOpen(false)}
      />
    </>
  );
};
