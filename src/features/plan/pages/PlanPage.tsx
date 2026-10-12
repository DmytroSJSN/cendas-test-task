import TaskSidebar from "../../task/components/sidebar/TaskSidebar";
import { useTasks } from "../../task/hooks/useTasks";
import PlanViewer from "../components/PlanViewer";

const PlanPage = () => {
  const { tasks, isLoading, error } = useTasks();

  return (
    <main className="relative flex-1 overflow-hidden">
      <TaskSidebar tasks={tasks} isLoading={isLoading} error={error} />
      <div className="absolute inset-0 p-4">
        <PlanViewer tasks={tasks} />
      </div>
    </main>
  );
};

export default PlanPage;
