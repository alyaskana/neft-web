import { FC, ReactElement } from "react";

import { Button, Modal, TModal } from "@/share/components";

import s from "./ConfirmationModal.module.scss";

type TConfirmationModal = TModal & {
  title: string;
  description: string;
  onConfirm: () => void;
  content: ReactElement;
  confirmText: string;
  isSuccess: boolean;
};

export const ConfirmationModal: FC<TConfirmationModal> = ({
  title,
  description,
  onConfirm,
  content,
  confirmText,
  isSuccess,
  ...props
}) => {
  return (
    <Modal {...props}>
      <div className={s.confirmationModal}>
        <div className={s.title}>{title}</div>
        <div className={s.description}>{description}</div>
        <div className={s.contentWrapper}>
          <div className={s.content}>{content}</div>
          <div className={s.confirm}>
            <Button onClick={onConfirm} disabled={!isSuccess}>
              {confirmText}
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
