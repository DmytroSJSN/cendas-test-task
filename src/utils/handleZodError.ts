import type { FieldValues, Path, UseFormSetError } from "react-hook-form";
import { ZodError } from "zod";

export function handleZodError<T extends FieldValues>(
  setError: UseFormSetError<T>,
  error: unknown,
): boolean {
  if (!(error instanceof ZodError)) return false;

  for (const issue of error.issues) {
    const name = issue.path.map(String).join(".");

    setError(name ? (name as Path<T>) : "root", {
      type: "server",
      message: issue.message,
    });
  }

  return true;
}
