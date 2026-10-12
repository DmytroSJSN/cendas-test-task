import type { StepStatus } from "./task.types";

export const TASK_TITLE_MIN_LENGTH = 1;
export const TASK_TITLE_MAX_LENGTH = 200;

export const MARKER_COORDINATE_MIN = 0;
export const MARKER_COORDINATE_MAX = 1;

export const CHECKLIST_MIN_STEPS = 1;
export const CHECKLIST_MAX_STEPS = 100;

export const STEP_TITLE_MIN_LENGTH = 1;
export const STEP_TITLE_MAX_LENGTH = 200;

export const STEP_STATUS = {
  notStarted: "not_started",
  inProgress: "in_progress",
  blocked: "blocked",
  awaitingFinalCheck: "awaiting_final_check",
  done: "done",
} as const;

export const STEP_STATUSES = [
  STEP_STATUS.notStarted,
  STEP_STATUS.inProgress,
  STEP_STATUS.blocked,
  STEP_STATUS.awaitingFinalCheck,
  STEP_STATUS.done,
] as const;

export const DEFAULT_STEP_STATUS: StepStatus = STEP_STATUS.notStarted;
