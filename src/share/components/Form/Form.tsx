import { FC, FormHTMLAttributes } from "react";

import s from "./Form.module.scss";

export const Form: FC<FormHTMLAttributes<HTMLFormElement>> = ({
  children,
  ...props
}) => {
  return (
    <form {...props} className={s.form}>
      {children}
    </form>
  );
};
