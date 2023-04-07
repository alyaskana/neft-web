import { FC, InputHTMLAttributes } from "react";

import s from "./TextInput.module.scss";

export const TextInput: FC<InputHTMLAttributes<HTMLInputElement>> = (props) => {
  return <input {...props} className={s.textInput} />;
};
