import { FC, PropsWithChildren } from "react";
import cn from "classnames";

import s from "./RightPanel.module.scss";

type TRightPanelProps = { className?: string };

export const RightPanel: FC<PropsWithChildren<TRightPanelProps>> = ({
  children,
  className,
}) => {
  return <div className={cn(s.rightPanel, className)}>{children}</div>;
};
