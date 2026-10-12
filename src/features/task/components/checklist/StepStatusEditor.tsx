import { useEffect, type KeyboardEvent } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, X } from "lucide-react";
import { useForm } from "react-hook-form";
import Button from "../../../../components/ui/Button";
import Form from "../../../../components/ui/Form";
import FormSelect from "../../../../components/ui/FormSelect";
import type { Step } from "../../../../db/task/task.types";
import { handleZodError } from "../../../../utils/handleZodError";
import { STEP_STATUS_OPTIONS } from "../../constants/status.constants";
import { useUpdateStepStatus } from "../../hooks/useTaskSteps";
import {
  updateStepStatusInputSchema,
  type UpdateStepStatusInput,
} from "../../schema/task-input.schema";

interface StepStatusEditorProps {
  taskId: string;
  step: Step;
  onClose: () => void;
}

const StepStatusEditor = ({ taskId, step, onClose }: StepStatusEditorProps) => {
  const updateStepStatus = useUpdateStepStatus();
  const form = useForm<UpdateStepStatusInput>({
    resolver: zodResolver(updateStepStatusInputSchema),
    defaultValues: { status: step.status },
  });
  const isSubmitting = form.formState.isSubmitting;

  useEffect(() => {
    form.setFocus("status");
  }, [form]);

  const onSubmit = async (values: UpdateStepStatusInput) => {
    if (values.status === step.status) {
      onClose();
      return;
    }

    try {
      await updateStepStatus(taskId, step.id, values);
      onClose();
    } catch (error) {
      if (handleZodError(form.setError, error)) return;

      console.error(error);
      form.setError("root", {
        type: "server",
        message: "Could not save the step status. Please try again.",
      });
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLFormElement>) => {
    if (event.key === "Escape") {
      event.preventDefault();
      onClose();
    }
  };

  return (
    <Form
      form={form}
      onSubmit={onSubmit}
      onKeyDown={handleKeyDown}
      className="flex w-full min-w-0 flex-col gap-1"
    >
      <div className="flex w-full min-w-0 items-start gap-1">
        <FormSelect
          name="status"
          aria-label="Step status"
          options={STEP_STATUS_OPTIONS}
          className="min-w-0 flex-1"
        />

        <Button
          type="submit"
          variant="ghost"
          aria-label="Save step status"
          disabled={isSubmitting}
          className="size-8 shrink-0 p-0"
        >
          <Check className="size-4" />
        </Button>

        <Button
          type="button"
          variant="ghost"
          aria-label="Cancel step status editing"
          disabled={isSubmitting}
          onClick={onClose}
          className="size-8 shrink-0 p-0"
        >
          <X className="size-4" />
        </Button>
      </div>
    </Form>
  );
};

export default StepStatusEditor;
