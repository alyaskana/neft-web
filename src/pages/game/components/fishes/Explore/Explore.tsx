import { FC, useEffect, useState } from "react";

import s from "./Explore.module.scss";
import { TFish } from "@/types/game";
import { secondFromNow } from "@/utils/secondFromNow";
import { secondToTimeString } from "@/utils/secondToTimeString";

type TExploreProps = {
  fish: TFish;
};

const ExploreInProgress: FC<{ fish: TFish }> = ({ fish }) => {
  const defaultTimer = secondFromNow(new Date(fish.final_explore_time));
  const [growSeconds, setGrowSeconds] = useState(defaultTimer);

  useEffect(() => {
    const interval = setInterval(() => {
      if (growSeconds <= 1) {
        clearInterval(interval);
      }
      setGrowSeconds((growSeconds) =>
        growSeconds - 1 > 0 ? growSeconds - 1 : 0
      );
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={s.explore}>
      <div>Идет разведка</div>
      <div>осталось: {secondToTimeString(growSeconds)} мин</div>
    </div>
  );
};
const ExploreReady: FC<{ fish: TFish }> = ({ fish }) => {
  return (
    <div className={s.explore}>
      <div>Разведка завершена</div>
    </div>
  );
};

export const Explore: FC<TExploreProps> = ({ fish }) => {
  const defaultTimer = secondFromNow(new Date(fish.final_explore_time));
  const [growSeconds, setGrowSeconds] = useState(defaultTimer);

  if (fish.explore_stage == "exploring") {
    return <ExploreInProgress fish={fish} />;
  }

  if (fish.explore_stage == "explore_ready") {
    return <ExploreReady fish={fish} />;
  }

  return null;
};
