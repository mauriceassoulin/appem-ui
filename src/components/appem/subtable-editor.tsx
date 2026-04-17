"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Badge } from "./badge";

export interface SubtableColumn {
  key: string;
  header: string;
  type?: "text" | "number" | "date" | "select" | "currency";
  width?: number | string;
  editable?: boolean;
  options?: { value: string; label: string }[];
}

export type SubtableRow = Record<string, unknown> & { _id?: string };

export interface SubtableSummary {
  [columnKey: string]: string | number;
}

export interface SubtableEditorProps
  extends React.HTMLAttributes<HTMLDivElement> {
  columns: SubtableColumn[];
  rows: SubtableRow[];
  onRowChange?: (index: number, row: SubtableRow) => void;
  onRowDelete?: (index: number) => void;
  onRowAdd?: (row: SubtableRow) => void;
  readOnly?: boolean;
  title?: string;
  badge?: string;
  summary?: SubtableSummary;
}

function CellEditor({
  column,
  value,
  onChange,
  readOnly,
}: {
  column: SubtableColumn;
  value: unknown;
  onChange: (value: unknown) => void;
  readOnly?: boolean;
}) {
  const [editing, setEditing] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement | HTMLSelectElement>(null);

  React.useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
      if (inputRef.current instanceof HTMLInputElement) {
        inputRef.current.select();
      }
    }
  }, [editing]);

  const isEditable = column.editable !== false && !readOnly;
  const displayValue = value != null ? String(value) : "";

  if (!editing || !isEditable) {
    const formatted =
      column.type === "currency" && value != null
        ? `$${Number(value).toLocaleString("en-US", { minimumFractionDigits: 2 })}`
        : column.type === "select"
          ? column.options?.find((o) => o.value === value)?.label || displayValue
          : displayValue;

    return (
      <div
        className={cn(
          "px-3 py-2 text-sm text-ink-950 min-h-[36px] flex items-center",
          isEditable && "cursor-text hover:bg-brand-50/50"
        )}
        onClick={isEditable ? () => setEditing(true) : undefined}
      >
        {formatted || <span className="text-ink-300">&mdash;</span>}
      </div>
    );
  }

  const handleBlur = () => setEditing(false);
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape" || e.key === "Enter") {
      setEditing(false);
    }
    if (e.key === "Tab") {
      setEditing(false);
    }
  };

  if (column.type === "select") {
    return (
      <select
        ref={inputRef as React.RefObject<HTMLSelectElement>}
        className="w-full px-3 py-2 text-sm border-0 bg-brand-50/50 focus:outline-none focus:ring-1 focus:ring-brand-200"
        value={displayValue}
        onChange={(e) => onChange(e.target.value)}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
      >
        <option value="">—</option>
        {column.options?.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    );
  }

  return (
    <input
      ref={inputRef as React.RefObject<HTMLInputElement>}
      type={column.type === "number" || column.type === "currency" ? "number" : column.type === "date" ? "date" : "text"}
      className="w-full px-3 py-2 text-sm border-0 bg-brand-50/50 focus:outline-none focus:ring-1 focus:ring-brand-200"
      value={displayValue}
      onChange={(e) => {
        const v = column.type === "number" || column.type === "currency"
          ? e.target.value === "" ? "" : Number(e.target.value)
          : e.target.value;
        onChange(v);
      }}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      step={column.type === "currency" ? "0.01" : undefined}
    />
  );
}

const TrashIcon = () => (
  <svg
    className="h-4 w-4"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
    />
  </svg>
);

const SubtableEditor = React.forwardRef<HTMLDivElement, SubtableEditorProps>(
  (
    {
      columns,
      rows,
      onRowChange,
      onRowDelete,
      onRowAdd,
      readOnly,
      title,
      badge,
      summary,
      className,
      ...props
    },
    ref
  ) => {
    const [hoveredRow, setHoveredRow] = React.useState<number | null>(null);

    const handleCellChange = (
      rowIndex: number,
      colKey: string,
      value: unknown
    ) => {
      // If editing the blank row at the bottom, auto-add
      if (rowIndex >= rows.length) {
        onRowAdd?.({ [colKey]: value });
        return;
      }
      const updated = { ...rows[rowIndex], [colKey]: value };
      onRowChange?.(rowIndex, updated);
    };

    // Auto-extend: add one blank row at bottom for data entry
    const displayRows = readOnly ? rows : [...rows, {} as SubtableRow];

    return (
      <div ref={ref} className={cn("w-full", className)} {...props}>
        {title && (
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm font-medium text-ink-700">{title}</span>
            {badge && <Badge size="sm" variant="neutral">{badge}</Badge>}
          </div>
        )}
        <div className="border border-ink-100 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-ink-50">
                  {!readOnly && <th className="w-10" />}
                  {columns.map((col) => (
                    <th
                      key={col.key}
                      className="px-3 py-2.5 text-left text-xs font-medium text-ink-600 uppercase tracking-wider whitespace-nowrap"
                      style={{
                        width: col.width,
                        minWidth: col.width || 120,
                      }}
                    >
                      {col.header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {displayRows.map((row, rowIdx) => {
                  const isBlank = rowIdx >= rows.length;
                  return (
                    <tr
                      key={row._id || rowIdx}
                      className={cn(
                        "border-t border-ink-100 transition-colors",
                        readOnly && "bg-ink-50/50",
                        isBlank && "bg-ink-50/20"
                      )}
                      onMouseEnter={() => setHoveredRow(rowIdx)}
                      onMouseLeave={() => setHoveredRow(null)}
                    >
                      {!readOnly && (
                        <td className="w-10 text-center">
                          {!isBlank && hoveredRow === rowIdx && onRowDelete && (
                            <button
                              onClick={() => onRowDelete(rowIdx)}
                              className="text-red-400 hover:text-red-600 transition-colors p-1"
                              aria-label="Delete row"
                            >
                              <TrashIcon />
                            </button>
                          )}
                        </td>
                      )}
                      {columns.map((col) => (
                        <td key={col.key} className="border-l border-ink-100 first:border-l-0">
                          <CellEditor
                            column={col}
                            value={row[col.key]}
                            onChange={(v) =>
                              handleCellChange(rowIdx, col.key, v)
                            }
                            readOnly={readOnly}
                          />
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
              {summary && (
                <tfoot>
                  <tr className="bg-ink-50 border-t border-ink-200">
                    {!readOnly && <td className="w-10" />}
                    {columns.map((col) => (
                      <td
                        key={col.key}
                        className="px-3 py-2.5 text-sm font-medium text-ink-700 border-l border-ink-100 first:border-l-0"
                      >
                        {summary[col.key] != null ? String(summary[col.key]) : ""}
                      </td>
                    ))}
                  </tr>
                </tfoot>
              )}
            </table>
          </div>
          {readOnly && (
            <div className="px-3 py-1.5 bg-ink-50/50 border-t border-ink-100 text-xs text-ink-400 uppercase tracking-wider">
              Read only
            </div>
          )}
        </div>
      </div>
    );
  }
);
SubtableEditor.displayName = "SubtableEditor";

export { SubtableEditor };
