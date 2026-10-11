export const TASK_TITLE_MIN_LENGTH = 1;
export const TASK_TITLE_MAX_LENGTH = 200;

export const MARKER_COORDINATE_MIN = 0;
export const MARKER_COORDINATE_MAX = 1;

export const CHECKLIST_MIN_STEPS = 1;
export const CHECKLIST_MAX_STEPS = 100;

export const STEP_TITLE_MIN_LENGTH = 1;
export const STEP_TITLE_MAX_LENGTH = 200;

export const STEP_STATUSES = [
  "not_started",
  "in_progress",
  "blocked",
  "awaiting_final_check",
  "done",
] as const;
