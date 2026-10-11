import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { Task } from "../../../../db/task/task.types";
import { cn } from "../../../../utils/cn";
import Checklist from "../checklist/Checklist";

interface TaskListItemProps {
  task: Task;
}

const TaskListItem = ({ task }: TaskListItemProps) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="overflow-hidden rounded-lg border border-border bg-card">
      <button
        type="button"
        aria-expanded={expanded}
        onClick={() => setExpanded((current) => !current)}
        className="flex border-b border-background w-full cursor-pointer items-center justify-between gap-2 px-3 py-2 text-left font-medium transition hover:bg-secondary-hover"
      >
        <span className="truncate">{task.title}</span>
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
            <Checklist steps={task.checklist} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskListItem;
