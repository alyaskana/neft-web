import { FC, PropsWithChildren } from "react";

import s from "./EmptyPanel.module.scss";

type TEmptyPanelProps = {};

export const EmptyPanel: FC<PropsWithChildren<TEmptyPanelProps>> = ({
  children,
}) => {
  return (
    <div className={s.emptyPanel}>
      <div className={s.emptyPanelText}>{children}</div>
    </div>
  );
};
