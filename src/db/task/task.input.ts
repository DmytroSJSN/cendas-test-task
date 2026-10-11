import type { Step, Task } from "./task.types";

export type NewStep = Omit<Step, "id">;

export type NewTask = Omit<
  Task,
  "id" | "checklist" | "createdAt" | "updatedAt"
> & {
  checklist: NewStep[];
};

export type TaskUpdate = Partial<Pick<Task, "title" | "checklist">>;
