import { createRxDatabase } from "rxdb";
import type { RxDatabaseCreator } from "rxdb";
import { userSchema } from "./user/user.schema";
import type { AppCollections, AppDatabase } from "./types";

type DatabaseStorage = RxDatabaseCreator["storage"];

export async function createDatabase(
  name: string,
  storage: DatabaseStorage,
): Promise<AppDatabase> {
  const db = await createRxDatabase<AppCollections>({
    name,
    storage,
  });

  await db.addCollections({
    users: {
      schema: userSchema,
    },
  });

  return db;
}
