import { Plus, Trash2 } from "lucide-react";
import { useFieldArray } from "react-hook-form";
import Button from "../../../../components/ui/Button";
import FormField from "../../../../components/ui/FormField";
import FormSelect from "../../../../components/ui/FormSelect";
import {
  CHECKLIST_MAX_STEPS,
  CHECKLIST_MIN_STEPS,
  DEFAULT_STEP_STATUS,
} from "../../../../db/task/task.constants";
import { STEP_STATUS_OPTIONS } from "../../constants/status.constants";
import {
  type AddStepInput,
  type CreateTaskInput,
} from "../../schema/task-input.schema";

const createEmptyStep = (): AddStepInput => ({
  title: "",
  status: DEFAULT_STEP_STATUS,
});

const TaskCreateSteps = () => {
  const { fields, append, remove } = useFieldArray<CreateTaskInput>({
    name: "checklist",
  });

  const canRemove = fields.length > CHECKLIST_MIN_STEPS;
  const canAdd = fields.length < CHECKLIST_MAX_STEPS;

  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm font-medium text-foreground">Checklist</span>

      <div className="flex flex-col gap-3">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="flex items-stretch gap-2 border-b border-border pb-3 last:border-b-0 last:pb-0"
          >
            <div className="flex min-w-0 flex-1 flex-col gap-2">
              <FormField
                name={`checklist.${index}.title`}
                label={`Step ${index + 1}`}
                placeholder="Title"
              />
              <FormSelect
                name={`checklist.${index}.status`}
                options={STEP_STATUS_OPTIONS}
                aria-label={`Step ${index + 1} status`}
              />
            </div>
            <Button
              type="button"
              variant="ghost"
              aria-label={`Remove step ${index + 1}`}
              disabled={!canRemove}
              onClick={() => remove(index)}
              className="w-8 shrink-0 p-0"
            >
              <Trash2 className="size-4" />
            </Button>
          </div>
        ))}
      </div>

      <Button
        type="button"
        variant="secondary"
        disabled={!canAdd}
        onClick={() => append(createEmptyStep())}
        className="self-start"
      >
        <Plus className="size-4" />
        Add step
      </Button>
    </div>
  );
};

export default TaskCreateSteps;
