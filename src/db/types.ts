import type { RxDatabase } from "rxdb";
import type { UserCollection } from "./user/user.types";

export type AppCollections = {
  users: UserCollection;
};

export type AppDatabase = RxDatabase<AppCollections>;
