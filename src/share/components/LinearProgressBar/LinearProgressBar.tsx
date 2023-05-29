import { FC } from "react";

import s from "./LinearProgressBar.module.scss";

type TLinearProgressBarProps = { percent: number; backgroundColor: string };

export const LinearProgressBar: FC<TLinearProgressBarProps> = ({
  percent,
  backgroundColor,
}) => {
  return (
    <div className={s.linearProgressBar}>
      <div className={s.emptyProgressBar}>
        <div
          className={s.fillingProgressBar}
          style={{
            left: percent - 100 + "%",
            background: backgroundColor,
          }}
        />
      </div>
    </div>
  );
};
