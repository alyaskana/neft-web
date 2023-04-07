import { ButtonHTMLAttributes, FC } from "react";

import s from "./Button.module.scss";

export const Button: FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  ...props
}) => {
  return (
    <button {...props} className={s.button}>
      {children}
    </button>
  );
};
