import Spinner from "../../../../components/ui/Spinner";
import type { Task } from "../../../../db/task/task.types";
import { useTaskUiStore } from "../../store/task-ui.store";
import TaskListItem from "./TaskListItem";

interface TaskListProps {
  tasks: Task[];
  isLoading: boolean;
  error: string | null;
}

const TaskList = ({ tasks, isLoading, error }: TaskListProps) => {
  const selectedTaskId = useTaskUiStore((state) => state.selectedTaskId);
  const toggleTask = useTaskUiStore((state) => state.toggleTask);

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error) {
    return <p className="px-1 py-2 text-destructive">Failed to load tasks.</p>;
  }

  if (tasks.length === 0) {
    return (
      <p className="px-1 py-2 text-center text-muted-foreground">
        No tasks yet
      </p>
    );
  }

  return (
    <ul className="flex flex-col gap-2">
      {tasks.map((task) => (
        <TaskListItem
          key={task.id}
          task={task}
          expanded={task.id === selectedTaskId}
          onToggle={() => toggleTask(task.id)}
        />
      ))}
    </ul>
  );
};

export default TaskList;
