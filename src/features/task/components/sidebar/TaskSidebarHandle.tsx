import { ChevronLeft, ChevronRight } from "lucide-react";
import Button from "../../../../components/ui/Button";

interface TaskSidebarHandleProps {
  collapsed: boolean;
  onToggle: () => void;
}

const TaskSidebarHandle = ({ collapsed, onToggle }: TaskSidebarHandleProps) => {
  const Icon = collapsed ? ChevronRight : ChevronLeft;

  return (
    <Button
      variant="secondary"
      aria-expanded={!collapsed}
      aria-label={collapsed ? "Expand task panel" : "Collapse task panel"}
      onClick={onToggle}
      className="absolute top-14 -right-9 size-9 rounded-l-none p-0 shadow-lg"
    >
      <Icon className="size-4" />
    </Button>
  );
};

export default TaskSidebarHandle;
