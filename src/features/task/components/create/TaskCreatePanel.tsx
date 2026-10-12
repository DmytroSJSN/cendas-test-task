import { useEffect } from "react";
import type { Task } from "../../../../db/task/task.types";
import { useTaskUiStore } from "../../store/task-ui.store";
import TaskCreateForm from "./TaskCreateForm";

const TaskCreatePanel = () => {
  const draftMarker = useTaskUiStore((state) => state.draftMarker);
  const clearDraftMarker = useTaskUiStore((state) => state.clearDraftMarker);
  const revealTask = useTaskUiStore((state) => state.revealTask);

  useEffect(() => {
    if (!draftMarker) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") clearDraftMarker();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [draftMarker, clearDraftMarker]);

  const handleCreated = (task: Task) => {
    clearDraftMarker();
    revealTask(task.id);
  };

  if (!draftMarker) return null;

  return (
    <li className="overflow-hidden rounded-lg border border-ring bg-card">
      <TaskCreateForm
        marker={draftMarker}
        onCreated={handleCreated}
        onCancel={clearDraftMarker}
      />
    </li>
  );
};

export default TaskCreatePanel;
