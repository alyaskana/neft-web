import { FC } from "react";
import { useStore } from "effector-react";
import cn from "classnames";

import { TCell } from "@/types/game";
import { $activeSeedStock, $activeInstrumentStock } from "@/pages/game/model";
import { ProgressBar } from "./ProgressBar";

import s from "./Cell.module.scss";
import { collectMineralFx, harvestingFx, plantSeedFx } from "@/api/games";

type TCellProps = {
  cell: TCell;
};

export const Cell: FC<TCellProps> = ({ cell }) => {
  const activeSeedStock = useStore($activeSeedStock);
  const activeInstrumentStock = useStore($activeInstrumentStock);

  const handleClick = () => {
    if (
      cell.land_type == "garden_bed" &&
      cell.growing_seed == undefined &&
      activeSeedStock
    ) {
      plantSeedFx({ cell_id: cell.id, seed_stock_id: activeSeedStock.id });
    }

    if (cell.land_type == "garden_bed" && cell.growing_seed) {
      harvestingFx({
        growing_seed_id: cell.growing_seed.id,
      });
    }

    if (
      cell.land_type == "stone" &&
      cell.cell_mineral &&
      cell.cell_mineral.stage == "ready" &&
      activeInstrumentStock
    ) {
      collectMineralFx({
        cell_mineral_id: cell.cell_mineral.id,
        instrument_stock_id: activeInstrumentStock.id,
      });
    }
  };

  const cellImage = () => {
    if (cell.land_type == "garden_bed" && cell.growing_seed) {
      return cell.growing_seed.plant.image;
    } else if (cell.land_type == "stone" && cell.cell_mineral) {
      return cell.cell_mineral.mineral.image;
    }
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
      <img className={s.seed} src={cellImage()} />
      {cell.growing_seed && cell.growing_seed.stage == "growing" && (
        <ProgressBar
          final_grow_time={cell.growing_seed.final_grow_time}
          growing_time={cell.growing_seed.growing_time}
        />
      )}
      {cell.cell_mineral && cell.cell_mineral.stage == "recovering" && (
        <ProgressBar
          final_grow_time={cell.cell_mineral.final_recover_time}
          growing_time={cell.cell_mineral.mineral.recovery_time}
        />
      )}
    </div>
  );
};
