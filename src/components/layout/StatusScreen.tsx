import type { ComponentProps } from "react";
import { cn } from "../../utils/cn";

type StatusScreenProps = ComponentProps<"div">;

const StatusScreen = ({ className, children }: StatusScreenProps) => (
  <div
    className={cn(
      "flex min-h-dvh flex-col items-center justify-center gap-3 bg-background px-4 text-foreground",
      className,
    )}
  >
    {children}
  </div>
);

export default StatusScreen;
