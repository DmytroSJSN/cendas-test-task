import { useState } from "react";
import { Plus } from "lucide-react";
import Button from "../../../../components/ui/Button";
import AddStepForm from "./AddStepForm";

interface ChecklistAddStepProps {
  taskId: string;
  canAdd: boolean;
}

const ChecklistAddStep = ({ taskId, canAdd }: ChecklistAddStepProps) => {
  const [isAdding, setIsAdding] = useState(false);

  if (!canAdd) return null;

  if (isAdding) {
    return <AddStepForm taskId={taskId} onClose={() => setIsAdding(false)} />;
  }

  return (
    <Button
      type="button"
      variant="secondary"
      onClick={() => setIsAdding(true)}
      className="mt-2"
    >
      <Plus className="size-4" />
      Add step
    </Button>
  );
};

export default ChecklistAddStep;
