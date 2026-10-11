import {
  createNewStep,
  deleteOwnedTask,
  insertTask,
  updateOwnedTask,
} from "../../../db/task/task.repository";
import type { Marker, Step, Task } from "../../../db/task/task.types";
import { NotFoundError } from "../../../errors/not-found.error";
import {
  checklistSchema,
  createTaskInputSchema,
  stepInputSchema,
  updateStepStatusInputSchema,
  updateStepTitleInputSchema,
  updateTaskTitleInputSchema,
  type AddStepInput,
  type CreateTaskInput,
  type UpdateStepStatusInput,
  type UpdateStepTitleInput,
  type UpdateTaskTitleInput,
} from "../schema/task-input.schema";

export async function createTask(
  input: CreateTaskInput,
  marker: Marker,
  ownerName: string,
): Promise<Task> {
  const task = createTaskInputSchema.parse(input);

  return insertTask({ ...task, marker, ownerName });
}

export async function deleteTask(
  taskId: string,
  ownerName: string,
): Promise<void> {
  const deleted = await deleteOwnedTask(taskId, ownerName);

  if (!deleted) {
    throw new NotFoundError("Task", taskId);
  }
}

export async function updateTaskTitle(
  taskId: string,
  input: UpdateTaskTitleInput,
  ownerName: string,
): Promise<Task> {
  const { title } = updateTaskTitleInputSchema.parse(input);

  const task = await updateOwnedTask(taskId, ownerName, () => ({ title }));

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

export async function addStep(
  taskId: string,
  input: AddStepInput,
  ownerName: string,
): Promise<Task> {
  const step = stepInputSchema.parse(input);

  const task = await updateOwnedTask(taskId, ownerName, (current) => {
    const nextChecklist = [...current.checklist, createNewStep(step)];

    checklistSchema.parse(nextChecklist);

    return { checklist: nextChecklist };
  });

  if (!task) {
    throw new NotFoundError("Task", taskId);
  }

  return task;
}

export async function deleteStep(
  taskId: string,
  stepId: string,
  ownerName: string,
): Promise<Task> {
  const task = await updateOwnedTask(taskId, ownerName, (current) => {
    if (!current.checklist.some((step) => step.id === stepId)) {
      throw new NotFoundError("Step", stepId);
    }

    const nextChecklist = current.checklist.filter(
      (step) => step.id !== stepId,
    );

    checklistSchema.parse(nextChecklist);

    return { checklist: nextChecklist };
  });

  if (!task) {
    throw new NotFoundError("Task", taskId);
  }

  return task;
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
