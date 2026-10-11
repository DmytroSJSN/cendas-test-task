import type { Step } from "../../../../db/task/task.types";

interface ChecklistItemProps {
  step: Step;
}

const ChecklistItem = ({ step }: ChecklistItemProps) => {
  return (
    <li className="flex gap-2 text-muted-foreground">
      <span aria-hidden="true" className="text-border">
        •
      </span>
      <span>{step.title}</span>
    </li>
  );
};

export default ChecklistItem;
