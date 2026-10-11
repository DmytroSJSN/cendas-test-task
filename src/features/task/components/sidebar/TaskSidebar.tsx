import { useState } from "react";
import { cn } from "../../../../utils/cn";
import { useTasks } from "../../hooks/useTasks";
import TaskList from "../task-list/TaskList";
import TaskSidebarHandle from "./TaskSidebarHandle";

const TaskSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { tasks, isLoading, error } = useTasks();

  return (
    <div
      className={cn(
        "absolute inset-y-0 left-0 z-10 w-80 transition-transform duration-300 ease-in-out",
        collapsed && "-translate-x-full",
      )}
    >
      <aside className="flex h-full flex-col border-r border-border bg-background shadow-xl">
        <header className="flex items-center justify-between border-b border-border pl-4 pr-7 py-3">
          <h2 className="text-lg font-semibold">Tasks</h2>
          <span className="text-muted-foreground">{tasks.length}</span>
        </header>

        <div className="flex-1 overflow-y-auto p-3">
          <TaskList tasks={tasks} isLoading={isLoading} error={error} />
        </div>

        <TaskSidebarHandle
          collapsed={collapsed}
          onToggle={() => setCollapsed((current) => !current)}
        />
      </aside>
    </div>
  );
};

export default TaskSidebar;
