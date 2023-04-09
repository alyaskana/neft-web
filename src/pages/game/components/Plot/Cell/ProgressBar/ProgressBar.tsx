import { FC, useEffect, useState } from "react";
import ProgressBarLib from "@ramonak/react-progress-bar";

import s from "./ProgressBar.module.scss";
import { secondFromNow } from "@/utils/secondFromNow";
import { secondToTimeString } from "@/utils/secondToTimeString";

type TProgressBarProps = {
  final_grow_time: string;
  growing_time: number;
};

export const ProgressBar: FC<TProgressBarProps> = ({
  final_grow_time,
  growing_time,
}) => {
  const defaultTimer = secondFromNow(new Date(final_grow_time));
  const [growSeconds, setGrowSeconds] = useState(defaultTimer);

  useEffect(() => {
    const interval = setInterval(() => {
      if (growSeconds <= 1) {
        clearInterval(interval);
      }
      setGrowSeconds((growSeconds) => growSeconds - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (growSeconds <= 0) {
    return null;
  }

  return (
    <div className={s.progressBar}>
      <ProgressBarLib
        bgColor="#C6CC76"
        height="4px"
        width="100%"
        completed={Math.trunc(
          ((growing_time - growSeconds) / growing_time) * 100
        )}
        customLabel=" "
      />
      <div className={s.timeLeft}>{secondToTimeString(growSeconds)}m</div>
    </div>
  );
};
