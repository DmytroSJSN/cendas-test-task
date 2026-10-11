import { useMemo } from "react";
import { useLiveRxQuery } from "rxdb/plugins/react";
import type { MangoQuery } from "rxdb";
import type { Task } from "../../../db/task/task.types";
import { useAuthStore } from "../../auth/store/auth.store";

export function useTasks() {
  const ownerName = useAuthStore((state) => state.user!.name);

  const query = useMemo<MangoQuery<Task>>(
    () => ({
      selector: { ownerName },
      sort: [{ createdAt: "desc" }],
    }),
    [ownerName],
  );

  const { results, loading, error } = useLiveRxQuery<Task>({
    collection: "tasks",
    query,
  });

  const tasks = useMemo(
    () => results.map((document) => document.toMutableJSON()),
    [results],
  );

  return { tasks, isLoading: loading, error };
}
