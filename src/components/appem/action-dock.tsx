"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface DockAction {
  key: string;
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}

export interface ActionDockProps extends React.HTMLAttributes<HTMLDivElement> {
  actions: DockAction[];
  expandable?: boolean;
  position?: "bottom-right" | "bottom-left";
}

const ActionDock = React.forwardRef<HTMLDivElement, ActionDockProps>(
  (
    {
      actions,
      expandable = true,
      position = "bottom-right",
      className,
      ...props
    },
    ref
  ) => {
    const [expanded, setExpanded] = React.useState(!expandable);

    const positionClasses =
      position === "bottom-left" ? "bottom-6 left-6" : "bottom-6 right-6";

    return (
      <div
        ref={ref}
        className={cn("fixed z-40", positionClasses, className)}
        {...props}
      >
        {/* Expanded panel */}
        {expanded && actions.length > 0 && (
          <div className="mb-3 bg-white rounded-2xl shadow-2xl border border-ink-100 overflow-hidden animate-in zoom-in-95 fade-in duration-200">
            {actions.map((action) => (
              <button
                key={action.key}
                onClick={action.onClick}
                className="flex items-center gap-3 w-full px-4 py-3 text-sm text-ink-700 hover:bg-brand-50 transition-colors"
              >
                <span className="h-5 w-5 shrink-0">{action.icon}</span>
                {action.label}
              </button>
            ))}
          </div>
        )}

        {/* FAB toggle */}
        {expandable && (
          <button
            onClick={() => setExpanded((e) => !e)}
            className="ml-auto flex items-center justify-center h-12 w-12 rounded-full bg-gradient-to-br from-brand-900 to-brand-600 text-white shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
            aria-label={expanded ? "Close actions" : "Open actions"}
          >
            <svg
              className={cn(
                "h-5 w-5 transition-transform duration-200",
                expanded && "rotate-45"
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
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </button>
        )}
      </div>
    );
  }
);
ActionDock.displayName = "ActionDock";

export { ActionDock };
