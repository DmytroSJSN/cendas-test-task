import { useEffect, type KeyboardEvent } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, X } from "lucide-react";
import { useForm } from "react-hook-form";
import Button from "../../../../components/ui/Button";
import Form from "../../../../components/ui/Form";
import FormField from "../../../../components/ui/FormField";
import type { Task } from "../../../../db/task/task.types";
import { handleZodError } from "../../../../utils/handleZodError";
import { useUpdateTaskTitle } from "../../hooks/useUpdateTaskTitle";
import {
  updateTaskTitleInputSchema,
  type UpdateTaskTitleInput,
} from "../../schema/task-input.schema";

interface TaskTitleEditorProps {
  task: Task;
  onClose: () => void;
}

const TaskTitleEditor = ({ task, onClose }: TaskTitleEditorProps) => {
  const updateTaskTitle = useUpdateTaskTitle();
  const form = useForm<UpdateTaskTitleInput>({
    resolver: zodResolver(updateTaskTitleInputSchema),
    defaultValues: { title: task.title },
  });
  const isSubmitting = form.formState.isSubmitting;

  useEffect(() => {
    form.setFocus("title", { shouldSelect: true });
  }, [form]);

  const onSubmit = async (values: UpdateTaskTitleInput) => {
    if (values.title === task.title) {
      onClose();
      return;
    }

    try {
      await updateTaskTitle(task.id, values);
      onClose();
    } catch (error) {
      if (handleZodError(form.setError, error)) return;

      console.error(error);
      form.setError("root", {
        type: "server",
        message: "Could not save the task title. Please try again.",
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
          aria-label="Task title"
          className="min-w-0 flex-1"
        />

        <Button
          type="submit"
          variant="secondary"
          aria-label="Save task title"
          disabled={isSubmitting}
          className="size-8 shrink-0 p-0"
        >
          <Check className="size-4" />
        </Button>

        <Button
          type="button"
          variant="secondary"
          aria-label="Cancel task title editing"
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

export default TaskTitleEditor;
