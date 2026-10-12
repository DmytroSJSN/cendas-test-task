import {
  Circle,
  CircleCheck,
  CircleDashed,
  CircleDot,
  CircleSlash,
  type LucideIcon,
} from "lucide-react";
import type { StepStatus, Task } from "../../../db/task/task.types";

type StepStatusDisplay = {
  label: string;
  Icon: LucideIcon;
  colorClass: string;
};

export const STEP_STATUS_DISPLAY: Record<StepStatus, StepStatusDisplay> = {
  not_started: {
    label: "Not started",
    Icon: Circle,
    colorClass: "text-zinc-500",
  },
  in_progress: {
    label: "In progress",
    Icon: CircleDot,
    colorClass: "text-blue-400",
  },
  blocked: {
    label: "Blocked",
    Icon: CircleSlash,
    colorClass: "text-red-400",
  },
  awaiting_final_check: {
    label: "Awaiting final check",
    Icon: CircleDashed,
    colorClass: "text-amber-400",
  },
  done: {
    label: "Done",
    Icon: CircleCheck,
    colorClass: "text-emerald-400",
  },
};

export const getTaskStatus = (task: Task): StepStatus => {
  const { checklist } = task;

  if (checklist.length > 0 && checklist.every((step) => step.status === "done")) {
    return "done";
  }

  if (checklist.some((step) => step.status === "blocked")) {
    return "blocked";
  }

  if (checklist.some((step) => step.status === "awaiting_final_check")) {
    return "awaiting_final_check";
  }

  if (checklist.some((step) => step.status === "in_progress")) {
    return "in_progress";
  }

  return "not_started";
};
