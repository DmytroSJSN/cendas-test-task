import { generateId } from "../../utils/generateId";
import { getDatabase } from "../database";
import type { NewTask } from "./task.input";
import type { Task, TaskCollection } from "./task.types";

const getTasksCollection = async (): Promise<TaskCollection> => {
  const db = await getDatabase();

  return db.tasks;
};

export const findTasksByOwner = async (ownerName: string): Promise<Task[]> => {
  const tasks = await getTasksCollection();

  const taskDocuments = await tasks
    .find({ selector: { ownerName }, sort: [{ createdAt: "desc" }] })
    .exec();

  return taskDocuments.map((taskDocument) => taskDocument.toMutableJSON());
};

export const insertTask = async (input: NewTask): Promise<Task> => {
  const tasks = await getTasksCollection();

  const now = Date.now();

  const checklist = input.checklist.map((step) => ({
    ...step,
    id: generateId(),
  }));

  const taskDocument = await tasks.insert({
    ...input,
    id: generateId(),
    checklist,
    createdAt: now,
    updatedAt: now,
  });

  return taskDocument.toMutableJSON();
};
