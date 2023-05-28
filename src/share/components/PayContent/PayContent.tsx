import { FC, PropsWithChildren, ReactElement } from "react";
import cn from "classnames";

import s from "./PayContent.module.scss";

type TPayContentProps = {};

type PayContentValueProps = {
  currentValue: number | string;
  requiredValue?: number;
  isSuccess: boolean;
};

export const PayContentValue: FC<PayContentValueProps> = ({
  currentValue,
  requiredValue,
  isSuccess,
}) => {
  return (
    <div className={cn(s.payContentValue, { [s.success]: isSuccess })}>
      <span>{currentValue}</span>
      {requiredValue && <span>/{requiredValue}</span>}
    </div>
  );
};

export const PayContent: FC<PropsWithChildren<TPayContentProps>> = ({
  children,
}) => {
  return <div className={s.payContent}>{children}</div>;
};

type TPayContentItemProps = PayContentValueProps & {
  icon: ReactElement;
};

export const PayContentItem: FC<PropsWithChildren<TPayContentItemProps>> = ({
  icon,
  ...props
}) => {
  return (
    <div className={s.payContentItem}>
      {icon}
      <PayContentValue {...props} />
    </div>
  );
};
