import { useStore } from "effector-react";
import s from "./MoneyLabel.module.scss";

import { $wallet } from "@/pages/game/model";

export const MoneyLabel = () => {
  const wallet = useStore($wallet);
  return <div className={s.MoneyLabel}>{wallet.dsc}</div>;
};
