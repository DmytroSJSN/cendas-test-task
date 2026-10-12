import { useState } from "react";
import {
  CHECKLIST_MAX_STEPS,
  CHECKLIST_MIN_STEPS,
} from "../../../../db/task/task.constants";
import type { Step } from "../../../../db/task/task.types";
import ChecklistAddStep from "./ChecklistAddStep";
import ChecklistItem from "./ChecklistItem";
import DeleteStepModal from "./DeleteStepModal";

interface ChecklistProps {
  taskId: string;
  steps: Step[];
}

const Checklist = ({ taskId, steps }: ChecklistProps) => {
  const [stepToDelete, setStepToDelete] = useState<Step | null>(null);

  const canDelete = steps.length > CHECKLIST_MIN_STEPS;
  const canAdd = steps.length < CHECKLIST_MAX_STEPS;

  return (
    <>
      <ul className="flex flex-col gap-1.5">
        {steps.map((step) => (
          <ChecklistItem
            key={step.id}
            taskId={taskId}
            step={step}
            canDelete={canDelete}
            onDelete={setStepToDelete}
          />
        ))}
      </ul>

      <ChecklistAddStep taskId={taskId} canAdd={canAdd} />

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
