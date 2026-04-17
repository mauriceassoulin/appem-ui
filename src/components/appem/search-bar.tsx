"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export interface SearchBarProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "onSubmit"> {
  value?: string;
  onChange?: (value: string) => void;
  onClear?: () => void;
  onSubmit?: (value: string) => void;
  debounceMs?: number;
  loading?: boolean;
}

/* ------------------------------------------------------------------ */
/*  Icons                                                              */
/* ------------------------------------------------------------------ */

const SearchIcon = () => (
  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
  </svg>
);

const SpinnerIcon = () => (
  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
  </svg>
);

const ClearIcon = () => (
  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

const SearchBar = React.forwardRef<HTMLInputElement, SearchBarProps>(
  (
    {
      className,
      value: controlledValue,
      onChange,
      onClear,
      onSubmit,
      placeholder = "Search...",
      debounceMs = 300,
      loading = false,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = React.useState("");
    const value = controlledValue ?? internalValue;
    const debounceRef = React.useRef<ReturnType<typeof setTimeout>>();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const v = e.target.value;
      setInternalValue(v);

      if (debounceMs > 0) {
        clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => onChange?.(v), debounceMs);
      } else {
        onChange?.(v);
      }
    };

    const handleClear = () => {
      setInternalValue("");
      onChange?.("");
      onClear?.();
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Escape") {
        handleClear();
      } else if (e.key === "Enter") {
        clearTimeout(debounceRef.current);
        onSubmit?.(value);
      }
    };

    React.useEffect(() => {
      return () => clearTimeout(debounceRef.current);
    }, []);

    return (
      <div className={cn("relative flex items-center", className)}>
        {/* Left icon */}
        <div className="absolute left-3 text-ink-400 pointer-events-none">
          {loading ? <SpinnerIcon /> : <SearchIcon />}
        </div>

        <input
          ref={ref}
          type="text"
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="w-full border border-ink-200 rounded-lg py-2.5 pl-10 pr-10 text-sm text-ink-950 placeholder:text-ink-400 bg-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-brand-200 focus:border-brand-300"
          {...props}
        />

        {/* Clear button */}
        {value && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 text-ink-400 hover:text-ink-600 transition-colors duration-200"
            aria-label="Clear search"
          >
            <ClearIcon />
          </button>
        )}
      </div>
    );
  }
);
SearchBar.displayName = "SearchBar";

export { SearchBar };
