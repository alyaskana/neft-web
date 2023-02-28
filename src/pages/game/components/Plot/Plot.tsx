import { FC } from "react";
import { useStore } from "effector-react";
import cn from "classnames";

import { TPlot, TCell } from "@/types/game";
import { gameChanneRequestFx } from "@/api/cable";
import { $activeSeedStock } from "@/pages/game/model";

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
  const activeSeedStock = useStore($activeSeedStock);
  const handleClick = () => {
    if (cell.land_type !== "garden_bed") return;

    gameChanneRequestFx({
      type: "plantSeed",
      data: { cell_id: cell.id, seed_stock_id: activeSeedStock.id },
    });
  };

  return (
    <div
      onClick={handleClick}
      className={cn(s.cell, {
        [s.stone]: cell.land_type == "stone",
        [s.grass]: cell.land_type == "grass",
        [s.garden_bed]: cell.land_type == "garden_bed",
      })}
    >
      {cell.growing_seed && (
        <img className={s.seed} src={cell.growing_seed.seed.growing_image} />
      )}
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
