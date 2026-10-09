import type { ComponentProps } from "react";
import { cn } from "../../utils/cn";

const sizes = {
  sm: "size-4",
  md: "size-6",
  lg: "size-10",
} as const;

type SpinnerProps = ComponentProps<"svg"> & {
  size?: keyof typeof sizes;
};

const Spinner = ({ size = "md", className, ...props }: SpinnerProps) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      role="status"
      aria-label="Loading"
      className={cn("animate-spin text-zinc-100", sizes[size], className)}
      {...props}
    >
      <circle
        cx="12"
        cy="12"
        r="9"
        stroke="currentColor"
        strokeOpacity="0.2"
        strokeWidth="3"
      />
      <path
        d="M21 12a9 9 0 0 0-9-9"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default Spinner;
