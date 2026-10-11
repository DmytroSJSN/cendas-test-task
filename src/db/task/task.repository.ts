import { generateId } from "../../utils/generateId";
import { getDatabase } from "../database";
import type { NewTask } from "./task.input";
import type { Task, TaskCollection } from "./task.types";

const getTasksCollection = async (): Promise<TaskCollection> => {
  const db = await getDatabase();

  return db.tasks;
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
