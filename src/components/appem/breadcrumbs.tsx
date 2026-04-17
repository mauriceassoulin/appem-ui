"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  separator?: "slash" | "chevron";
  maxItems?: number;
  className?: string;
}

/* ------------------------------------------------------------------ */
/*  Icons                                                              */
/* ------------------------------------------------------------------ */

const ChevronSeparator = () => (
  <svg className="h-4 w-4 text-ink-300 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
  </svg>
);

const EllipsisIcon = () => (
  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
  </svg>
);

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

const Breadcrumbs = React.forwardRef<HTMLElement, BreadcrumbsProps>(
  ({ items, separator = "chevron", maxItems, className }, ref) => {
    const [expanded, setExpanded] = React.useState(false);

    const sep =
      separator === "slash" ? (
        <span className="text-ink-300 text-sm">/</span>
      ) : (
        <ChevronSeparator />
      );

    /* Truncation logic */
    let displayItems = items;
    const shouldTruncate = maxItems && maxItems > 2 && items.length > maxItems && !expanded;

    if (shouldTruncate) {
      const head = items.slice(0, 1);
      const tail = items.slice(-(maxItems - 1));
      displayItems = [...head, { label: "..." }, ...tail];
    }

    return (
      <nav ref={ref} className={cn("flex items-center gap-1.5 text-sm font-body", className)} aria-label="Breadcrumb">
        <ol className="flex items-center gap-1.5">
          {displayItems.map((item, i) => {
            const isLast = i === displayItems.length - 1;
            const isEllipsis = item.label === "...";

            return (
              <li key={i} className="flex items-center gap-1.5">
                {i > 0 && sep}
                {isEllipsis ? (
                  <button
                    type="button"
                    onClick={() => setExpanded(true)}
                    className="text-ink-400 hover:text-brand-600 transition-colors duration-200 p-0.5 rounded hover:bg-ink-50"
                    aria-label="Show full path"
                  >
                    <EllipsisIcon />
                  </button>
                ) : isLast ? (
                  <span className="text-ink-950 font-medium" aria-current="page">
                    {item.label}
                  </span>
                ) : item.href ? (
                  <a
                    href={item.href}
                    className="text-ink-400 hover:text-brand-600 transition-colors duration-200"
                  >
                    {item.label}
                  </a>
                ) : (
                  <span className="text-ink-400">{item.label}</span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    );
  }
);
Breadcrumbs.displayName = "Breadcrumbs";

export { Breadcrumbs };
