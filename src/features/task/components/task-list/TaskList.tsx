import Spinner from "../../../../components/ui/Spinner";
import type { Task } from "../../../../db/task/task.types";
import TaskListItem from "./TaskListItem";

interface TaskListProps {
  tasks: Task[];
  isLoading: boolean;
  error: string | null;
}

const TaskList = ({ tasks, isLoading, error }: TaskListProps) => {
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
        <li key={task.id}>
          <TaskListItem task={task} />
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
