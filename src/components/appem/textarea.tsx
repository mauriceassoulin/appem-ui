"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const textareaSizeVariants = cva(
  "w-full border border-ink-200 rounded-lg text-ink-950 placeholder:text-ink-400 bg-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-brand-200 focus:border-brand-300 disabled:bg-ink-50 disabled:text-ink-400 disabled:cursor-not-allowed resize-vertical",
  {
    variants: {
      textareaSize: {
        sm: "py-1.5 px-3 text-sm",
        md: "py-2.5 px-3 text-base",
        lg: "py-3 px-3 text-lg",
      },
    },
    defaultVariants: {
      textareaSize: "md",
    },
  }
);

export interface TextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "size">,
    VariantProps<typeof textareaSizeVariants> {
  label?: string;
  error?: string;
  required?: boolean;
  maxLength?: number;
  autoResize?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      textareaSize,
      label,
      error,
      required,
      maxLength,
      autoResize,
      id,
      rows = 4,
      onChange,
      value,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId();
    const textareaId = id || generatedId;
    const internalRef = React.useRef<HTMLTextAreaElement | null>(null);
    const [charCount, setCharCount] = React.useState(0);

    const setRefs = React.useCallback(
      (node: HTMLTextAreaElement | null) => {
        internalRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) ref.current = node;
      },
      [ref]
    );

    const handleAutoResize = React.useCallback(() => {
      const el = internalRef.current;
      if (el && autoResize) {
        el.style.height = "auto";
        el.style.height = `${el.scrollHeight}px`;
      }
    }, [autoResize]);

    const handleChange = React.useCallback(
      (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setCharCount(e.target.value.length);
        handleAutoResize();
        onChange?.(e);
      },
      [onChange, handleAutoResize]
    );

    React.useEffect(() => {
      if (value !== undefined) {
        setCharCount(String(value).length);
      }
      handleAutoResize();
    }, [value, handleAutoResize]);

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={textareaId}
            className="text-sm font-medium text-ink-700"
          >
            {label}
            {required && <span className="text-red-500 ml-0.5">*</span>}
          </label>
        )}
        <textarea
          id={textareaId}
          ref={setRefs}
          rows={rows}
          maxLength={maxLength}
          value={value}
          onChange={handleChange}
          className={cn(
            textareaSizeVariants({ textareaSize }),
            autoResize && "resize-none overflow-hidden",
            error && "border-red-400 focus:ring-red-200 focus:border-red-400",
            className
          )}
          aria-invalid={!!error}
          aria-describedby={error ? `${textareaId}-error` : undefined}
          {...props}
        />
        <div className="flex justify-between">
          {error ? (
            <p id={`${textareaId}-error`} className="text-sm text-red-500">
              {error}
            </p>
          ) : (
            <span />
          )}
          {maxLength !== undefined && (
            <span className="text-xs text-ink-400">
              {charCount}/{maxLength}
            </span>
          )}
        </div>
      </div>
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea, textareaSizeVariants };
