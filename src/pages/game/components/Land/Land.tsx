import { useEffect, useLayoutEffect, useState } from "react";
import { useStore } from "effector-react";
import cn from "classnames";

import { Plot } from "../Plot/Plot";

import { $activeTour, $crops, $plots } from "@/pages/game/model";

import s from "./Land.module.scss";
import { useTour } from "@reactour/tour";

const buildSpiral = (size: number): number[][] => {
  if (size === 1) return [[1]];
  if (size === 2)
    return [
      [3, 4],
      [2, 1],
    ];
  let spiral = buildSpiral(size - 2);
  // add a prefix and a postfix number to those rows:
  let start = size * (size - 1);
  let end = (size - 2) * (size - 2) + 1;
  for (let row of spiral) {
    row.unshift(start--);
    row.push(end++);
  }
  // add extra row at top and bottom
  start = size * (size - 1) + 1;
  spiral.unshift(spiral[0].map(() => start++));
  end = size * (size - 2) + 2;
  spiral.push(spiral[0].map(() => end--));
  return spiral;
};

export const Land = () => {
  const plots = useStore($plots);
  const activeTour = useStore($activeTour);
  const crops = useStore($crops);
  const spiral = buildSpiral(10);
  const [renderCounts, setRenderCounts] = useState(1);
  const { setIsOpen, currentStep, setCurrentStep } = useTour();

  useLayoutEffect(() => {
    if (renderCounts <= 2) {
      window.scrollTo(
        window.innerWidth / 2,
        window.innerHeight + (window.innerHeight / 100) * 30
      );
      setRenderCounts((count) => count + 1);
    }
  }, [plots]);

  useLayoutEffect(() => {
    if (activeTour) {
      setIsOpen(true);
    }
  }, [activeTour]);

  useEffect(() => {
    if (activeTour && currentStep == 5 && crops[0]?.count == 3) {
      setCurrentStep(6);
    }
  }, [activeTour, crops, currentStep]);

  if (!plots) return null;

  return (
    <div className={cn(s.land)}>
      {spiral.map((rowArray, rowId) => {
        return rowArray.map((id, colId) => {
          return (
            <Plot
              isBorderTop={spiral[rowId - 1]?.[colId] > plots.length}
              isBorderBottom={spiral[rowId + 1]?.[colId] > plots.length}
              isBorderLeft={spiral[rowId]?.[colId - 1] > plots.length}
              isBorderRight={spiral[rowId]?.[colId + 1] > plots.length}
              plot={plots[id - 1]}
              key={`cell-${rowId}-${colId}`}
              column={colId + 1}
              row={rowId + 1}
              isNewPlot={plots.length + 1 === id}
              isExplorationPlot={plots.length + 8 === id}
              className={id == 1 ? cn("step-0", "step-5") : ""}
            />
          );
        });
      })}
    </div>
  );
};
