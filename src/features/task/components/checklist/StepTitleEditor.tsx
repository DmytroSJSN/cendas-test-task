import { useEffect, type KeyboardEvent } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, X } from "lucide-react";
import { useForm } from "react-hook-form";
import Button from "../../../../components/ui/Button";
import Form from "../../../../components/ui/Form";
import FormField from "../../../../components/ui/FormField";
import type { Step } from "../../../../db/task/task.types";
import { handleZodError } from "../../../../utils/handleZodError";
import { useUpdateStepTitle } from "../../hooks/useTaskSteps";
import {
  updateStepTitleInputSchema,
  type UpdateStepTitleInput,
} from "../../schema/task-input.schema";

interface StepTitleEditorProps {
  taskId: string;
  step: Step;
  onClose: () => void;
}

const StepTitleEditor = ({ taskId, step, onClose }: StepTitleEditorProps) => {
  const updateStepTitle = useUpdateStepTitle();
  const form = useForm<UpdateStepTitleInput>({
    resolver: zodResolver(updateStepTitleInputSchema),
    defaultValues: { title: step.title },
  });
  const isSubmitting = form.formState.isSubmitting;

  useEffect(() => {
    form.setFocus("title", { shouldSelect: true });
  }, [form]);

  const onSubmit = async (values: UpdateStepTitleInput) => {
    if (values.title === step.title) {
      onClose();
      return;
    }

    try {
      await updateStepTitle(taskId, step.id, values);
      onClose();
    } catch (error) {
      if (handleZodError(form.setError, error)) return;

      console.error(error);
      form.setError("root", {
        type: "server",
        message: "Could not save the step title. Please try again.",
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
        <FormField
          name="title"
          aria-label="Step title"
          className="min-w-0 flex-1"
        />

        <Button
          type="submit"
          variant="ghost"
          aria-label="Save step title"
          disabled={isSubmitting}
          className="size-8 shrink-0 p-0"
        >
          <Check className="size-4" />
        </Button>

        <Button
          type="button"
          variant="ghost"
          aria-label="Cancel step title editing"
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

export default StepTitleEditor;
