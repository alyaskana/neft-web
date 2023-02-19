import { FC } from "react";
import cn from "classnames";

import { TPlot, TCell } from "@/types/game";

import s from "./Plot.module.scss";

type TPlotProps = {
  plot?: TPlot;
  column: number;
  row: number;
};

type TCellProps = {
  cell: TCell;
};

const Cell: FC<TCellProps> = ({ cell }) => {
  return (
    <div
      className={cn(s.cell, {
        [s.resource]: cell.land_type == "resource",
        [s.unavailable]: cell.land_type == "unavailable",
        [s.available]: cell.land_type == "available",
      })}
    >
      {cell.id}
    </div>
  );
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
      {plot?.cells.map((cell, index) => (
        <Cell cell={cell} key={index} />
      ))}
    </div>
  );
};
