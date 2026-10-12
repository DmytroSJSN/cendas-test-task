import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Button from "../../../../components/ui/Button";
import Form from "../../../../components/ui/Form";
import FormField from "../../../../components/ui/FormField";
import type { Marker, Task } from "../../../../db/task/task.types";
import { handleZodError } from "../../../../utils/handleZodError";
import { useCreateTask } from "../../hooks/useCreateTask";
import {
  createTaskInputSchema,
  DEFAULT_VALUES,
  type CreateTaskInput,
} from "../../schema/task-input.schema";
import TaskCreateSteps from "./TaskCreateSteps";

interface TaskCreateFormProps {
  marker: Marker;
  onCreated: (task: Task) => void;
  onCancel: () => void;
}

const TaskCreateForm = ({
  marker,
  onCreated,
  onCancel,
}: TaskCreateFormProps) => {
  const createTask = useCreateTask();
  const form = useForm<CreateTaskInput>({
    resolver: zodResolver(createTaskInputSchema),
    defaultValues: DEFAULT_VALUES,
  });

  const onSubmit = async (values: CreateTaskInput) => {
    try {
      const task = await createTask(values, marker);
      form.reset(DEFAULT_VALUES);
      onCreated(task);
    } catch (error) {
      if (handleZodError(form.setError, error)) return;

      console.error(error);
      form.setError("root", {
        type: "server",
        message: "Something went wrong. Please try again.",
      });
    }
  };

  const checklistError =
    form.formState.errors.checklist?.root?.message ??
    form.formState.errors.checklist?.message;

  return (
    <Form form={form} onSubmit={onSubmit} className="flex flex-col gap-3 p-3">
      <FormField
        name="title"
        label="Title"
        placeholder="Task title"
        autoFocus
      />

      <TaskCreateSteps />

      {checklistError && (
        <p role="alert" className="text-sm text-destructive">
          {checklistError}
        </p>
      )}

      <div className="flex justify-end gap-2">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? "Creating…" : "Create task"}
        </Button>
      </div>
    </Form>
  );
};

export default TaskCreateForm;
