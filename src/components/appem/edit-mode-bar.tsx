"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "./button";

export interface EditModeBarProps extends React.HTMLAttributes<HTMLDivElement> {
  onSave: () => void;
  onCancel: () => void;
  saving?: boolean;
  lastSaved?: Date;
  dirty?: boolean;
}

function formatTimeAgo(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  return `${hours}h ago`;
}

const EditModeBar = React.forwardRef<HTMLDivElement, EditModeBarProps>(
  ({ onSave, onCancel, saving, lastSaved, dirty, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "sticky top-0 z-30 flex items-center justify-between h-12 px-6 bg-white border-b border-ink-100 shadow-sm animate-in slide-in-from-top duration-200",
          className
        )}
        {...props}
      >
        <div className="flex items-center gap-3">
          <span className="text-sm text-ink-500">Editing</span>
          {lastSaved && (
            <span className="text-xs font-mono text-ink-400">
              Auto-saved {formatTimeAgo(lastSaved)}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={onCancel} disabled={saving}>
            Cancel
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={onSave}
            disabled={!dirty}
            loading={saving}
          >
            Save
          </Button>
        </div>
      </div>
    );
  }
);
EditModeBar.displayName = "EditModeBar";

export { EditModeBar };
