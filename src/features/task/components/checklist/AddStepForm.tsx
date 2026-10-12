import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Button from "../../../../components/ui/Button";
import Form from "../../../../components/ui/Form";
import FormField from "../../../../components/ui/FormField";
import { handleZodError } from "../../../../utils/handleZodError";
import { useAddStep } from "../../hooks/useTaskSteps";
import {
  createEmptyStep,
  stepInputSchema,
  type AddStepInput,
} from "../../schema/task-input.schema";

interface AddStepFormProps {
  taskId: string;
  onClose: () => void;
}

const AddStepForm = ({ taskId, onClose }: AddStepFormProps) => {
  const addStep = useAddStep();
  const form = useForm<AddStepInput>({
    resolver: zodResolver(stepInputSchema),
    defaultValues: createEmptyStep(),
  });

  const onSubmit = async (values: AddStepInput) => {
    try {
      await addStep(taskId, values);
      onClose();
    } catch (error) {
      if (handleZodError(form.setError, error)) return;

      console.error(error);
      form.setError("root", {
        type: "server",
        message: "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <Form
      form={form}
      onSubmit={onSubmit}
      className="mt-2 flex flex-col gap-3 border-t border-border pt-3"
    >
      <FormField name="title" label="New step" placeholder="Title" autoFocus />

      <div className="flex justify-end gap-2">
        <Button type="button" variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? "Adding…" : "Add step"}
        </Button>
      </div>
    </Form>
  );
};

export default AddStepForm;
