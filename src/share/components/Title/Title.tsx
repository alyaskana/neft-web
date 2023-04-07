import { FC, PropsWithChildren } from "react";

import s from "./Title.module.scss";

export const Title: FC<PropsWithChildren> = ({ children }) => {
  return <h1 className={s.title}>{children}</h1>;
};
