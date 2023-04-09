import { FC } from "react";
import { useStore } from "effector-react";
import cn from "classnames";

import { TCell } from "@/types/game";
import { $activeSeedStock } from "@/pages/game/model";
import { ProgressBar } from "./ProgressBar";

import s from "./Cell.module.scss";
import { harvestingFx, plantSeedFx } from "@/api/games";

type TCellProps = {
  cell: TCell;
};

export const Cell: FC<TCellProps> = ({ cell }) => {
  const activeSeedStock = useStore($activeSeedStock);

  const handleClick = () => {
    if (cell.land_type == "garden_bed" && cell.growing_seed == undefined) {
      plantSeedFx({ cell_id: cell.id, seed_stock_id: activeSeedStock.id });
    }
    if (cell.land_type == "garden_bed" && cell.growing_seed) {
      harvestingFx({
        growing_seed_id: cell.growing_seed.id,
      });
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
      {cell.growing_seed && cell.growing_seed.stage == "growing" && (
        <>
          <img className={s.seed} src={cell.growing_seed.plant.image} />
          <ProgressBar
            final_grow_time={cell.growing_seed.final_grow_time}
            growing_time={cell.growing_seed.growing_time}
          />
        </>
      )}
      {cell.growing_seed && cell.growing_seed.stage == "complete" && (
        <>
          <img className={s.seed} src={cell.growing_seed.plant.image} />
        </>
      )}
    </div>
  );
};
