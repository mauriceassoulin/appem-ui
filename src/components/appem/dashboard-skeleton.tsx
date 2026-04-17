"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface DashboardSkeletonProps
  extends React.HTMLAttributes<HTMLDivElement> {
  header?: React.ReactNode;
  stats?: React.ReactNode;
  charts?: React.ReactNode;
  tables?: React.ReactNode;
}

const DashboardSkeleton = React.forwardRef<
  HTMLDivElement,
  DashboardSkeletonProps
>(({ header, stats, charts, tables, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("min-h-screen bg-[#fafbfc]", className)}
      {...props}
    >
      {/* Header row */}
      {header && (
        <div className="bg-white border-b border-ink-100 px-6 py-6">
          {header}
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col gap-8">
        {/* Stat cards row */}
        {stats && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats}
          </div>
        )}

        {/* Charts area */}
        {charts && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {charts}
          </div>
        )}

        {/* Tables section */}
        {tables && <div className="flex flex-col gap-6">{tables}</div>}
      </div>
    </div>
  );
});
DashboardSkeleton.displayName = "DashboardSkeleton";

export { DashboardSkeleton };
