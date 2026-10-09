import type { ComponentProps } from "react";
import { cn } from "../../utils/cn";

type InputProps = ComponentProps<"input">;

const Input = ({ className, ...props }: InputProps) => {
  return (
    <input
      className={cn(
        "rounded-lg border border-input bg-background/60 px-3 py-2 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-ring focus:ring-1 focus:ring-ring aria-invalid:border-destructive",
        className,
      )}
      {...props}
    />
  );
};

export default Input;
