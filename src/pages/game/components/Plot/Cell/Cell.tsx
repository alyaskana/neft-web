import { FC, useEffect, useState } from "react";
import { useStore } from "effector-react";
import cn from "classnames";

import { TCell } from "@/types/game";
import { $activeSeedStock } from "@/pages/game/model";
import { secondFromNow } from "@/utils/secondFromNow";

import s from "./Cell.module.scss";
import { harvestingFx, plantSeedFx } from "@/api/games";

type TCellProps = {
  cell: TCell;
};

export const Cell: FC<TCellProps> = ({ cell }) => {
  const timerDefault = cell.growing_seed
    ? secondFromNow(new Date(cell.growing_seed.final_grow_time))
    : 0;

  const activeSeedStock = useStore($activeSeedStock);
  const [growSeconds, setGrowSeconds] = useState(timerDefault);

  useEffect(() => {
    if (!cell.growing_seed) return;

    const interval = setInterval(() => {
      if (growSeconds <= 1) {
        clearInterval(interval);
      }
      setGrowSeconds((growSeconds) => growSeconds - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

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
          <img className={s.seed} src={cell.growing_seed.plant.growing_image} />
          <div className={s.timer}>{growSeconds}</div>
        </>
      )}
      {cell.growing_seed && cell.growing_seed.stage == "complete" && (
        <>
          <img className={s.seed} src={cell.growing_seed.plant.image} />
        </>
      )}
      {cell.id}
    </div>
  );
};