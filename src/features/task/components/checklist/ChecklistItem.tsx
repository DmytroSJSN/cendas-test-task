import { Trash2 } from "lucide-react";
import Button from "../../../../components/ui/Button";
import type { Step } from "../../../../db/task/task.types";
import { cn } from "../../../../utils/cn";
import { STEP_STATUS_DISPLAY } from "../../constants/status.constants";

const ICON_BASE = "size-4 shrink-0";

interface ChecklistItemProps {
  step: Step;
  canDelete: boolean;
  onDelete: (step: Step) => void;
}

const ChecklistItem = ({ step, canDelete, onDelete }: ChecklistItemProps) => {
  const { label, Icon, colorClass } = STEP_STATUS_DISPLAY[step.status];

  return (
    <li className="flex items-center gap-2 py-1">
      <Icon className={cn(ICON_BASE, colorClass)} />
      <span className="flex min-w-0 flex-1 flex-col text-muted-foreground">
        <span className="wrap-break-word">{step.title}</span>
        <span className={cn("text-xs", colorClass)}>{label}</span>
      </span>
      <Button
        type="button"
        variant="ghost"
        aria-label={`Delete step ${step.title}`}
        disabled={!canDelete}
        onClick={() => onDelete(step)}
        className="size-8 shrink-0 p-0"
      >
        <Trash2 className="size-4" />
      </Button>
    </li>
  );
};

export default ChecklistItem;
