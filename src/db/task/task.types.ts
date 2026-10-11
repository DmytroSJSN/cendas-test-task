import type { RxCollection } from "rxdb";
import type { STEP_STATUSES } from "./task.constants";

export type StepStatus = (typeof STEP_STATUSES)[number];

export type Step = {
  id: string;
  title: string;
  status: StepStatus;
};

export type Marker = {
  x: number;
  y: number;
};

export type Task = {
  id: string;
  ownerName: string;
  title: string;
  marker: Marker;
  checklist: Step[];
  createdAt: number;
  updatedAt: number;
};

export type TaskCollection = RxCollection<Task>;
