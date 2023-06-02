import { FC, useEffect, useState } from "react";
import { useStore } from "effector-react";

import s from "./Explore.module.scss";
import { TFish } from "@/types/game";
import { secondFromNow } from "@/utils/secondFromNow";
import { secondToTimeString } from "@/utils/secondToTimeString";
import { $activeFish, $mineralStocks, $wallet } from "@/pages/game/model";
import { PayContent, PayContentItem } from "@/share/components/PayContent";

import { ReactComponent as CurrencyIcon } from "@/assets/icons/currency.svg";
import { ReactComponent as StarIcon } from "@/assets/icons/star.svg";
import { ReactComponent as ArrowUpIcon } from "@/assets/icons/arrow-up.svg";
import { ReactComponent as ExplorePlot } from "@/assets/sprites/explore_plot.svg";

import { ConfirmationModal } from "@/share/components/ConfirmationModal";
import { exploreFx } from "@/api/games";
import { ExploreResultsModal } from "./ExploreResultsModal";

const ExploreInProgress: FC<{ fish: TFish }> = ({ fish }) => {
  const defaultTimer = secondFromNow(new Date(fish.final_explore_time));
  const [growSeconds, setGrowSeconds] = useState(defaultTimer);

  useEffect(() => {
    const interval = setInterval(() => {
      if (growSeconds <= 1) {
        clearInterval(interval);
      }
      setGrowSeconds((growSeconds) =>
        growSeconds - 1 > 0 ? growSeconds - 1 : 0
      );
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={s.explore}>
      <div>Восстановление:</div>
      <div>{secondToTimeString(growSeconds)} мин</div>
    </div>
  );
};

const ExploreReady: FC = () => {
  const [isOpenConfirm, setIsOpenConfirm] = useState(false);

  return (
    <>
      <div className={s.explore} onClick={() => setIsOpenConfirm(true)}>
        <div>Разведка завершена</div>
      </div>
      <ExploreResultsModal
        isOpen={isOpenConfirm}
        onRequestClose={() => setIsOpenConfirm(false)}
      />
    </>
  );
};

export const Explore: FC = () => {
  const wallet = useStore($wallet);
  const activeFish = useStore($activeFish);
  const mineralStocks = useStore($mineralStocks);
  const [isOpen, setIsOpen] = useState(false);
  const [requiredMoney, setRequiredMoney] = useState(1500);
  const [requiredLevel, setRequiredLevel] = useState(3);
  const [requiredMineral, setRequiredMineral] = useState(10);
  const [isSuccess, setIsSuccess] = useState(checkIsSuccess());

  useEffect(() => {
    setIsSuccess(checkIsSuccess());
  }, [
    activeFish,
    wallet,
    mineralStocks,
    requiredLevel,
    requiredMoney,
    requiredMineral,
  ]);

  function checkIsSuccess() {
    if (activeFish && wallet && mineralStocks[0]) {
      return (
        activeFish.level >= requiredLevel &&
        wallet.dsc >= requiredMoney &&
        mineralStocks[0].count >= requiredMineral &&
        (activeFish.explore_stage == "calm" ||
          activeFish.explore_stage == "explore_ready")
      );
    }
    return false;
  }

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
            currentValue={mineralStocks[0]?.count || 0}
            requiredValue={requiredMineral}
            isSuccess={(mineralStocks[0]?.count || 0) >= requiredMineral}
          />
        </PayContent>
      </div>
    );
  };

  return (
    <>
      <div className={s.exploreWrapper}>
        <ExplorePlot onClick={() => setIsOpen(true)} />
        {activeFish && activeFish.explore_stage == "exploring" && (
          <ExploreInProgress fish={activeFish} />
        )}
        {activeFish && activeFish.explore_stage == "explore_ready" && (
          <ExploreReady />
        )}
      </div>
      <ConfirmationModal
        title="Хотите отправиться в разведку?"
        description="Ваша рыбка может отправиться изведывать завалы мусора на отдаленных территориях и попробовать отыскать там что-нибудь ценное."
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        onConfirm={() => {
          exploreFx();
          setIsOpen(false);
        }}
        confirmText="Отправиться"
        content={<Content />}
        isSuccess={isSuccess}
      />
    </>
  );
};
