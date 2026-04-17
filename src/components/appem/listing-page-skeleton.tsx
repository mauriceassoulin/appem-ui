"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface ListingPageSkeletonProps
  extends React.HTMLAttributes<HTMLDivElement> {
  tabs?: React.ReactNode;
  toolbar?: React.ReactNode;
  filters?: React.ReactNode;
  pagination?: React.ReactNode;
  children?: React.ReactNode;
}

const ListingPageSkeleton = React.forwardRef<
  HTMLDivElement,
  ListingPageSkeletonProps
>(({ tabs, toolbar, filters, pagination, children, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("flex flex-col min-h-screen bg-[#fafbfc]", className)}
      {...props}
    >
      {/* Tab navigation */}
      {tabs && <div className="bg-white shrink-0">{tabs}</div>}

      {/* Toolbar row */}
      {toolbar && (
        <div className="bg-white border-b border-ink-100 px-6 py-3 shrink-0">
          {toolbar}
        </div>
      )}

      {/* Main area: filters + content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Filter panel — hidden on mobile via responsive parent */}
        {filters && (
          <aside className="hidden lg:block shrink-0 overflow-y-auto border-r border-ink-100 bg-white">
            {filters}
          </aside>
        )}

        {/* Content area */}
        <main className="flex-1 overflow-x-auto p-6">{children}</main>
      </div>

      {/* Pagination */}
      {pagination && (
        <div className="bg-white border-t border-ink-100 px-6 py-3 shrink-0">
          {pagination}
        </div>
      )}
    </div>
  );
});
ListingPageSkeleton.displayName = "ListingPageSkeleton";

export { ListingPageSkeleton };
