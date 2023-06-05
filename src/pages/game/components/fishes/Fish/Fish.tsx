import { TFish } from "@/types/game";
import { FC, useState } from "react";
import { FishAvatar } from "../FishAvatar/FishAvatar";
import { FishModal } from "../FishModal/FishModal";
import { useStore } from "effector-react";
import { $activeTour, updateActiveTourFx } from "@/pages/game/model";
import { useTour } from "@reactour/tour";

type TFishProps = {
  fish: TFish;
};

export const Fish: FC<TFishProps> = ({ fish }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const activeTour = useStore($activeTour);
  const { setIsOpen, currentStep } = useTour();

  const handleClick = () => {
    setIsOpenModal(!isOpenModal);

    if (activeTour && currentStep == 12) {
      setIsOpen(false);
      updateActiveTourFx(false);
    }
  };

  return (
    <>
      <FishAvatar fish={fish} onClick={handleClick} />
      <FishModal
        fish={fish}
        isOpen={isOpenModal}
        title="Моя рыбка"
        onRequestClose={() => setIsOpenModal(false)}
      />
    </>
  );
};
