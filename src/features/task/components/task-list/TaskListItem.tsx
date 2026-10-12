import { useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import type { Task } from "../../../../db/task/task.types";
import { cn } from "../../../../utils/cn";
import {
  getTaskStatus,
  STEP_STATUS_DISPLAY,
} from "../../constants/status.constants";
import Checklist from "../checklist/Checklist";

interface TaskListItemProps {
  task: Task;
  expanded: boolean;
  onToggle: () => void;
}

const TaskListItem = ({ task, expanded, onToggle }: TaskListItemProps) => {
  const itemRef = useRef<HTMLLIElement>(null);
  const { label, Icon, colorClass } = STEP_STATUS_DISPLAY[getTaskStatus(task)];

  useEffect(() => {
    if (!expanded) {
      return;
    }

    itemRef.current?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, [expanded]);

  return (
    <li
      ref={itemRef}
      className={cn(
        "overflow-hidden rounded-lg border bg-card transition-colors",
        expanded ? "border-ring" : "border-border",
      )}
    >
      <button
        type="button"
        aria-expanded={expanded}
        onClick={onToggle}
        className="flex border-b border-background w-full cursor-pointer items-center justify-between gap-2 px-3 py-2 text-left font-medium transition hover:bg-secondary-hover"
      >
        <span className="flex min-w-0 flex-col">
          <span className="wrap-break-word">{task.title}</span>
          <span
            className={cn(
              "flex items-center gap-1 text-xs font-normal",
              colorClass,
            )}
          >
            <Icon className="size-3.5 shrink-0" />
            {label}
          </span>
        </span>
        <ChevronDown
          className={cn(
            "size-4 shrink-0 text-muted-foreground transition-transform duration-300",
            expanded && "rotate-180",
          )}
        />
      </button>

      <div
        className={cn(
          "grid transition-all duration-300",
          expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="overflow-hidden">
          <div className="border-t border-border px-3 py-2">
            <Checklist taskId={task.id} steps={task.checklist} />
          </div>
        </div>
      </div>
    </li>
  );
};

export default TaskListItem;
