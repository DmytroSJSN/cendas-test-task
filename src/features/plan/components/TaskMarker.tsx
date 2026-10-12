import { MapPin } from "lucide-react";
import type { MouseEvent } from "react";
import { KeepScale } from "react-zoom-pan-pinch";
import type { Task } from "../../../db/task/task.types";
import { cn } from "../../../utils/cn";
import {
  getTaskStatus,
  STEP_STATUS_DISPLAY,
} from "../../task/constants/status.constants";
import { useTaskUiStore } from "../../task/store/task-ui.store";

interface TaskMarkerProps {
  task: Task;
}

const TaskMarker = ({ task }: TaskMarkerProps) => {
  const revealTask = useTaskUiStore((state) => state.revealTask);
  const { colorClass } = STEP_STATUS_DISPLAY[getTaskStatus(task)];

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    revealTask(task.id);
  };

  return (
    <div
      className="absolute"
      style={{
        left: `${task.marker.x * 100}%`,
        top: `${task.marker.y * 100}%`,
      }}
    >
      <KeepScale>
        <button
          type="button"
          aria-label={task.title}
          onClick={handleClick}
          className="group absolute -translate-x-1/2 -translate-y-full cursor-pointer"
        >
          <MapPin
            className={cn(
              "size-10 fill-current drop-shadow-md transition-transform group-hover:scale-110 [&>circle]:fill-background",
              colorClass,
            )}
          />
          <span className="pointer-events-none absolute bottom-full left-1/2 mb-1 hidden -translate-x-1/2 rounded-md border border-border bg-card px-2 py-1 text-xs whitespace-nowrap text-foreground shadow-md group-hover:block group-focus-visible:block">
            {task.title}
          </span>
        </button>
      </KeepScale>
    </div>
  );
};

export default TaskMarker;
