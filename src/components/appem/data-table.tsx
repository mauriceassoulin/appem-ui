"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Checkbox } from "./checkbox";
import { Skeleton } from "./skeleton";
import { Tooltip } from "./tooltip";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export interface DataTableColumn<T> {
  key: string;
  header: string;
  width?: string | number;
  sortable?: boolean;
  sticky?: boolean;
  render?: (value: unknown, row: T, index: number) => React.ReactNode;
}

export interface DataTableProps<T> {
  columns: DataTableColumn<T>[];
  data: T[];
  loading?: boolean;
  emptyMessage?: string;
  selectable?: boolean;
  selectedRows?: Set<number>;
  onSelectionChange?: (selected: Set<number>) => void;
  sortKey?: string;
  sortDirection?: "asc" | "desc";
  onSort?: (key: string, direction: "asc" | "desc") => void;
  stickyFirstColumn?: boolean;
  className?: string;
}

/* ------------------------------------------------------------------ */
/*  Icons                                                              */
/* ------------------------------------------------------------------ */

const SortIcon = ({ direction, active }: { direction?: "asc" | "desc"; active?: boolean }) => (
  <span className={cn("inline-flex flex-col ml-1", active ? "text-brand-700" : "text-ink-300")}>
    <svg className={cn("h-3 w-3 -mb-0.5", active && direction === "asc" ? "text-brand-700" : "")} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
    </svg>
    <svg className={cn("h-3 w-3 -mt-0.5", active && direction === "desc" ? "text-brand-700" : "")} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  </span>
);

const EmptyIcon = () => (
  <svg className="h-12 w-12 text-ink-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
  </svg>
);

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

function DataTableInner<T extends Record<string, unknown>>(
  {
    columns,
    data,
    loading = false,
    emptyMessage = "No data available",
    selectable = false,
    selectedRows,
    onSelectionChange,
    sortKey,
    sortDirection = "asc",
    onSort,
    stickyFirstColumn = false,
    className,
  }: DataTableProps<T>,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  const [internalSelected, setInternalSelected] = React.useState<Set<number>>(new Set());
  const selected = selectedRows ?? internalSelected;
  const setSelected = onSelectionChange ?? setInternalSelected;

  const allSelected = data.length > 0 && selected.size === data.length;
  const someSelected = selected.size > 0 && selected.size < data.length;

  const toggleAll = () => {
    if (allSelected) {
      setSelected(new Set());
    } else {
      setSelected(new Set(data.map((_, i) => i)));
    }
  };

  const toggleRow = (index: number) => {
    const next = new Set(selected);
    if (next.has(index)) next.delete(index);
    else next.add(index);
    setSelected(next);
  };

  const handleSort = (key: string) => {
    if (!onSort) return;
    const newDir = sortKey === key && sortDirection === "asc" ? "desc" : "asc";
    onSort(key, newDir);
  };

  /* Loading skeleton rows */
  if (loading) {
    return (
      <div ref={ref} className={cn("border border-ink-100 rounded-xl overflow-hidden bg-white", className)}>
        <table className="w-full">
          <thead>
            <tr className="bg-ink-50">
              {selectable && <th className="w-12 px-4 py-3" />}
              {columns.map((col) => (
                <th key={col.key} className="px-4 py-3 text-left">
                  <Skeleton variant="rectangle" width={80} height={12} />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 5 }).map((_, i) => (
              <tr key={i} className="border-t border-ink-100">
                {selectable && <td className="px-4 py-3"><Skeleton variant="rectangle" width={18} height={18} /></td>}
                {columns.map((col) => (
                  <td key={col.key} className="px-4 py-3">
                    <Skeleton variant="rectangle" width="80%" height={14} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  /* Empty state */
  if (data.length === 0) {
    return (
      <div ref={ref} className={cn("border border-ink-100 rounded-xl overflow-hidden bg-white", className)}>
        <table className="w-full">
          <thead>
            <tr className="bg-ink-50">
              {selectable && <th className="w-12 px-4 py-3" />}
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-ink-600"
                  style={col.width ? { width: col.width } : undefined}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
        </table>
        <div className="flex flex-col items-center justify-center py-16 gap-3">
          <EmptyIcon />
          <p className="text-sm text-ink-400">{emptyMessage}</p>
        </div>
      </div>
    );
  }

  /* Data table */
  return (
    <div ref={ref} className={cn("border border-ink-100 rounded-xl overflow-hidden bg-white", className)}>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="sticky top-0 z-10">
            <tr className="bg-ink-50">
              {selectable && (
                <th className="w-12 px-4 py-3">
                  <Checkbox
                    checked={allSelected}
                    indeterminate={someSelected}
                    onCheckedChange={toggleAll}
                  />
                </th>
              )}
              {columns.map((col, ci) => (
                <th
                  key={col.key}
                  className={cn(
                    "px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-ink-600 select-none",
                    col.sortable && "cursor-pointer hover:text-brand-700",
                    stickyFirstColumn && ci === 0 && "sticky left-0 z-20 bg-ink-50"
                  )}
                  style={col.width ? { width: col.width } : undefined}
                  onClick={col.sortable ? () => handleSort(col.key) : undefined}
                >
                  <span className="inline-flex items-center">
                    {col.header}
                    {col.sortable && (
                      <SortIcon
                        direction={sortKey === col.key ? sortDirection : undefined}
                        active={sortKey === col.key}
                      />
                    )}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIdx) => {
              const isSelected = selected.has(rowIdx);
              return (
                <tr
                  key={rowIdx}
                  className={cn(
                    "border-t border-ink-100 transition-colors duration-150",
                    isSelected
                      ? "bg-brand-50 border-l-2 border-l-brand-600"
                      : "hover:bg-brand-50/50"
                  )}
                >
                  {selectable && (
                    <td className="px-4 py-3">
                      <Checkbox
                        checked={isSelected}
                        onCheckedChange={() => toggleRow(rowIdx)}
                      />
                    </td>
                  )}
                  {columns.map((col, ci) => {
                    const value = row[col.key];
                    const rendered = col.render
                      ? col.render(value, row, rowIdx)
                      : String(value ?? "");
                    return (
                      <td
                        key={col.key}
                        className={cn(
                          "px-4 py-3 text-sm text-ink-700",
                          stickyFirstColumn && ci === 0 && "sticky left-0 z-10 bg-white",
                          isSelected && stickyFirstColumn && ci === 0 && "bg-brand-50"
                        )}
                        style={col.width ? { width: col.width, maxWidth: col.width } : undefined}
                      >
                        {typeof rendered === "string" ? (
                          <Tooltip content={rendered}>
                            <span className="block truncate">{rendered}</span>
                          </Tooltip>
                        ) : (
                          rendered
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const DataTable = React.forwardRef(DataTableInner) as <T extends Record<string, unknown>>(
  props: DataTableProps<T> & { ref?: React.ForwardedRef<HTMLDivElement> }
) => React.ReactElement;

export { DataTable };
