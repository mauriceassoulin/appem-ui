"use client";

import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import { cn } from "@/lib/utils";

export interface ToggleProps
  extends React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root> {
  label?: string;
  labelPosition?: "left" | "right";
}

const Toggle = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Root>,
  ToggleProps
>(({ className, label, labelPosition = "right", id, disabled, ...props }, ref) => {
  const generatedId = React.useId();
  const toggleId = id || generatedId;

  const labelEl = label ? (
    <label
      htmlFor={toggleId}
      className={cn(
        "text-sm text-ink-700 cursor-pointer select-none",
        disabled && "opacity-50 cursor-not-allowed"
      )}
    >
      {label}
    </label>
  ) : null;

  return (
    <div className="flex items-center gap-2">
      {labelPosition === "left" && labelEl}
      <SwitchPrimitive.Root
        ref={ref}
        id={toggleId}
        disabled={disabled}
        className={cn(
          "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-200 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed data-[state=checked]:bg-brand-600 data-[state=unchecked]:bg-ink-200",
          className
        )}
        {...props}
      >
        <SwitchPrimitive.Thumb className="pointer-events-none block h-5 w-5 rounded-full bg-white shadow-sm ring-0 transition-transform duration-200 data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0" />
      </SwitchPrimitive.Root>
      {labelPosition === "right" && labelEl}
    </div>
  );
});
Toggle.displayName = "Toggle";

export { Toggle };
