import { FC } from "react";

import s from "./LinearProgressBar.module.scss";

type TLinearProgressBarProps = {
  percent: number;
  backgroundColor: string;
  label?: string;
};

export const LinearProgressBar: FC<TLinearProgressBarProps> = ({
  percent,
  backgroundColor,
  label,
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
        {label && <div className={s.label}>{label}</div>}
      </div>
    </div>
  );
};
