"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Input } from "./input";
import { Select } from "./select";
import { Checkbox } from "./checkbox";
import { Toggle } from "./toggle";
import { Badge } from "./badge";

export interface FilterDefinition {
  key: string;
  label: string;
  type: "text" | "select" | "multiselect" | "dateRange" | "toggle";
  options?: { value: string; label: string }[];
}

export interface SavedView {
  key: string;
  label: string;
}

export type ActiveFilters = Record<string, unknown>;

export interface FilterPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  filters: FilterDefinition[];
  activeFilters: ActiveFilters;
  onFilterChange: (key: string, value: unknown) => void;
  collapsible?: boolean;
  savedViews?: SavedView[];
  onSavedViewSelect?: (key: string) => void;
  onClearAll?: () => void;
}

const ChevronIcon = ({ open }: { open: boolean }) => (
  <svg
    className={cn(
      "h-4 w-4 text-ink-400 transition-transform duration-200",
      open && "rotate-90"
    )}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
  </svg>
);

function FilterSection({
  filter,
  value,
  onChange,
  collapsible,
}: {
  filter: FilterDefinition;
  value: unknown;
  onChange: (value: unknown) => void;
  collapsible?: boolean;
}) {
  const [open, setOpen] = React.useState(true);
  const hasValue = value !== undefined && value !== null && value !== "" &&
    !(Array.isArray(value) && value.length === 0);

  return (
    <div className="border-b border-ink-100 last:border-b-0">
      <button
        type="button"
        onClick={collapsible ? () => setOpen((o) => !o) : undefined}
        className={cn(
          "flex items-center justify-between w-full py-3 px-4 text-sm font-medium text-ink-700",
          collapsible && "cursor-pointer hover:bg-ink-50"
        )}
      >
        <span className="flex items-center gap-2">
          {filter.label}
          {hasValue && (
            <Badge size="sm" variant="brand">1</Badge>
          )}
        </span>
        {collapsible && <ChevronIcon open={open} />}
      </button>
      {(!collapsible || open) && (
        <div className="px-4 pb-3">
          <FilterInput filter={filter} value={value} onChange={onChange} />
        </div>
      )}
    </div>
  );
}

function FilterInput({
  filter,
  value,
  onChange,
}: {
  filter: FilterDefinition;
  value: unknown;
  onChange: (value: unknown) => void;
}) {
  switch (filter.type) {
    case "text":
      return (
        <Input
          inputSize="sm"
          placeholder={`Search ${filter.label.toLowerCase()}...`}
          value={(value as string) || ""}
          onChange={(e) => onChange(e.target.value)}
        />
      );

    case "select":
      return (
        <Select
          options={filter.options || []}
          value={(value as string) || ""}
          onValueChange={onChange}
          placeholder={`Select ${filter.label.toLowerCase()}`}
        />
      );

    case "multiselect":
      return (
        <div className="flex flex-col gap-2">
          {(filter.options || []).map((opt) => {
            const selected = Array.isArray(value) ? value : [];
            return (
              <Checkbox
                key={opt.value}
                label={opt.label}
                checked={selected.includes(opt.value)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    onChange([...selected, opt.value]);
                  } else {
                    onChange(selected.filter((v: string) => v !== opt.value));
                  }
                }}
              />
            );
          })}
        </div>
      );

    case "dateRange":
      const range = (value as { from?: string; to?: string }) || {};
      return (
        <div className="flex flex-col gap-2">
          <Input
            inputSize="sm"
            type="date"
            placeholder="From"
            value={range.from || ""}
            onChange={(e) => onChange({ ...range, from: e.target.value })}
          />
          <Input
            inputSize="sm"
            type="date"
            placeholder="To"
            value={range.to || ""}
            onChange={(e) => onChange({ ...range, to: e.target.value })}
          />
        </div>
      );

    case "toggle":
      return (
        <Toggle
          checked={!!value}
          onCheckedChange={onChange}
          label={filter.label}
        />
      );

    default:
      return null;
  }
}

const FilterPanel = React.forwardRef<HTMLDivElement, FilterPanelProps>(
  (
    {
      filters,
      activeFilters,
      onFilterChange,
      collapsible = true,
      savedViews,
      onSavedViewSelect,
      onClearAll,
      className,
      ...props
    },
    ref
  ) => {
    const activeCount = Object.values(activeFilters).filter(
      (v) => v !== undefined && v !== null && v !== "" && !(Array.isArray(v) && v.length === 0)
    ).length;

    return (
      <div
        ref={ref}
        className={cn(
          "w-64 bg-white border-r border-ink-100 shrink-0 overflow-y-auto",
          className
        )}
        {...props}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-ink-100">
          <span className="text-sm font-medium text-ink-700">
            Filters
            {activeCount > 0 && (
              <Badge size="sm" variant="brand" className="ml-2">{activeCount}</Badge>
            )}
          </span>
          {onClearAll && activeCount > 0 && (
            <button
              onClick={onClearAll}
              className="text-xs text-brand-700 hover:underline"
            >
              Clear all
            </button>
          )}
        </div>

        {/* Saved views */}
        {savedViews && savedViews.length > 0 && (
          <div className="px-4 py-3 border-b border-ink-100">
            <p className="text-xs font-medium text-ink-500 uppercase tracking-wider mb-2">
              Saved Views
            </p>
            <div className="flex flex-col gap-1">
              {savedViews.map((view) => (
                <button
                  key={view.key}
                  onClick={() => onSavedViewSelect?.(view.key)}
                  className="text-left text-sm text-ink-700 hover:text-brand-700 hover:bg-brand-50 px-2 py-1.5 rounded-md transition-colors"
                >
                  {view.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Filter sections */}
        {filters.map((filter) => (
          <FilterSection
            key={filter.key}
            filter={filter}
            value={activeFilters[filter.key]}
            onChange={(v) => onFilterChange(filter.key, v)}
            collapsible={collapsible}
          />
        ))}
      </div>
    );
  }
);
FilterPanel.displayName = "FilterPanel";

export { FilterPanel };
