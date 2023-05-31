import { FC, PropsWithChildren } from "react";

import s from "./EmptyPanel.module.scss";

type TEmptyPanelProps = { width?: number };

export const EmptyPanel: FC<PropsWithChildren<TEmptyPanelProps>> = ({
  children,
  width,
}) => {
  return (
    <div className={s.emptyPanel} style={{ width: `${width || 656}px` }}>
      <div className={s.emptyPanelText}>{children}</div>
    </div>
  );
};
