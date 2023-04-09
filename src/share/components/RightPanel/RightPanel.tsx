import { FC, PropsWithChildren } from "react";

import s from "./RightPanel.module.scss";

type TRightPanelProps = {};

export const RightPanel: FC<PropsWithChildren<TRightPanelProps>> = ({
  children,
}) => {
  return <div className={s.rightPanel}>{children}</div>;
};
