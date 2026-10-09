import { addRxPlugin } from "rxdb";
import { RxDBDevModePlugin } from "rxdb/plugins/dev-mode";
import { wrappedValidateAjvStorage } from "rxdb/plugins/validate-ajv";
import { getRxStorageLocalstorage } from "rxdb/plugins/storage-localstorage";
import { createDatabase } from "./create-database";
import type { AppDatabase } from "./types";

const DATABASE_NAME = "cendas";

if (import.meta.env.DEV) {
  addRxPlugin(RxDBDevModePlugin);
}

const storage = import.meta.env.DEV
  ? wrappedValidateAjvStorage({
      storage: getRxStorageLocalstorage(),
    })
  : getRxStorageLocalstorage();

let databasePromise: Promise<AppDatabase> | null = null;

export function getDatabase(): Promise<AppDatabase> {
  if (databasePromise === null) {
    databasePromise = createDatabase(DATABASE_NAME, storage).catch((error) => {
      databasePromise = null;
      throw error;
    });
  }

  return databasePromise;
}
