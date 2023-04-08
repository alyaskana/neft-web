import { FC, PropsWithChildren } from "react";
import ReactModal from "react-modal";

import { ReactComponent as CloseIcon } from "@/assets/icons/close.svg";

import s from "./Modal.module.scss";

ReactModal.setAppElement("#root");

export type TModal = {
  isOpen: boolean;
  title: string;
  onAfterOpen?: () => void;
  onRequestClose?: () => void;
};

ReactModal.defaultStyles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(24, 24, 24, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10000,
  },
  content: {
    position: "absolute",
    background: "#FFEFD6",
    overflow: "auto",
    WebkitOverflowScrolling: "touch",
    outline: "none",
    padding: "16px 22px 22px 22px",
    border: "7px solid #FAB140",
    borderRadius: "24px",
    boxSizing: "border-box",
  },
};

export const Modal: FC<PropsWithChildren<TModal>> = ({
  isOpen,
  onAfterOpen,
  onRequestClose,
  title,
  children,
}) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onAfterOpen={onAfterOpen}
      onRequestClose={onRequestClose}
      preventScroll={true}
    >
      <div className={s.header}>
        <div className={s.title}>{title}</div>
        <div onClick={onRequestClose} className={s.close}>
          <CloseIcon />
        </div>
      </div>
      <div>{children}</div>
    </ReactModal>
  );
};
