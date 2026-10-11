import TaskSidebar from "../../task/components/sidebar/TaskSidebar";
import PlanViewer from "../components/PlanViewer";

const PlanPage = () => {
  return (
    <main className="relative flex-1 overflow-hidden">
      <TaskSidebar />
      <div className="absolute inset-0 p-4">
        <PlanViewer />
      </div>
    </main>
  );
};

export default PlanPage;
