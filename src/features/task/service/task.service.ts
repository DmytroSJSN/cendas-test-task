import { insertTask } from "../../../db/task/task.repository";
import type { Marker, Task } from "../../../db/task/task.types";
import {
  createTaskInputSchema,
  type CreateTaskInput,
} from "../schema/task-input.schema";

export async function createTask(
  input: CreateTaskInput,
  marker: Marker,
  ownerName: string,
): Promise<Task> {
  const task = createTaskInputSchema.parse(input);

  return insertTask({ ...task, marker, ownerName });
}
