import type { Step } from "../../../../db/task/task.types";
import StepTitleEditor from "./StepTitleEditor";

interface StepTitleProps {
  taskId: string;
  step: Step;
  isEditing: boolean;
  onStartEdit: () => void;
  onClose: () => void;
}

const StepTitle = ({
  taskId,
  step,
  isEditing,
  onStartEdit,
  onClose,
}: StepTitleProps) => {
  if (isEditing) {
    return <StepTitleEditor taskId={taskId} step={step} onClose={onClose} />;
  }

  return (
    <button
      type="button"
      aria-label={`Edit step ${step.title}`}
      onClick={onStartEdit}
      className="-mx-1.5 -my-1 min-w-0 cursor-pointer wrap-break-word rounded-lg px-1.5 py-1 text-left text-muted-foreground transition-colors hover:bg-secondary-hover hover:text-foreground"
    >
      {step.title}
    </button>
  );
};

export default StepTitle;
