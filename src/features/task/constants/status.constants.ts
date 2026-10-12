import {
  Circle,
  CircleCheck,
  CircleDashed,
  CircleDot,
  CircleSlash,
  type LucideIcon,
} from "lucide-react";
import type { StepStatus, Task } from "../../../db/task/task.types";
import { STEP_STATUS, STEP_STATUSES } from "../../../db/task/task.constants";

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

export const STEP_STATUS_OPTIONS = STEP_STATUSES.map((status) => ({
  value: status,
  label: STEP_STATUS_DISPLAY[status].label,
}));

export const getTaskStatus = (task: Task): StepStatus => {
  const { checklist } = task;

  if (
    checklist.length > 0 &&
    checklist.every((step) => step.status === STEP_STATUS.done)
  ) {
    return STEP_STATUS.done;
  }

  if (checklist.some((step) => step.status === STEP_STATUS.blocked)) {
    return STEP_STATUS.blocked;
  }

  if (checklist.some((step) => step.status === STEP_STATUS.awaitingFinalCheck)) {
    return STEP_STATUS.awaitingFinalCheck;
  }

  if (checklist.some((step) => step.status === STEP_STATUS.inProgress)) {
    return STEP_STATUS.inProgress;
  }

  return STEP_STATUS.notStarted;
};
