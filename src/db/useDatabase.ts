import { useEffect, useState } from "react";
import { getDatabase } from "./index";
import type { AppDatabase } from "./types";

export function useDatabase() {
  const [database, setDatabase] = useState<AppDatabase | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const initializeDatabase = async () => {
      try {
        const database = await getDatabase();
        setDatabase(database);
      } catch (cause: unknown) {
        setError(cause instanceof Error ? cause : new Error(String(cause)));
      }
    };

    initializeDatabase();
  }, []);

  return { database, error };
}
