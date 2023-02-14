import { FC } from "react";
import cn from "classnames";

import s from "./Plot.module.scss";

type PlotProps = {
  column: number;
  row: number;
  type: "available" | "unavailable";
  id: number;
};

export const Plot: FC<PlotProps> = ({ id, column, row, type }) => {
  return (
    <div
      className={cn(s.plot, {
        [s.available]: type == "available",
        [s.unavailable]: type == "unavailable",
      })}
      style={{ gridArea: `${row} / ${column} / auto / auto` }}
    >
      {id}
    </div>
  );
};
