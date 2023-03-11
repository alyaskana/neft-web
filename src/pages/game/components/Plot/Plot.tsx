import { FC } from "react";
import cn from "classnames";

import { newPlotFx } from "@/api/games";
import { TPlot } from "@/types/game";
import { Cell } from "./Cell/Cell";

import s from "./Plot.module.scss";

type TPlotProps = {
  plot?: TPlot;
  column: number;
  row: number;
  isNewPlot: boolean;
};

export const Plot: FC<TPlotProps> = ({
  column,
  row,
  plot,
  isNewPlot = false,
}) => {
  const isUnavailable = plot == undefined;

  return (
    <div
      className={cn(s.plot, {
        [s.unavailable]: isUnavailable,
        [s.newPlot]: isNewPlot,
      })}
      style={{ gridArea: `${row} / ${column} / auto / auto` }}
    >
      {isNewPlot ? (
        <div className={s.newPlotContent} onClick={() => newPlotFx()}>
          +
        </div>
      ) : (
        plot?.cells.map((cell) => <Cell cell={cell} key={cell.id} />)
      )}
    </div>
  );
};
