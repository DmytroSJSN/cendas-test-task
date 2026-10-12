import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import type { Task } from "../../../../db/task/task.types";
import { cn } from "../../../../utils/cn";
import {
  getTaskStatus,
  STEP_STATUS_DISPLAY,
} from "../../constants/status.constants";
import Checklist from "../checklist/Checklist";
import TaskTitleEditor from "./TaskTitleEditor";

interface TaskListItemProps {
  task: Task;
  expanded: boolean;
  onToggle: () => void;
}

const TaskListItem = ({ task, expanded, onToggle }: TaskListItemProps) => {
  const itemRef = useRef<HTMLLIElement>(null);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
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
      <div className="relative flex border-b border-background px-3 py-2">
        <button
          type="button"
          aria-label={`${expanded ? "Collapse" : "Expand"} ${task.title}`}
          aria-expanded={expanded}
          onClick={onToggle}
          className="absolute inset-0 cursor-pointer transition-colors hover:bg-secondary-hover"
        />

        <div className="pointer-events-none relative flex w-full min-w-0 items-center justify-between gap-2">
          <div
            className={cn(
              "flex min-w-0 flex-col gap-1",
              isEditingTitle && "pointer-events-auto",
            )}
          >
            {isEditingTitle ? (
              <TaskTitleEditor
                task={task}
                onClose={() => setIsEditingTitle(false)}
              />
            ) : (
              <button
                type="button"
                aria-label={`Edit title of ${task.title}`}
                onClick={() => setIsEditingTitle(true)}
                className="pointer-events-auto -mx-1.5 -my-1 min-w-0 cursor-pointer wrap-break-word rounded-lg px-1.5 py-1 text-left font-medium transition-colors hover:bg-secondary-hover"
              >
                {task.title}
              </button>
            )}

            <span
              className={cn(
                "flex items-center gap-1 text-xs font-normal",
                colorClass,
              )}
            >
              <Icon className="size-3.5 shrink-0" />
              {label}
            </span>
          </div>

          <ChevronDown
            className={cn(
              "size-4 shrink-0 text-muted-foreground transition-transform duration-300",
              expanded && "rotate-180",
            )}
          />
        </div>
      </div>

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
