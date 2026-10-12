import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import { cn } from "../../utils/cn";

interface ModalProps {
  open?: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
}

const Modal = ({ open = true, onClose, children, className }: ModalProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) return;

    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === dialogRef.current) onClose();
      }}
      className={cn(
        "m-auto w-full max-w-md rounded-lg border border-border bg-card text-foreground backdrop:bg-black/60",
        className,
      )}
    >
      <div className="p-4">{children}</div>
    </dialog>
  );
};

export default Modal;
