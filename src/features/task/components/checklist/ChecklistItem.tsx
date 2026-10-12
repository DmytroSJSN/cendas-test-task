import { useState } from "react";
import { Trash2 } from "lucide-react";
import Button from "../../../../components/ui/Button";
import type { Step } from "../../../../db/task/task.types";
import StepStatus from "./StepStatus";
import StepTitle from "./StepTitle";

interface ChecklistItemProps {
  taskId: string;
  step: Step;
  canDelete: boolean;
  onDelete: (step: Step) => void;
}

type StepEditing = "title" | "status";

const ChecklistItem = ({
  taskId,
  step,
  canDelete,
  onDelete,
}: ChecklistItemProps) => {
  const [editing, setEditing] = useState<StepEditing | null>(null);

  return (
    <li className="flex items-start gap-2 py-1">
      <div className="flex min-w-0 flex-1 flex-col items-start gap-1">
        <StepTitle
          taskId={taskId}
          step={step}
          isEditing={editing === "title"}
          onStartEdit={() => setEditing("title")}
          onClose={() => setEditing(null)}
        />

        <StepStatus
          taskId={taskId}
          step={step}
          isEditing={editing === "status"}
          onStartEdit={() => setEditing("status")}
          onClose={() => setEditing(null)}
        />
      </div>

      {!editing && (
        <div className="flex h-6 shrink-0 items-center">
          <Button
            type="button"
            variant="ghost"
            aria-label={`Delete step ${step.title}`}
            disabled={!canDelete}
            onClick={() => onDelete(step)}
            className="size-8 p-0"
          >
            <Trash2 className="size-4" />
          </Button>
        </div>
      )}
    </li>
  );
};

export default ChecklistItem;
