import { useState } from "react";
import ConfirmModal from "../../../../components/ui/ConfirmModal";
import type { Step } from "../../../../db/task/task.types";
import { useDeleteStep } from "../../hooks/useTaskSteps";

interface DeleteStepModalProps {
  taskId: string;
  step: Step;
  onClose: () => void;
}

const DeleteStepModal = ({ taskId, step, onClose }: DeleteStepModalProps) => {
  const deleteStep = useDeleteStep();
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleConfirm = async () => {
    setError(null);
    setIsPending(true);

    try {
      await deleteStep(taskId, step.id);
      onClose();
    } catch (caught) {
      console.error(caught);
      setError("Could not delete the step. Please try again.");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <ConfirmModal
      title="Delete step?"
      confirmLabel={isPending ? "Deleting…" : "Delete"}
      isPending={isPending}
      onConfirm={handleConfirm}
      onClose={onClose}
    >
      <p className="text-sm text-muted-foreground">
        “{step.title}” will be removed from the checklist.
      </p>

      {error && (
        <p role="alert" className="text-sm text-destructive">
          {error}
        </p>
      )}
    </ConfirmModal>
  );
};

export default DeleteStepModal;
