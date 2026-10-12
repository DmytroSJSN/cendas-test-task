import { useCallback } from "react";
import type { Task } from "../../../db/task/task.types";
import { useAuthStore } from "../../auth/store/auth.store";
import type { AddStepInput } from "../schema/task-input.schema";
import { addStep, deleteStep } from "../service/task.service";

export function useAddStep() {
  const ownerName = useAuthStore((state) => state.user!.name);

  return useCallback(
    (taskId: string, input: AddStepInput): Promise<Task> =>
      addStep(taskId, input, ownerName),
    [ownerName],
  );
}

export function useDeleteStep() {
  const ownerName = useAuthStore((state) => state.user!.name);

  return useCallback(
    (taskId: string, stepId: string): Promise<Task> =>
      deleteStep(taskId, stepId, ownerName),
    [ownerName],
  );
}
