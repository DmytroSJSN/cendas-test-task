import { useCallback } from "react";
import type { Marker, Task } from "../../../db/task/task.types";
import { useAuthStore } from "../../auth/store/auth.store";
import type { CreateTaskInput } from "../schema/task-input.schema";
import { createTask } from "../service/task.service";

export function useCreateTask() {
  const ownerName = useAuthStore((state) => state.user!.name);

  return useCallback(
    (input: CreateTaskInput, marker: Marker): Promise<Task> =>
      createTask(input, marker, ownerName),
    [ownerName],
  );
}
