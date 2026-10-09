import type { ComponentProps } from "react";
import {
  FormProvider,
  type FieldValues,
  type UseFormReturn,
} from "react-hook-form";

interface FormProps<T extends FieldValues> extends Omit<
  ComponentProps<"form">,
  "onSubmit"
> {
  form: UseFormReturn<T>;
  onSubmit: (data: T) => void | Promise<void>;
}

const Form = <T extends FieldValues>({
  form,
  onSubmit,
  children,
  ...props
}: FormProps<T>) => {
  const rootError = form.formState.errors.root;

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} {...props}>
        {children}
        {rootError?.message && (
          <p role="alert" className="text-center text-sm text-red-400">
            {rootError.message}
          </p>
        )}
      </form>
    </FormProvider>
  );
};

export default Form;
