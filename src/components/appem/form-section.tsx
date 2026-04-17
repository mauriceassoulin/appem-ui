"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface FormSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  collapsible?: boolean;
  defaultOpen?: boolean;
  icon?: React.ReactNode;
}

const ChevronIcon = ({ open }: { open: boolean }) => (
  <svg
    className={cn(
      "h-4 w-4 text-brand-600 transition-transform duration-200",
      open && "rotate-90"
    )}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M8.25 4.5l7.5 7.5-7.5 7.5"
    />
  </svg>
);

const FormSection = React.forwardRef<HTMLDivElement, FormSectionProps>(
  (
    {
      title,
      description,
      collapsible = false,
      defaultOpen = true,
      icon,
      children,
      className,
      ...props
    },
    ref
  ) => {
    const [open, setOpen] = React.useState(defaultOpen);

    return (
      <div ref={ref} className={cn("w-full", className)} {...props}>
        <div
          role={collapsible ? "button" : undefined}
          tabIndex={collapsible ? 0 : undefined}
          aria-expanded={collapsible ? open : undefined}
          onClick={collapsible ? () => setOpen((o) => !o) : undefined}
          onKeyDown={
            collapsible
              ? (e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setOpen((o) => !o);
                  }
                }
              : undefined
          }
          className={cn(
            "bg-brand-50 border-l-4 border-brand-600 px-4 py-3 flex items-center gap-3",
            collapsible && "cursor-pointer select-none hover:bg-brand-100/60"
          )}
        >
          {collapsible && <ChevronIcon open={open} />}
          {icon && <span className="h-5 w-5 text-brand-700 shrink-0">{icon}</span>}
          <div className="flex-1 min-w-0">
            <h3 className="font-display text-lg text-brand-900">{title}</h3>
            {description && (
              <p className="text-sm text-ink-500 mt-1">{description}</p>
            )}
          </div>
        </div>
        {(!collapsible || open) && (
          <div className="py-6 px-4">{children}</div>
        )}
      </div>
    );
  }
);
FormSection.displayName = "FormSection";

export { FormSection };
