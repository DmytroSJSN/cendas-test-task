import { Loader2 } from "lucide-react";
import type { ComponentProps } from "react";
import { cn } from "../../utils/cn";

const sizes = {
  sm: "size-4",
  md: "size-6",
  lg: "size-10",
} as const;

type SpinnerProps = ComponentProps<typeof Loader2> & {
  size?: keyof typeof sizes;
};

const Spinner = ({ size = "md", className, ...props }: SpinnerProps) => {
  return (
    <Loader2
      role="status"
      aria-label="Loading"
      className={cn("animate-spin text-foreground", sizes[size], className)}
      {...props}
    />
  );
};

export default Spinner;
