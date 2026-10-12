import { useState } from "react";
import { CHECKLIST_MIN_STEPS } from "../../../../db/task/task.constants";
import type { Step } from "../../../../db/task/task.types";
import ChecklistItem from "./ChecklistItem";
import DeleteStepModal from "./DeleteStepModal";

interface ChecklistProps {
  taskId: string;
  steps: Step[];
}

const Checklist = ({ taskId, steps }: ChecklistProps) => {
  const [stepToDelete, setStepToDelete] = useState<Step | null>(null);

  const canDelete = steps.length > CHECKLIST_MIN_STEPS;

  return (
    <>
      <ul className="flex flex-col gap-1.5">
        {steps.map((step) => (
          <ChecklistItem
            key={step.id}
            step={step}
            canDelete={canDelete}
            onDelete={setStepToDelete}
          />
        ))}
      </ul>

      {stepToDelete && (
        <DeleteStepModal
          taskId={taskId}
          step={stepToDelete}
          onClose={() => setStepToDelete(null)}
        />
      )}
    </>
  );
};

export default Checklist;
