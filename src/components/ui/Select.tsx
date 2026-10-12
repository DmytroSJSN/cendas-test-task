import type { ComponentProps } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "../../utils/cn";

type SelectProps = ComponentProps<"select">;

const Select = ({ className, children, ...props }: SelectProps) => {
  return (
    <div className="relative">
      <select
        className={cn(
          "w-full cursor-pointer appearance-none rounded-lg border border-input bg-background/60 py-2 pr-9 pl-3 text-sm text-foreground outline-none focus:border-ring focus:ring-1 focus:ring-ring aria-invalid:border-destructive [&>option]:bg-card",
          className,
        )}
        {...props}
      >
        {children}
      </select>
      <ChevronDown className="pointer-events-none absolute top-1/2 right-2 size-4 -translate-y-1/2 text-muted-foreground" />
    </div>
  );
};

export default Select;
