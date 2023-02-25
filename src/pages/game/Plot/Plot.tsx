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
        [s.stone]: cell.land_type == "stone",
        [s.grass]: cell.land_type == "grass",
        [s.garden_bed]: cell.land_type == "garden_bed",
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
