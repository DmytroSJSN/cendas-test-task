import type { Step } from "../../../../db/task/task.types";
import { cn } from "../../../../utils/cn";
import { STEP_STATUS_DISPLAY } from "../../constants/status.constants";

const ICON_BASE = "size-4 shrink-0";

interface ChecklistItemProps {
  step: Step;
}

const ChecklistItem = ({ step }: ChecklistItemProps) => {
  const { label, Icon, colorClass } = STEP_STATUS_DISPLAY[step.status];

  return (
    <li className="flex items-center gap-2 py-1">
      <Icon className={cn(ICON_BASE, colorClass)} />
      <span className="flex min-w-0 flex-col text-muted-foreground">
        <span className="wrap-break-word">{step.title}</span>
        <span className={cn("text-xs", colorClass)}>{label}</span>
      </span>
    </li>
  );
};

export default ChecklistItem;
