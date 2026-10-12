import type { ReactNode } from "react";
import Button from "./Button";
import Modal from "./Modal";

interface ConfirmModalProps {
  open?: boolean;
  title: string;
  confirmLabel?: string;
  isPending?: boolean;
  onConfirm: () => void;
  onClose: () => void;
  children?: ReactNode;
}

const ConfirmModal = ({
  open = true,
  title,
  confirmLabel = "Confirm",
  isPending = false,
  onConfirm,
  onClose,
  children,
}: ConfirmModalProps) => {
  return (
    <Modal open={open} onClose={onClose}>
      <div className="flex flex-col gap-3">
        <h2 className="text-lg font-semibold">{title}</h2>

        {children}

        <div className="flex justify-end gap-2">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            disabled={isPending}
            onClick={onConfirm}
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
