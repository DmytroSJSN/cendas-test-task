import type { ComponentProps } from "react";
import { cn } from "../../utils/cn";

const variants = {
  primary: "bg-primary text-primary-foreground hover:bg-white",
  secondary: "bg-secondary text-secondary-foreground hover:bg-secondary-hover",
  ghost: "bg-transparent text-muted-foreground hover:bg-accent hover:text-accent-foreground",
} as const;

type ButtonProps = ComponentProps<"button"> & {
  variant?: keyof typeof variants;
};

const Button = ({ variant = "primary", className, ...props }: ButtonProps) => {
  return (
    <button
      className={cn(
        "cursor-pointer rounded-lg px-4 py-2 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-50",
        variants[variant],
        className,
      )}
      {...props}
    />
  );
};

export default Button;
