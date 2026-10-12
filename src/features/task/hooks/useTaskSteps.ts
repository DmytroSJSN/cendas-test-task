import { useCallback } from "react";
import type { Task } from "../../../db/task/task.types";
import { useAuthStore } from "../../auth/store/auth.store";
import type {
  AddStepInput,
  UpdateStepStatusInput,
  UpdateStepTitleInput,
} from "../schema/task-input.schema";
import {
  addStep,
  deleteStep,
  updateStepStatus,
  updateStepTitle,
} from "../service/task.service";

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

export function useUpdateStepTitle() {
  const ownerName = useAuthStore((state) => state.user!.name);

  return useCallback(
    (
      taskId: string,
      stepId: string,
      input: UpdateStepTitleInput,
    ): Promise<Task> => updateStepTitle(taskId, stepId, input, ownerName),
    [ownerName],
  );
}

export function useUpdateStepStatus() {
  const ownerName = useAuthStore((state) => state.user!.name);

  return useCallback(
    (
      taskId: string,
      stepId: string,
      input: UpdateStepStatusInput,
    ): Promise<Task> => updateStepStatus(taskId, stepId, input, ownerName),
    [ownerName],
  );
}
