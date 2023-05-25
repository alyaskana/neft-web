import { FC } from "react";

import s from "./Cook.module.scss";

type TCookProps = {};

export const Cook: FC<TCookProps> = () => {
  return <div className={s.cook}>Cook</div>;
};
