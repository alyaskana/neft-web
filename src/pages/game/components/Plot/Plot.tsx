import { FC } from "react";
import cn from "classnames";

import { TPlot } from "@/types/game";
import { Cell } from "./Cell/Cell";

import s from "./Plot.module.scss";

type TPlotProps = {
  plot?: TPlot;
  column: number;
  row: number;
};

export const Plot: FC<TPlotProps> = ({ column, row, plot }) => {
  const isUnavailable = plot == undefined;

  return (
    <div
      className={cn(s.plot, {
        [s.unavailable]: isUnavailable,
      })}
      style={{ gridArea: `${row} / ${column} / auto / auto` }}
    >
      {plot?.cells.map((cell) => (
        <Cell cell={cell} key={cell.id} />
      ))}
    </div>
  );
};
