import type { Step } from "../../../../db/task/task.types";
import ChecklistItem from "./ChecklistItem";

interface ChecklistProps {
  steps: Step[];
}

const Checklist = ({ steps }: ChecklistProps) => {
  return (
    <ul className="flex flex-col gap-1.5">
      {steps.map((step) => (
        <ChecklistItem key={step.id} step={step} />
      ))}
    </ul>
  );
};

export default Checklist;
