import { addRxPlugin, createRxDatabase } from "rxdb";
import { userSchema } from "./user/user.schema";
import type { AppCollections, AppDatabase } from "./types";
import { RxDBDevModePlugin } from "rxdb/plugins/dev-mode";
import { wrappedValidateAjvStorage } from "rxdb/plugins/validate-ajv";
import { getRxStorageLocalstorage } from "rxdb/plugins/storage-localstorage";

const DATABASE_NAME = "cendas";

if (import.meta.env.DEV) {
  addRxPlugin(RxDBDevModePlugin);
}

const storage = wrappedValidateAjvStorage({
  storage: getRxStorageLocalstorage(),
});

const createDatabase = async (): Promise<AppDatabase> => {
  const db = await createRxDatabase<AppCollections>({
    name: DATABASE_NAME,
    storage,
  });

  await db.addCollections({
    users: {
      schema: userSchema,
    },
  });

  return db;
};

let databasePromise: Promise<AppDatabase> | null = null;

export function getDatabase(): Promise<AppDatabase> {
  if (databasePromise === null) {
    databasePromise = createDatabase().catch((error) => {
      databasePromise = null;
      throw error;
    });
  }

  return databasePromise;
}
