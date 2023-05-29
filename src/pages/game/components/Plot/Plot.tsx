import { FC, useEffect, useState } from "react";
import cn from "classnames";

import { newPlotFx } from "@/api/games";
import {
  $wallet,
  $activeFish,
  $mineralStocks,
  $plots,
} from "@/pages/game/model";
import { TPlot } from "@/types/game";
import { ConfirmationModal } from "@/share/components/ConfirmationModal";
import { Cell } from "./Cell/Cell";

import { ReactComponent as PlusIcon } from "@/assets/icons/plus.svg";
import { ReactComponent as CurrencyIcon } from "@/assets/icons/currency.svg";
import { ReactComponent as StarIcon } from "@/assets/icons/star.svg";
import { ReactComponent as ArrowUpIcon } from "@/assets/icons/arrow-up.svg";

import s from "./Plot.module.scss";
import { PayContent, PayContentItem } from "@/share/components/PayContent";
import { useStore } from "effector-react";

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
const NewPlot: FC = () => {
  const wallet = useStore($wallet);
  const activeFish = useStore($activeFish);
  const mineralStocks = useStore($mineralStocks);
  const [isOpen, setIsOpen] = useState(false);
  const [requiredMoney, setRequiredMoney] = useState(3000);
  const [requiredLevel, setRequiredLevel] = useState(6);
  const [requiredMineral, setRequiredMineral] = useState(30);
  const [isSuccess, setIsSuccess] = useState(false);
  const plots = useStore($plots);

  const handleClick = () => {
    setIsOpen(true);
  };

  useEffect(() => {
    if (plots.length == 3) {
      setRequiredMoney(50);
      setRequiredLevel(1);
      setRequiredMineral(1);
    } else if (plots.length == 4) {
      setRequiredMoney(2000);
      setRequiredLevel(4);
      setRequiredMineral(15);
    } else {
      setRequiredMoney(3000);
      setRequiredLevel(6);
      setRequiredMineral(30);
    }
  }, [plots, activeFish, wallet, mineralStocks]);

  useEffect(() => {
    if (activeFish) {
      setIsSuccess(
        activeFish.level >= requiredLevel &&
          wallet.dsc >= requiredMoney &&
          mineralStocks[0].count >= requiredMineral
      );
    }
  }, [plots, activeFish, wallet, mineralStocks]);

  const Content: FC = () => {
    return (
      <div>
        <PayContent>
          <PayContentItem
            icon={<CurrencyIcon />}
            currentValue={wallet.dsc}
            requiredValue={requiredMoney}
            isSuccess={wallet.dsc >= requiredMoney}
          />
          <PayContentItem
            icon={<ArrowUpIcon />}
            currentValue={`${requiredLevel} lvl`}
            isSuccess={activeFish.level >= requiredLevel}
          />
          <PayContentItem
            icon={<StarIcon />}
            currentValue={mineralStocks[0].count}
            requiredValue={requiredMineral}
            isSuccess={mineralStocks[0].count >= requiredMineral}
          />
        </PayContent>
      </div>
    );
  };

  return (
    <>
      <div className={s.newPlotContent} onClick={handleClick}>
        <div className={s.newPlotPlus}>
          <PlusIcon />
        </div>
      </div>
      <ConfirmationModal
        title="Хотите расчистить новый участок океана?"
        description="Под завалами могут найтись новые ресурсы и почва для растений! Каждый участок океана это ваш уникальный NFT токен на блокчейне."
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        onConfirm={() => {
          newPlotFx();
        }}
        confirmText="Расчистить"
        content={<Content />}
        isSuccess={isSuccess}
      />
    </>
  );
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
        <NewPlot />
      ) : (
        plot?.cells.map((cell) => <Cell cell={cell} key={cell.id} />)
      )}
    </div>
  );
};
