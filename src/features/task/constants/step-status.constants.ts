import {
  Circle,
  CircleCheck,
  CircleDashed,
  CircleDot,
  CircleSlash,
  type LucideIcon,
} from "lucide-react";
import type { StepStatus } from "../../../db/task/task.types";

type StepStatusDisplay = {
  label: string;
  Icon: LucideIcon;
  className: string;
};

const ICON_BASE = "size-4 shrink-0";

export const STEP_STATUS_DISPLAY: Record<StepStatus, StepStatusDisplay> = {
  not_started: {
    label: "Not started",
    Icon: Circle,
    className: `${ICON_BASE} text-zinc-500`,
  },
  in_progress: {
    label: "In progress",
    Icon: CircleDot,
    className: `${ICON_BASE} text-blue-400`,
  },
  blocked: {
    label: "Blocked",
    Icon: CircleSlash,
    className: `${ICON_BASE} text-red-400`,
  },
  awaiting_final_check: {
    label: "Awaiting final check",
    Icon: CircleDashed,
    className: `${ICON_BASE} text-amber-400`,
  },
  done: {
    label: "Done",
    Icon: CircleCheck,
    className: `${ICON_BASE} text-emerald-400`,
  },
};
