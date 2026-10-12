import { z } from "zod";
import {
  CHECKLIST_MAX_STEPS,
  CHECKLIST_MIN_STEPS,
  DEFAULT_STEP_STATUS,
  STEP_STATUSES,
  STEP_TITLE_MAX_LENGTH,
  STEP_TITLE_MIN_LENGTH,
  TASK_TITLE_MAX_LENGTH,
  TASK_TITLE_MIN_LENGTH,
} from "../../../db/task/task.constants";
import { maxMessage, minMessage } from "../../../utils/validationMessages";

export const stepInputSchema = z.object({
  title: z
    .string()
    .trim()
    .min(STEP_TITLE_MIN_LENGTH, minMessage("Step title", STEP_TITLE_MIN_LENGTH))
    .max(
      STEP_TITLE_MAX_LENGTH,
      maxMessage("Step title", STEP_TITLE_MAX_LENGTH),
    ),
  status: z.enum(STEP_STATUSES),
});

export const checklistSchema = z
  .array(stepInputSchema)
  .min(
    CHECKLIST_MIN_STEPS,
    minMessage("Checklist", CHECKLIST_MIN_STEPS, "step"),
  )
  .max(
    CHECKLIST_MAX_STEPS,
    maxMessage("Checklist", CHECKLIST_MAX_STEPS, "step"),
  );

export const createTaskInputSchema = z.object({
  title: z
    .string()
    .trim()
    .min(TASK_TITLE_MIN_LENGTH, minMessage("Title", TASK_TITLE_MIN_LENGTH))
    .max(TASK_TITLE_MAX_LENGTH, maxMessage("Title", TASK_TITLE_MAX_LENGTH)),
  checklist: checklistSchema,
});

export const updateTaskTitleInputSchema = createTaskInputSchema.pick({
  title: true,
});

export const updateStepTitleInputSchema = stepInputSchema.pick({ title: true });

export const updateStepStatusInputSchema = stepInputSchema.pick({
  status: true,
});

export type CreateTaskInput = z.infer<typeof createTaskInputSchema>;
export type UpdateTaskTitleInput = z.infer<typeof updateTaskTitleInputSchema>;
export type UpdateStepTitleInput = z.infer<typeof updateStepTitleInputSchema>;
export type UpdateStepStatusInput = z.infer<typeof updateStepStatusInputSchema>;
export type AddStepInput = z.infer<typeof stepInputSchema>;

export const createEmptyStep = (): AddStepInput => ({
  title: "",
  status: DEFAULT_STEP_STATUS,
});

const DEFAULT_STEP_TITLES = [
  "Initial assessment",
  "Installation",
  "Final inspection",
] as const;

const createDefaultSteps = (): AddStepInput[] =>
  DEFAULT_STEP_TITLES.map((title) => ({
    title,
    status: DEFAULT_STEP_STATUS,
  }));

export const DEFAULT_VALUES: CreateTaskInput = {
  title: "",
  checklist: createDefaultSteps(),
};
