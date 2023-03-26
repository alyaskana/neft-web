import { FC } from "react";
import cn from "classnames";

import { newPlotFx } from "@/api/games";
import { TPlot } from "@/types/game";
import { Cell } from "./Cell/Cell";

import { ReactComponent as PlusIcon } from "@/assets/icons/plus.svg";

import s from "./Plot.module.scss";

type TPlotProps = {
  plot?: TPlot;
  column: number;
  row: number;
  isNewPlot: boolean;
  isBorderLeft: boolean;
  isBorderRight: boolean;
  isBorderTop: boolean;
  isBorderBottom: boolean;
};

export const Plot: FC<TPlotProps> = ({
  column,
  row,
  plot,
  isNewPlot = false,
  isBorderBottom,
  isBorderLeft,
  isBorderRight,
  isBorderTop,
}) => {
  const isUnavailable = plot == undefined;

  return (
    <div
      className={cn(s.plot, {
        [s.unavailable]: isUnavailable,
        [s.available]: !isUnavailable,
        [s.borderBottom]: isBorderBottom,
        [s.borderLeft]: isBorderLeft,
        [s.borderRight]: isBorderRight,
        [s.borderTop]: isBorderTop,
        [s.newPlot]: isNewPlot,
      })}
      style={{ gridArea: `${row} / ${column} / auto / auto` }}
    >
      {isNewPlot ? (
        <div className={s.newPlotContent} onClick={() => newPlotFx()}>
          <div className={s.newPlotPlus}>
            <PlusIcon />
          </div>
        </div>
      ) : (
        plot?.cells.map((cell) => <Cell cell={cell} key={cell.id} />)
      )}
    </div>
  );
};
