import { generateId } from "../../utils/generateId";
import { getDatabase } from "../database";
import type { NewStep, NewTask, TaskUpdate } from "./task.input";
import type { Step, Task, TaskCollection } from "./task.types";

const getTasksCollection = async (): Promise<TaskCollection> => {
  const db = await getDatabase();

  return db.tasks;
};

const findOwnedTaskDocument = async (taskId: string, ownerName: string) => {
  const tasks = await getTasksCollection();

  return tasks.findOne({ selector: { id: taskId, ownerName } }).exec();
};

export const findTasksByOwner = async (ownerName: string): Promise<Task[]> => {
  const tasks = await getTasksCollection();

  const taskDocuments = await tasks
    .find({ selector: { ownerName }, sort: [{ createdAt: "desc" }] })
    .exec();

  return taskDocuments.map((taskDocument) => taskDocument.toMutableJSON());
};

export const updateOwnedTask = async (
  taskId: string,
  ownerName: string,
  buildUpdate: (task: Task) => TaskUpdate,
): Promise<Task | null> => {
  const taskDocument = await findOwnedTaskDocument(taskId, ownerName);

  if (!taskDocument) {
    return null;
  }

  const updatedDocument = await taskDocument.incrementalModify((current) => ({
    ...current,
    ...buildUpdate(current),
    updatedAt: Date.now(),
  }));

  return updatedDocument.toMutableJSON();
};

export const createNewStep = (step: NewStep): Step => ({
  ...step,
  id: generateId(),
});

export const insertTask = async (input: NewTask): Promise<Task> => {
  const tasks = await getTasksCollection();

  const now = Date.now();

  const checklist = input.checklist.map(createNewStep);

  const taskDocument = await tasks.insert({
    ...input,
    id: generateId(),
    checklist,
    createdAt: now,
    updatedAt: now,
  });

  return taskDocument.toMutableJSON();
};

export const deleteOwnedTask = async (
  taskId: string,
  ownerName: string,
): Promise<boolean> => {
  const taskDocument = await findOwnedTaskDocument(taskId, ownerName);

  if (!taskDocument) {
    return false;
  }

  await taskDocument.remove();

  return true;
};
