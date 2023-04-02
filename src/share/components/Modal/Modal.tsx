import { FC, PropsWithChildren } from "react";
import ReactModal from "react-modal";

import { ReactComponent as CloseIcon } from "@/assets/icons/close.svg";

import s from "./Modal.module.scss";

ReactModal.setAppElement("#root");

export type TModal = {
  isOpen: boolean;
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
    backgroundColor: "rgba(255, 255, 255, 0.75)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10000,
  },
  content: {
    position: "absolute",
    background: "#FFBC55",
    overflow: "auto",
    WebkitOverflowScrolling: "touch",
    outline: "none",
    padding: "10px",
    width: "600px",
    borderRadius: "20px",
  },
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
      preventScroll={true}
    >
      <div>
        <div onClick={onRequestClose} className={s.close}>
          <CloseIcon />
        </div>
        {children}
      </div>
    </ReactModal>
  );
};
