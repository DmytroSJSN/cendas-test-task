import type { ComponentProps } from "react";
import { cn } from "../../utils/cn";

const variants = {
  primary: "bg-zinc-100 text-zinc-900 hover:bg-white",
  secondary: "bg-zinc-800 text-zinc-100 hover:bg-zinc-700",
  ghost: "bg-transparent text-zinc-300 hover:bg-zinc-800",
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
