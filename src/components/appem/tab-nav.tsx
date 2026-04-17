"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Badge } from "./badge";

export interface Tab {
  key: string;
  label: string;
  color?: string;
  icon?: React.ReactNode;
  badge?: number;
}

export interface TabNavProps extends React.HTMLAttributes<HTMLElement> {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (key: string) => void;
}

const TabNav = React.forwardRef<HTMLElement, TabNavProps>(
  ({ tabs, activeTab, onTabChange, className, ...props }, ref) => {
    const tabRefs = React.useRef<Map<string, HTMLButtonElement>>(new Map());

    const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
      let nextIndex: number | null = null;
      if (e.key === "ArrowRight") {
        nextIndex = (index + 1) % tabs.length;
      } else if (e.key === "ArrowLeft") {
        nextIndex = (index - 1 + tabs.length) % tabs.length;
      } else if (e.key === "Home") {
        nextIndex = 0;
      } else if (e.key === "End") {
        nextIndex = tabs.length - 1;
      }

      if (nextIndex !== null) {
        e.preventDefault();
        const nextTab = tabs[nextIndex];
        const el = tabRefs.current.get(nextTab.key);
        el?.focus();
        onTabChange(nextTab.key);
      }
    };

    return (
      <nav
        ref={ref}
        role="tablist"
        className={cn(
          "flex h-12 items-center border-b border-ink-100 overflow-x-auto scrollbar-hide",
          className
        )}
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        {...props}
      >
        {tabs.map((tab, index) => {
          const isActive = tab.key === activeTab;
          const color = tab.color || "rgb(0, 98, 214)"; // brand-600

          return (
            <button
              key={tab.key}
              ref={(el) => {
                if (el) tabRefs.current.set(tab.key, el);
              }}
              role="tab"
              aria-selected={isActive}
              tabIndex={isActive ? 0 : -1}
              onClick={() => onTabChange(tab.key)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className={cn(
                "relative flex items-center gap-2 px-4 h-full whitespace-nowrap text-sm font-body transition-colors duration-200 shrink-0",
                isActive
                  ? "font-medium text-ink-950"
                  : "text-ink-500 hover:text-ink-700 hover:bg-ink-50"
              )}
            >
              {tab.icon && (
                <span className="h-4 w-4 shrink-0">{tab.icon}</span>
              )}
              {tab.label}
              {tab.badge !== undefined && tab.badge > 0 && (
                <Badge size="sm" variant="neutral">
                  {tab.badge}
                </Badge>
              )}
              {isActive && (
                <span
                  className="absolute bottom-0 left-0 right-0 h-0.5"
                  style={{ backgroundColor: color }}
                />
              )}
            </button>
          );
        })}
      </nav>
    );
  }
);
TabNav.displayName = "TabNav";

export { TabNav };
