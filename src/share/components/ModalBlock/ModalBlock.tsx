import { FC, PropsWithChildren } from "react";

import s from "./ModalBlock.module.scss";

export const ModalBlock: FC<PropsWithChildren> = ({ children }) => {
  return <div className={s.moduleBlock}>{children}</div>;
};
