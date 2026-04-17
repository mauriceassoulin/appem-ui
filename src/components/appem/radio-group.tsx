"use client";

import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { cn } from "@/lib/utils";

export interface RadioOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface RadioGroupProps
  extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root> {
  options: RadioOption[];
  layout?: "vertical" | "horizontal";
  label?: string;
}

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  RadioGroupProps
>(({ className, options, layout = "vertical", label, ...props }, ref) => {
  const groupId = React.useId();

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <span className="text-sm font-medium text-ink-700">{label}</span>
      )}
      <RadioGroupPrimitive.Root
        ref={ref}
        className={cn(
          "flex gap-3",
          layout === "vertical" ? "flex-col" : "flex-row flex-wrap",
          className
        )}
        {...props}
      >
        {options.map((option) => {
          const itemId = `${groupId}-${option.value}`;
          return (
            <div key={option.value} className="flex items-center gap-2">
              <RadioGroupPrimitive.Item
                id={itemId}
                value={option.value}
                disabled={option.disabled}
                className="peer h-[18px] w-[18px] shrink-0 rounded-full border border-ink-300 bg-white transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-200 disabled:opacity-50 disabled:cursor-not-allowed data-[state=checked]:border-brand-600"
              >
                <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
                  <div className="h-[10px] w-[10px] rounded-full bg-brand-600" />
                </RadioGroupPrimitive.Indicator>
              </RadioGroupPrimitive.Item>
              <label
                htmlFor={itemId}
                className={cn(
                  "text-sm text-ink-700 cursor-pointer select-none",
                  option.disabled && "opacity-50 cursor-not-allowed"
                )}
              >
                {option.label}
              </label>
            </div>
          );
        })}
      </RadioGroupPrimitive.Root>
    </div>
  );
});
RadioGroup.displayName = "RadioGroup";

export { RadioGroup };
