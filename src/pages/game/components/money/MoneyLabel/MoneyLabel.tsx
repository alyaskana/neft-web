import { useStore } from "effector-react";
import s from "./MoneyLabel.module.scss";

import { $wallet } from "@/pages/game/model";

export const MoneyLabel = () => {
  const wallet = useStore($wallet);
  return (
    <div className={s.MoneyLabel}>
      <div className={s.MoneyLabelContent}>DSC {wallet.dsc}</div>
    </div>
  );
};
