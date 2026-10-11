import type { RxDatabase } from "rxdb";
import type { TaskCollection } from "./task/task.types";
import type { UserCollection } from "./user/user.types";

export type AppCollections = {
  users: UserCollection;
  tasks: TaskCollection;
};

export type AppDatabase = RxDatabase<AppCollections>;
