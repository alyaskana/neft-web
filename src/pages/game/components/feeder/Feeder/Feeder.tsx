import { useEffect, useState } from "react";
import { useStore } from "effector-react";

import { FeederIcon } from "../FeederIcon/FeederIcon";
import { FeederModal } from "../FeederModal/FeederModal";
import { useTour } from "@reactour/tour";
import { $activeTour, $crops, updateActiveTourFx } from "@/pages/game/model";

export const Feeder = () => {
  const [isOpen, setIsOpen] = useState(false);
  const activeTour = useStore($activeTour);
  const crops = useStore($crops);
  const { currentStep, setCurrentStep } = useTour();

  useEffect(() => {
    if (activeTour && currentStep == 11 && crops[0]?.count == 0) {
      setIsOpen(false);
      setCurrentStep(12);
    }
  }, [activeTour, currentStep, crops]);

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
