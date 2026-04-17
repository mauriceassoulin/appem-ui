"use client";

import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { cn } from "@/lib/utils";

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps {
  options: SelectOption[];
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  searchable?: boolean;
  className?: string;
}

const Select = React.forwardRef<HTMLButtonElement, SelectProps>(
  (
    {
      options,
      value,
      onValueChange,
      placeholder = "Select an option...",
      label,
      error,
      disabled,
      required,
      searchable,
      className,
    },
    ref
  ) => {
    const id = React.useId();
    const [search, setSearch] = React.useState("");

    const filtered = searchable
      ? options.filter((o) =>
          o.label.toLowerCase().includes(search.toLowerCase())
        )
      : options;

    return (
      <div className={cn("flex flex-col gap-1.5", className)}>
        {label && (
          <label htmlFor={id} className="text-sm font-medium text-ink-700">
            {label}
            {required && <span className="text-red-500 ml-0.5">*</span>}
          </label>
        )}
        <SelectPrimitive.Root
          value={value}
          onValueChange={onValueChange}
          disabled={disabled}
        >
          <SelectPrimitive.Trigger
            ref={ref}
            id={id}
            className={cn(
              "flex items-center justify-between w-full border border-ink-200 rounded-lg py-2.5 px-3 text-base text-ink-950 bg-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-brand-200 focus:border-brand-300 disabled:bg-ink-50 disabled:text-ink-400 disabled:cursor-not-allowed",
              error && "border-red-400 focus:ring-red-200 focus:border-red-400"
            )}
            aria-invalid={!!error}
          >
            <SelectPrimitive.Value placeholder={placeholder} />
            <SelectPrimitive.Icon>
              <svg
                className="h-4 w-4 text-ink-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            </SelectPrimitive.Icon>
          </SelectPrimitive.Trigger>
          <SelectPrimitive.Portal>
            <SelectPrimitive.Content
              className="overflow-hidden bg-white border border-ink-100 rounded-lg shadow-lg z-50"
              position="popper"
              sideOffset={4}
            >
              {searchable && (
                <div className="p-2 border-b border-ink-100">
                  <input
                    className="w-full py-1.5 px-2 text-sm border border-ink-200 rounded-md focus:outline-none focus:ring-1 focus:ring-brand-200"
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyDown={(e) => e.stopPropagation()}
                  />
                </div>
              )}
              <SelectPrimitive.Viewport className="p-1 max-h-[300px]">
                {filtered.map((option) => (
                  <SelectPrimitive.Item
                    key={option.value}
                    value={option.value}
                    className="relative flex items-center py-2 px-3 pr-8 text-sm text-ink-950 rounded-md cursor-pointer select-none hover:bg-brand-50 focus:bg-brand-50 focus:outline-none data-[state=checked]:bg-brand-50 data-[state=checked]:text-brand-700"
                  >
                    <SelectPrimitive.ItemText>
                      {option.label}
                    </SelectPrimitive.ItemText>
                    <SelectPrimitive.ItemIndicator className="absolute right-2">
                      <svg
                        className="h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.5 12.75l6 6 9-13.5"
                        />
                      </svg>
                    </SelectPrimitive.ItemIndicator>
                  </SelectPrimitive.Item>
                ))}
                {filtered.length === 0 && (
                  <div className="py-2 px-3 text-sm text-ink-400">
                    No results found
                  </div>
                )}
              </SelectPrimitive.Viewport>
            </SelectPrimitive.Content>
          </SelectPrimitive.Portal>
        </SelectPrimitive.Root>
        {error && (
          <p className="text-sm text-red-500">{error}</p>
        )}
      </div>
    );
  }
);
Select.displayName = "Select";

export { Select };
