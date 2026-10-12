import type { Step } from "../../../../db/task/task.types";
import { STEP_STATUS_DISPLAY } from "../../constants/step-status.constants";

interface ChecklistItemProps {
  step: Step;
}

const ChecklistItem = ({ step }: ChecklistItemProps) => {
  const { label, Icon, className } = STEP_STATUS_DISPLAY[step.status];

  return (
    <li className="flex items-center gap-2 text-muted-foreground py-1">
      <Icon className={className} />
      <span className="truncate">{step.title}</span>
      <span className="ml-auto shrink-0 text-xs">{label}</span>
    </li>
  );
};

export default ChecklistItem;
