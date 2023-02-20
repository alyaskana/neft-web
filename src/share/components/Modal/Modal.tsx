import { FC, PropsWithChildren } from "react";
import ReactModal from "react-modal";

import s from "./Modal.module.scss";

ReactModal.setAppElement("#root");

export type TModal = {
  isOpen: boolean;
  onAfterOpen?: () => void;
  onRequestClose?: () => void;
};

export const Modal: FC<PropsWithChildren<TModal>> = ({
  isOpen,
  onAfterOpen,
  onRequestClose,
  children,
}) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onAfterOpen={onAfterOpen}
      onRequestClose={onRequestClose}
    >
      <div>
        <div onClick={onRequestClose} className={s.close}>
          X
        </div>
        {children}
      </div>
    </ReactModal>
  );
};
