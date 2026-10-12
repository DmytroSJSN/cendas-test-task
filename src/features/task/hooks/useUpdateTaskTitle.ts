import { useCallback } from "react";
import type { Task } from "../../../db/task/task.types";
import { useAuthStore } from "../../auth/store/auth.store";
import type { UpdateTaskTitleInput } from "../schema/task-input.schema";
import { updateTaskTitle } from "../service/task.service";

export function useUpdateTaskTitle() {
  const ownerName = useAuthStore((state) => state.user!.name);

  return useCallback(
    (taskId: string, input: UpdateTaskTitleInput): Promise<Task> =>
      updateTaskTitle(taskId, input, ownerName),
    [ownerName],
  );
}
