import * as React from "react";
import { cn } from "@/lib/utils";

export interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical";
  label?: string;
}

const Separator = React.forwardRef<HTMLDivElement, SeparatorProps>(
  ({ className, orientation = "horizontal", label, ...props }, ref) => {
    if (orientation === "vertical") {
      return (
        <div
          ref={ref}
          role="separator"
          aria-orientation="vertical"
          className={cn("inline-block w-px self-stretch bg-ink-100", className)}
          {...props}
        />
      );
    }

    if (label) {
      return (
        <div
          ref={ref}
          role="separator"
          className={cn("flex items-center gap-3 my-4", className)}
          {...props}
        >
          <div className="flex-1 h-px bg-ink-100" />
          <span className="text-sm text-ink-400 bg-white px-3 select-none">
            {label}
          </span>
          <div className="flex-1 h-px bg-ink-100" />
        </div>
      );
    }

    return (
      <div
        ref={ref}
        role="separator"
        aria-orientation="horizontal"
        className={cn("h-px w-full bg-ink-100 my-4", className)}
        {...props}
      />
    );
  }
);
Separator.displayName = "Separator";

export { Separator };
