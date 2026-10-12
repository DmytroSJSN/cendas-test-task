import type { ComponentProps } from "react";
import {
  get,
  useFormContext,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";
import Select from "./Select";
import { cn } from "../../utils/cn";

export type SelectOption = {
  value: string;
  label: string;
};

type FormSelectProps<TFieldValues extends FieldValues> = Omit<
  ComponentProps<"select">,
  "name" | "children"
> & {
  name: FieldPath<TFieldValues>;
  label?: string;
  options: readonly SelectOption[];
};

const FormSelect = <TFieldValues extends FieldValues = FieldValues>({
  name,
  label,
  options,
  className,
  ...props
}: FormSelectProps<TFieldValues>) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = get(errors, name);

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label className="flex flex-col gap-1.5">
        {label && (
          <span className="text-sm font-medium text-foreground">{label}</span>
        )}
        <Select aria-invalid={!!error?.message} {...register(name)} {...props}>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      </label>
      {error?.message && (
        <p role="alert" className="text-sm text-destructive">
          {error.message}
        </p>
      )}
    </div>
  );
};

export default FormSelect;
