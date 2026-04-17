"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

const paginationSizeVariants = cva("", {
  variants: {
    size: {
      sm: "h-8 min-w-8 text-xs px-2",
      md: "h-10 min-w-10 text-sm px-3",
    },
  },
  defaultVariants: { size: "md" },
});

export interface PaginationProps extends VariantProps<typeof paginationSizeVariants> {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  siblingsCount?: number;
  className?: string;
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function getPageRange(current: number, total: number, siblings: number): (number | "ellipsis")[] {
  const totalNumbers = siblings * 2 + 3; // siblings + current + first + last
  const totalBlocks = totalNumbers + 2; // + 2 ellipsis slots

  if (total <= totalBlocks) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const leftSibIdx = Math.max(current - siblings, 2);
  const rightSibIdx = Math.min(current + siblings, total - 1);

  const showLeftEllipsis = leftSibIdx > 2;
  const showRightEllipsis = rightSibIdx < total - 1;

  const items: (number | "ellipsis")[] = [1];

  if (showLeftEllipsis) {
    items.push("ellipsis");
  } else {
    for (let i = 2; i < leftSibIdx; i++) items.push(i);
  }

  for (let i = leftSibIdx; i <= rightSibIdx; i++) items.push(i);

  if (showRightEllipsis) {
    items.push("ellipsis");
  } else {
    for (let i = rightSibIdx + 1; i < total; i++) items.push(i);
  }

  items.push(total);
  return items;
}

/* ------------------------------------------------------------------ */
/*  Icons                                                              */
/* ------------------------------------------------------------------ */

const ChevronLeft = () => (
  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
  </svg>
);

const ChevronRight = () => (
  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
  </svg>
);

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

const Pagination = React.forwardRef<HTMLElement, PaginationProps>(
  ({ currentPage, totalPages, onPageChange, siblingsCount = 1, size, className }, ref) => {
    if (totalPages <= 1) return null;

    const pages = getPageRange(currentPage, totalPages, siblingsCount);

    const btnBase = cn(
      "inline-flex items-center justify-center rounded-lg font-medium font-body transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-200",
      paginationSizeVariants({ size })
    );

    return (
      <nav
        ref={ref}
        className={cn("flex items-center gap-2", className)}
        aria-label="Pagination"
      >
        {/* Previous */}
        <button
          type="button"
          className={cn(btnBase, currentPage === 1 ? "opacity-50 cursor-not-allowed text-ink-400" : "text-ink-600 hover:bg-ink-50")}
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          aria-label="Previous page"
        >
          <ChevronLeft />
        </button>

        {/* Page numbers */}
        {pages.map((page, i) =>
          page === "ellipsis" ? (
            <span key={`ellipsis-${i}`} className={cn("inline-flex items-center justify-center text-ink-400", paginationSizeVariants({ size }))}>
              &hellip;
            </span>
          ) : (
            <button
              key={page}
              type="button"
              className={cn(
                btnBase,
                page === currentPage
                  ? "bg-brand-600 text-white shadow-sm"
                  : "text-ink-600 hover:bg-ink-50"
              )}
              onClick={() => onPageChange(page)}
              aria-current={page === currentPage ? "page" : undefined}
            >
              {page}
            </button>
          )
        )}

        {/* Next */}
        <button
          type="button"
          className={cn(btnBase, currentPage === totalPages ? "opacity-50 cursor-not-allowed text-ink-400" : "text-ink-600 hover:bg-ink-50")}
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          aria-label="Next page"
        >
          <ChevronRight />
        </button>

        {/* Page info */}
        <span className={cn("ml-2 text-ink-400", size === "sm" ? "text-xs" : "text-sm")}>
          Page {currentPage} of {totalPages}
        </span>
      </nav>
    );
  }
);
Pagination.displayName = "Pagination";

export { Pagination, paginationSizeVariants };
export type { PaginationProps as PaginationComponentProps };
