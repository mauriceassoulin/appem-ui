"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface FormPageSkeletonProps
  extends React.HTMLAttributes<HTMLDivElement> {
  hero?: React.ReactNode;
  editBar?: React.ReactNode;
  sidebar?: React.ReactNode;
  children?: React.ReactNode;
}

const FormPageSkeleton = React.forwardRef<
  HTMLDivElement,
  FormPageSkeletonProps
>(({ hero, editBar, sidebar, children, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("min-h-screen bg-[#fafbfc]", className)}
      {...props}
    >
      {/* Edit mode bar — sticky at top */}
      {editBar}

      {/* Record hero */}
      {hero && <div className="bg-white">{hero}</div>}

      {/* Main content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main form column */}
          <main className="flex-1 min-w-0 flex flex-col gap-6">
            {children}
          </main>

          {/* Sidebar */}
          {sidebar && (
            <aside className="w-full lg:w-80 shrink-0 flex flex-col gap-6">
              {sidebar}
            </aside>
          )}
        </div>
      </div>
    </div>
  );
});
FormPageSkeleton.displayName = "FormPageSkeleton";

export { FormPageSkeleton };
