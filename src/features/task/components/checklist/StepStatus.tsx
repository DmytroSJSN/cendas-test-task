import type { Step } from "../../../../db/task/task.types";
import { cn } from "../../../../utils/cn";
import { STEP_STATUS_DISPLAY } from "../../constants/status.constants";
import StepStatusEditor from "./StepStatusEditor";

interface StepStatusProps {
  taskId: string;
  step: Step;
  isEditing: boolean;
  onStartEdit: () => void;
  onClose: () => void;
}

const StepStatus = ({
  taskId,
  step,
  isEditing,
  onStartEdit,
  onClose,
}: StepStatusProps) => {
  if (isEditing) {
    return <StepStatusEditor taskId={taskId} step={step} onClose={onClose} />;
  }

  const { label, Icon, colorClass } = STEP_STATUS_DISPLAY[step.status];

  return (
    <button
      type="button"
      aria-label={`Change status of step ${step.title}`}
      onClick={onStartEdit}
      className={cn(
        "-mx-1.5 -my-1 flex cursor-pointer items-center gap-1.5 rounded-lg px-1.5 py-1 text-sm transition-colors hover:bg-secondary-hover",
        colorClass,
      )}
    >
      <Icon className="size-4 shrink-0" />
      {label}
    </button>
  );
};

export default StepStatus;
