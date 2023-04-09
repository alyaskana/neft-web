import { FC, PropsWithChildren } from "react";

import s from "./LeftPanel.module.scss";

type TLeftPanelProps = {};

export const LeftPanel: FC<PropsWithChildren<TLeftPanelProps>> = ({
  children,
}) => {
  return (
    <div className={s.leftPanel}>
      <div className={s.items}>{children}</div>
    </div>
  );
};
