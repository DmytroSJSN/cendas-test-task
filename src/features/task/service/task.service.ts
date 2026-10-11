import {
  findTasksByOwner,
  insertTask,
  updateOwnedTask,
} from "../../../db/task/task.repository";
import type { Marker, Step, Task } from "../../../db/task/task.types";
import { NotFoundError } from "../../../errors/not-found.error";
import {
  createTaskInputSchema,
  updateStepStatusInputSchema,
  updateStepTitleInputSchema,
  updateTaskTitleInputSchema,
  type CreateTaskInput,
  type UpdateStepStatusInput,
  type UpdateStepTitleInput,
  type UpdateTaskTitleInput,
} from "../schema/task-input.schema";

export async function getOwnTasks(ownerName: string): Promise<Task[]> {
  return findTasksByOwner(ownerName);
}

export async function createTask(
  input: CreateTaskInput,
  marker: Marker,
  ownerName: string,
): Promise<Task> {
  const task = createTaskInputSchema.parse(input);

  return insertTask({ ...task, marker, ownerName });
}

export async function updateTaskTitle(
  taskId: string,
  input: UpdateTaskTitleInput,
  ownerName: string,
): Promise<Task> {
  const { title } = updateTaskTitleInputSchema.parse(input);

  const task = await updateOwnedTask(taskId, ownerName, (current) => ({
    ...current,
    title,
  }));

  if (!task) {
    throw new NotFoundError("Task", taskId);
  }

  return task;
}

export async function updateStepTitle(
  taskId: string,
  stepId: string,
  input: UpdateStepTitleInput,
  ownerName: string,
): Promise<Task> {
  const patch = updateStepTitleInputSchema.parse(input);

  return patchStep(taskId, stepId, patch, ownerName);
}

export async function updateStepStatus(
  taskId: string,
  stepId: string,
  input: UpdateStepStatusInput,
  ownerName: string,
): Promise<Task> {
  const patch = updateStepStatusInputSchema.parse(input);

  return patchStep(taskId, stepId, patch, ownerName);
}

async function patchStep(
  taskId: string,
  stepId: string,
  patch: Partial<Pick<Step, "title" | "status">>,
  ownerName: string,
): Promise<Task> {
  const task = await updateOwnedTask(taskId, ownerName, (current) => {
    if (!current.checklist.some((step) => step.id === stepId)) {
      throw new NotFoundError("Step", stepId);
    }

    return {
      ...current,
      checklist: current.checklist.map((step) =>
        step.id === stepId ? { ...step, ...patch } : step,
      ),
    };
  });

  if (!task) {
    throw new NotFoundError("Task", taskId);
  }

  return task;
}
