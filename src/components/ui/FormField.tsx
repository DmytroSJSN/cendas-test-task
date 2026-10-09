import type { ComponentProps } from "react";
import {
  get,
  useFormContext,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";
import Input from "./Input";
import { cn } from "../../utils/cn";

type FormFieldProps<TFieldValues extends FieldValues> = Omit<
  ComponentProps<"input">,
  "name"
> & {
  name: FieldPath<TFieldValues>;
  label: string;
};

const FormField = <TFieldValues extends FieldValues = FieldValues>({
  name,
  label,
  className,
  ...props
}: FormFieldProps<TFieldValues>) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = get(errors, name);

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label className="flex flex-col gap-1.5">
        <span className="text-sm font-medium text-zinc-300">{label}</span>
        <Input aria-invalid={!!error?.message} {...register(name)} {...props} />
      </label>
      {error?.message && (
        <p role="alert" className="text-sm text-destructive">
          {error.message}
        </p>
      )}
    </div>
  );
};

export default FormField;
