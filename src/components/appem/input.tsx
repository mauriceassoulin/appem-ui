"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const inputSizeVariants = cva(
  "w-full border border-ink-200 rounded-lg text-ink-950 placeholder:text-ink-400 bg-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-brand-200 focus:border-brand-300 disabled:bg-ink-50 disabled:text-ink-400 disabled:cursor-not-allowed",
  {
    variants: {
      inputSize: {
        sm: "py-1.5 px-3 text-sm",
        md: "py-2.5 px-3 text-base",
        lg: "py-3 px-3 text-lg",
      },
    },
    defaultVariants: {
      inputSize: "md",
    },
  }
);

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputSizeVariants> {
  label?: string;
  error?: string;
  required?: boolean;
  leadingAddon?: React.ReactNode;
  trailingAddon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      inputSize,
      label,
      error,
      required,
      leadingAddon,
      trailingAddon,
      id,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId();
    const inputId = id || generatedId;

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-ink-700"
          >
            {label}
            {required && <span className="text-red-500 ml-0.5">*</span>}
          </label>
        )}
        <div className="relative flex items-center">
          {leadingAddon && (
            <div className="absolute left-3 text-ink-400 pointer-events-none">
              {leadingAddon}
            </div>
          )}
          <input
            id={inputId}
            ref={ref}
            className={cn(
              inputSizeVariants({ inputSize }),
              error && "border-red-400 focus:ring-red-200 focus:border-red-400",
              leadingAddon && "pl-10",
              trailingAddon && "pr-10",
              className
            )}
            aria-invalid={!!error}
            aria-describedby={error ? `${inputId}-error` : undefined}
            {...props}
          />
          {trailingAddon && (
            <div className="absolute right-3 text-ink-400 pointer-events-none">
              {trailingAddon}
            </div>
          )}
        </div>
        {error && (
          <p id={`${inputId}-error`} className="text-sm text-red-500">
            {error}
          </p>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input, inputSizeVariants };
