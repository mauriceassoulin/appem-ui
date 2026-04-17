"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Input } from "./input";
import { Textarea } from "./textarea";
import { Select } from "./select";
import { Checkbox } from "./checkbox";
import { RadioGroup } from "./radio-group";
import { Tag } from "./tag";
import { Badge } from "./badge";
import { Button } from "./button";

/* ================================================================== */
/*  Types                                                              */
/* ================================================================== */

export type RagicFieldType =
  | "text"
  | "number"
  | "date"
  | "email"
  | "phone"
  | "url"
  | "currency"
  | "percentage"
  | "textarea"
  | "select"
  | "multi-select"
  | "checkbox"
  | "radio"
  | "date-range"
  | "file-upload"
  | "image"
  | "barcode"
  | "auto-generated"
  | "formula"
  | "aggregate"
  | "select-from-sheet"
  | "masked-text"
  | "reviewer"
  | "markdown"
  | "id-number"
  | "action-barcode"
  | "exchange-rate"
  | "rich-text";

export interface FieldOption {
  value: string;
  label: string;
}

export interface FormFieldConfig {
  currencySymbol?: string;
  maskPattern?: string;
  accept?: string;
  maxFiles?: number;
  linkedSheet?: string;
  baseCurrency?: string;
  targetCurrency?: string;
  exchangeRate?: number;
}

export interface FormFieldRendererProps {
  fieldType: RagicFieldType;
  value: unknown;
  onChange?: (value: unknown) => void;
  label?: string;
  required?: boolean;
  error?: string;
  disabled?: boolean;
  readOnly?: boolean;
  options?: FieldOption[];
  config?: FormFieldConfig;
  className?: string;
}

/* ================================================================== */
/*  Icons (inline SVGs, following project convention)                   */
/* ================================================================== */

const LockIcon = () => (
  <svg className="h-4 w-4 text-ink-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
  </svg>
);

const LinkIcon = () => (
  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
  </svg>
);

const CalculatorIcon = () => (
  <svg className="h-4 w-4 text-ink-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25v-.008zm2.498-6.75h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007v-.008zm2.504-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008v-.008zm2.498-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008v-.008zM8.25 6h7.5v2.25h-7.5V6zM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.65 4.5 4.757V19.5a2.25 2.25 0 002.25 2.25h10.5a2.25 2.25 0 002.25-2.25V4.757c0-1.108-.806-2.057-1.907-2.185A48.507 48.507 0 0012 2.25z" />
  </svg>
);

const BarcodeIcon = () => (
  <svg className="h-4 w-4 text-ink-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 013.75 9.375v-4.5zM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5zM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0113.5 9.375v-4.5z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 6.75h.75v.75h-.75v-.75zM6.75 16.5h.75v.75h-.75v-.75zM16.5 6.75h.75v.75h-.75v-.75zM13.5 13.5h.75v.75h-.75v-.75zM13.5 19.5h.75v.75h-.75v-.75zM19.5 13.5h.75v.75h-.75v-.75zM19.5 19.5h.75v.75h-.75v-.75zM16.5 16.5h.75v.75h-.75v-.75z" />
  </svg>
);

const UploadIcon = () => (
  <svg className="h-8 w-8 text-ink-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
  </svg>
);

const ImageIcon = () => (
  <svg className="h-8 w-8 text-ink-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5a2.25 2.25 0 002.25-2.25V5.25a2.25 2.25 0 00-2.25-2.25H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
  </svg>
);

const HashIcon = () => (
  <svg className="h-4 w-4 text-ink-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5l-3.6 19.5m-2.4-19.5l-3.6 19.5" />
  </svg>
);

const ExchangeIcon = () => (
  <svg className="h-4 w-4 text-ink-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
  </svg>
);

/* ================================================================== */
/*  Shared wrappers                                                    */
/* ================================================================== */

interface FieldWrapperProps {
  label?: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
  className?: string;
}

const FieldWrapper: React.FC<FieldWrapperProps> = ({ label, required, error, children, className }) => (
  <div className={cn("flex flex-col gap-1.5", className)}>
    {label && (
      <label className="text-sm font-medium text-ink-700">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
    )}
    {children}
    {error && <p className="text-sm text-red-500">{error}</p>}
  </div>
);

/** Read-only display with optional icon */
const ReadOnlyDisplay: React.FC<{
  value: unknown;
  icon?: React.ReactNode;
  mono?: boolean;
  label?: string;
  required?: boolean;
  error?: string;
  className?: string;
}> = ({ value, icon, mono, label, required, error, className }) => (
  <FieldWrapper label={label} required={required} error={error} className={className}>
    <div className="flex items-center gap-2 bg-ink-50 border border-ink-100 rounded-lg px-3 py-2.5 text-sm text-ink-700">
      {icon}
      <span className={cn("flex-1", mono && "font-mono")}>{String(value ?? "")}</span>
    </div>
  </FieldWrapper>
);

/* ================================================================== */
/*  Individual field type renderers                                    */
/* ================================================================== */

/* 1. Text */
const TextField: React.FC<FormFieldRendererProps> = ({ value, onChange, label, required, error, disabled, readOnly, className }) => {
  if (readOnly) return <ReadOnlyDisplay value={value} icon={<LockIcon />} label={label} required={required} error={error} className={className} />;
  return <Input label={label} required={required} error={error} disabled={disabled} value={String(value ?? "")} onChange={(e) => onChange?.(e.target.value)} className={className} />;
};

/* 2. Number */
const NumberField: React.FC<FormFieldRendererProps> = ({ value, onChange, label, required, error, disabled, readOnly, className }) => {
  if (readOnly) return <ReadOnlyDisplay value={value != null ? Number(value).toLocaleString() : ""} icon={<LockIcon />} mono label={label} required={required} error={error} className={className} />;
  return <Input type="number" label={label} required={required} error={error} disabled={disabled} value={String(value ?? "")} onChange={(e) => onChange?.(e.target.valueAsNumber || e.target.value)} className={cn("font-mono", className)} />;
};

/* 3. Date */
const DateField: React.FC<FormFieldRendererProps> = ({ value, onChange, label, required, error, disabled, readOnly, className }) => {
  if (readOnly) return <ReadOnlyDisplay value={value} icon={<LockIcon />} label={label} required={required} error={error} className={className} />;
  return <Input type="date" label={label} required={required} error={error} disabled={disabled} value={String(value ?? "")} onChange={(e) => onChange?.(e.target.value)} className={className} />;
};

/* 4. Email */
const EmailField: React.FC<FormFieldRendererProps> = ({ value, onChange, label, required, error, disabled, readOnly, className }) => {
  if (readOnly) return <ReadOnlyDisplay value={value} icon={<LockIcon />} label={label} required={required} error={error} className={className} />;
  return (
    <Input
      type="email"
      label={label}
      required={required}
      error={error}
      disabled={disabled}
      value={String(value ?? "")}
      onChange={(e) => onChange?.(e.target.value)}
      trailingAddon={
        value && typeof value === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? (
          <svg className="h-4 w-4 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        ) : undefined
      }
      className={className}
    />
  );
};

/* 5. Phone */
const PhoneField: React.FC<FormFieldRendererProps> = ({ value, onChange, label, required, error, disabled, readOnly, className }) => {
  if (readOnly) return <ReadOnlyDisplay value={value} icon={<LockIcon />} label={label} required={required} error={error} className={className} />;
  return <Input type="tel" label={label} required={required} error={error} disabled={disabled} value={String(value ?? "")} onChange={(e) => onChange?.(e.target.value)} className={className} />;
};

/* 6. URL */
const URLField: React.FC<FormFieldRendererProps> = ({ value, onChange, label, required, error, disabled, readOnly, className }) => {
  if (readOnly) {
    return (
      <FieldWrapper label={label} required={required} error={error} className={className}>
        <div className="flex items-center gap-2 bg-ink-50 border border-ink-100 rounded-lg px-3 py-2.5 text-sm">
          <span className="flex-1 text-brand-700 truncate">{String(value ?? "")}</span>
          {value != null && String(value) !== "" && (
            <a href={String(value)} target="_blank" rel="noopener noreferrer" className="text-brand-700 hover:text-brand-500 shrink-0">
              <LinkIcon />
            </a>
          )}
        </div>
      </FieldWrapper>
    );
  }
  return (
    <Input
      type="url"
      label={label}
      required={required}
      error={error}
      disabled={disabled}
      value={String(value ?? "")}
      onChange={(e) => onChange?.(e.target.value)}
      trailingAddon={value ? <a href={String(value)} target="_blank" rel="noopener noreferrer" className="pointer-events-auto"><LinkIcon /></a> : undefined}
      className={className}
    />
  );
};

/* 7. Currency */
const CurrencyField: React.FC<FormFieldRendererProps> = ({ value, onChange, label, required, error, disabled, readOnly, config, className }) => {
  const symbol = config?.currencySymbol || "$";
  if (readOnly) return <ReadOnlyDisplay value={`${symbol}${value != null ? Number(value).toLocaleString(undefined, { minimumFractionDigits: 2 }) : ""}`} icon={<LockIcon />} mono label={label} required={required} error={error} className={className} />;
  return (
    <Input
      type="number"
      label={label}
      required={required}
      error={error}
      disabled={disabled}
      value={String(value ?? "")}
      onChange={(e) => onChange?.(e.target.valueAsNumber || e.target.value)}
      leadingAddon={<span className="text-sm font-medium text-ink-500">{symbol}</span>}
      className={cn("font-mono", className)}
    />
  );
};

/* 8. Percentage */
const PercentageField: React.FC<FormFieldRendererProps> = ({ value, onChange, label, required, error, disabled, readOnly, className }) => {
  if (readOnly) return <ReadOnlyDisplay value={`${value ?? ""}%`} icon={<LockIcon />} mono label={label} required={required} error={error} className={className} />;
  return (
    <Input
      type="number"
      label={label}
      required={required}
      error={error}
      disabled={disabled}
      value={String(value ?? "")}
      onChange={(e) => onChange?.(e.target.valueAsNumber || e.target.value)}
      trailingAddon={<span className="text-sm font-medium text-ink-500">%</span>}
      className={cn("font-mono", className)}
    />
  );
};

/* 9. Textarea / Long Text */
const TextareaField: React.FC<FormFieldRendererProps> = ({ value, onChange, label, required, error, disabled, readOnly, className }) => {
  if (readOnly) return <ReadOnlyDisplay value={value} icon={<LockIcon />} label={label} required={required} error={error} className={className} />;
  return <Textarea label={label} required={required} error={error} disabled={disabled} value={String(value ?? "")} onChange={(e) => onChange?.(e.target.value)} className={className} />;
};

/* 10. Select */
const SelectField: React.FC<FormFieldRendererProps> = ({ value, onChange, label, required, error, disabled, readOnly, options, className }) => {
  if (readOnly) {
    const selected = options?.find((o) => o.value === value);
    return <ReadOnlyDisplay value={selected?.label ?? value} icon={<LockIcon />} label={label} required={required} error={error} className={className} />;
  }
  return (
    <Select
      label={label}
      required={required}
      error={error}
      disabled={disabled}
      options={options || []}
      value={String(value ?? "")}
      onValueChange={(v) => onChange?.(v)}
      className={className}
    />
  );
};

/* 11. Multi Select */
const MultiSelectField: React.FC<FormFieldRendererProps> = ({ value, onChange, label, required, error, disabled, readOnly, options, className }) => {
  const selected = Array.isArray(value) ? (value as string[]) : [];

  const toggleOption = (val: string) => {
    if (disabled || readOnly) return;
    const next = selected.includes(val)
      ? selected.filter((v) => v !== val)
      : [...selected, val];
    onChange?.(next);
  };

  const removeOption = (val: string) => {
    if (disabled || readOnly) return;
    onChange?.(selected.filter((v) => v !== val));
  };

  return (
    <FieldWrapper label={label} required={required} error={error} className={className}>
      {/* Selected tags */}
      {selected.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-1.5">
          {selected.map((val) => {
            const opt = options?.find((o) => o.value === val);
            return (
              <Tag
                key={val}
                variant="blue"
                onRemove={readOnly || disabled ? undefined : () => removeOption(val)}
              >
                {opt?.label ?? val}
              </Tag>
            );
          })}
        </div>
      )}
      {/* Options list */}
      {!readOnly && (
        <div className="border border-ink-200 rounded-lg max-h-[200px] overflow-y-auto">
          {(options || []).map((opt) => (
            <button
              key={opt.value}
              type="button"
              disabled={disabled}
              onClick={() => toggleOption(opt.value)}
              className={cn(
                "flex items-center w-full px-3 py-2 text-sm text-left transition-colors duration-150",
                selected.includes(opt.value)
                  ? "bg-brand-50 text-brand-700"
                  : "text-ink-700 hover:bg-ink-50",
                disabled && "opacity-50 cursor-not-allowed"
              )}
            >
              <span className={cn(
                "mr-2 h-4 w-4 rounded border flex items-center justify-center shrink-0",
                selected.includes(opt.value) ? "bg-brand-600 border-brand-600" : "border-ink-300"
              )}>
                {selected.includes(opt.value) && (
                  <svg className="h-3 w-3 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                )}
              </span>
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </FieldWrapper>
  );
};

/* 12. Checkbox */
const CheckboxField: React.FC<FormFieldRendererProps> = ({ value, onChange, label, error, disabled, readOnly, className }) => {
  if (readOnly) {
    return (
      <FieldWrapper error={error} className={className}>
        <div className="flex items-center gap-2 bg-ink-50 border border-ink-100 rounded-lg px-3 py-2.5">
          <LockIcon />
          <span className="text-sm text-ink-700">{label}: {value ? "Yes" : "No"}</span>
        </div>
      </FieldWrapper>
    );
  }
  return (
    <FieldWrapper error={error} className={className}>
      <Checkbox
        label={label}
        checked={!!value}
        onCheckedChange={(v) => onChange?.(v)}
        disabled={disabled}
      />
    </FieldWrapper>
  );
};

/* 13. Radio */
const RadioField: React.FC<FormFieldRendererProps> = ({ value, onChange, label, required, error, disabled, readOnly, options, className }) => {
  if (readOnly) {
    const selected = options?.find((o) => o.value === value);
    return <ReadOnlyDisplay value={selected?.label ?? value} icon={<LockIcon />} label={label} required={required} error={error} className={className} />;
  }
  return (
    <FieldWrapper error={error} className={className}>
      <RadioGroup
        label={label}
        options={(options || []).map((o) => ({ value: o.value, label: o.label }))}
        value={String(value ?? "")}
        onValueChange={(v) => onChange?.(v)}
        disabled={disabled}
      />
    </FieldWrapper>
  );
};

/* 14. Date Range */
const DateRangeField: React.FC<FormFieldRendererProps> = ({ value, onChange, label, required, error, disabled, readOnly, className }) => {
  const range = (value && typeof value === "object" && !Array.isArray(value)) ? (value as { start?: string; end?: string }) : { start: "", end: "" };

  if (readOnly) return <ReadOnlyDisplay value={`${range.start ?? ""} — ${range.end ?? ""}`} icon={<LockIcon />} label={label} required={required} error={error} className={className} />;

  return (
    <FieldWrapper label={label} required={required} error={error} className={className}>
      <div className="flex items-center gap-2">
        <Input
          type="date"
          disabled={disabled}
          value={range.start ?? ""}
          onChange={(e) => onChange?.({ ...range, start: e.target.value })}
        />
        <span className="text-sm text-ink-400 shrink-0">to</span>
        <Input
          type="date"
          disabled={disabled}
          value={range.end ?? ""}
          onChange={(e) => onChange?.({ ...range, end: e.target.value })}
        />
      </div>
    </FieldWrapper>
  );
};

/* 15. File Upload */
const FileUploadField: React.FC<FormFieldRendererProps> = ({ value, onChange, label, required, error, disabled, readOnly, config, className }) => {
  const files = Array.isArray(value) ? (value as { name: string; size?: number; progress?: number }[]) : [];
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = React.useState(false);

  const handleFiles = (fileList: FileList) => {
    const newFiles = Array.from(fileList).map((f) => ({ name: f.name, size: f.size }));
    onChange?.([...files, ...newFiles]);
  };

  if (readOnly) {
    return (
      <FieldWrapper label={label} required={required} error={error} className={className}>
        <div className="bg-ink-50 border border-ink-100 rounded-lg p-3">
          {files.length === 0 ? (
            <span className="text-sm text-ink-400">No files</span>
          ) : (
            <ul className="space-y-1">
              {files.map((f, i) => (
                <li key={i} className="text-sm text-ink-700 flex items-center gap-1.5">
                  <LockIcon />
                  {f.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      </FieldWrapper>
    );
  }

  return (
    <FieldWrapper label={label} required={required} error={error} className={className}>
      <div
        className={cn(
          "border-2 border-dashed rounded-lg p-6 text-center transition-colors duration-200 cursor-pointer",
          dragOver ? "border-brand-400 bg-brand-50/50" : "border-ink-200 hover:border-ink-300",
          disabled && "opacity-50 cursor-not-allowed"
        )}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          if (!disabled && e.dataTransfer.files) handleFiles(e.dataTransfer.files);
        }}
        onClick={() => !disabled && inputRef.current?.click()}
      >
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          multiple={!config?.maxFiles || config.maxFiles > 1}
          accept={config?.accept}
          onChange={(e) => e.target.files && handleFiles(e.target.files)}
        />
        <UploadIcon />
        <p className="mt-2 text-sm text-ink-600">Drop files here or click to upload</p>
        <p className="text-xs text-ink-400 mt-1">{config?.accept || "Any file type"}</p>
      </div>
      {files.length > 0 && (
        <ul className="mt-2 space-y-1">
          {files.map((f, i) => (
            <li key={i} className="flex items-center justify-between text-sm text-ink-700 bg-ink-50 rounded-lg px-3 py-2">
              <span className="truncate">{f.name}</span>
              <button
                type="button"
                onClick={() => onChange?.(files.filter((_, fi) => fi !== i))}
                className="text-ink-400 hover:text-red-500 shrink-0 ml-2"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </li>
          ))}
        </ul>
      )}
    </FieldWrapper>
  );
};

/* 16. Image */
const ImageField: React.FC<FormFieldRendererProps> = ({ value, onChange, label, required, error, disabled, readOnly, className }) => {
  const src = typeof value === "string" ? value : "";
  const inputRef = React.useRef<HTMLInputElement>(null);

  if (readOnly) {
    return (
      <FieldWrapper label={label} required={required} error={error} className={className}>
        {src ? (
          <div className="relative rounded-lg overflow-hidden border border-ink-100 bg-ink-50 max-w-xs">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt={label || "Image"} className="w-full h-auto object-cover" />
          </div>
        ) : (
          <div className="flex items-center gap-2 bg-ink-50 border border-ink-100 rounded-lg px-3 py-2.5 text-sm text-ink-400">
            <LockIcon />
            No image
          </div>
        )}
      </FieldWrapper>
    );
  }

  return (
    <FieldWrapper label={label} required={required} error={error} className={className}>
      {src && (
        <div className="relative rounded-lg overflow-hidden border border-ink-100 bg-ink-50 max-w-xs mb-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt={label || "Image"} className="w-full h-auto object-cover" />
        </div>
      )}
      <div
        className={cn(
          "border-2 border-dashed rounded-lg p-6 text-center transition-colors duration-200 cursor-pointer border-ink-200 hover:border-ink-300",
          disabled && "opacity-50 cursor-not-allowed"
        )}
        onClick={() => !disabled && inputRef.current?.click()}
      >
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              const url = URL.createObjectURL(file);
              onChange?.(url);
            }
          }}
        />
        <ImageIcon />
        <p className="mt-2 text-sm text-ink-600">{src ? "Replace image" : "Upload image"}</p>
      </div>
    </FieldWrapper>
  );
};

/* 17. Barcode/QR */
const BarcodeField: React.FC<FormFieldRendererProps> = ({ value, onChange, label, required, error, disabled, readOnly, className }) => {
  if (readOnly) return <ReadOnlyDisplay value={value} icon={<BarcodeIcon />} label={label} required={required} error={error} className={className} />;
  return (
    <Input
      label={label}
      required={required}
      error={error}
      disabled={disabled}
      value={String(value ?? "")}
      onChange={(e) => onChange?.(e.target.value)}
      trailingAddon={<BarcodeIcon />}
      className={className}
    />
  );
};

/* 18. Auto-generated */
const AutoGeneratedField: React.FC<FormFieldRendererProps> = ({ value, label, required, error, className }) => (
  <ReadOnlyDisplay value={value} icon={<LockIcon />} label={label} required={required} error={error} className={className} />
);

/* 19. Formula/Computed */
const FormulaField: React.FC<FormFieldRendererProps> = ({ value, label, required, error, className }) => (
  <ReadOnlyDisplay value={value} icon={<CalculatorIcon />} mono label={label} required={required} error={error} className={className} />
);

/* 20. Aggregate */
const AggregateField: React.FC<FormFieldRendererProps> = ({ value, label, required, error, className }) => (
  <ReadOnlyDisplay value={value != null ? Number(value).toLocaleString() : ""} icon={<CalculatorIcon />} mono label={label} required={required} error={error} className={className} />
);

/* 21. Select from Other Sheet */
const SelectFromSheetField: React.FC<FormFieldRendererProps> = ({ value, onChange, label, required, error, disabled, readOnly, options, className }) => {
  if (readOnly) {
    const selected = options?.find((o) => o.value === value);
    return <ReadOnlyDisplay value={selected?.label ?? value} icon={<LockIcon />} label={label} required={required} error={error} className={className} />;
  }
  return (
    <Select
      label={label}
      required={required}
      error={error}
      disabled={disabled}
      searchable
      options={options || []}
      value={String(value ?? "")}
      onValueChange={(v) => onChange?.(v)}
      className={className}
    />
  );
};

/* 22. Masked Text */
const MaskedTextField: React.FC<FormFieldRendererProps> = ({ value, onChange, label, required, error, disabled, readOnly, config, className }) => {
  if (readOnly) return <ReadOnlyDisplay value={value} icon={<LockIcon />} label={label} required={required} error={error} className={className} />;
  return (
    <Input
      label={label}
      required={required}
      error={error}
      disabled={disabled}
      value={String(value ?? "")}
      onChange={(e) => onChange?.(e.target.value)}
      placeholder={config?.maskPattern || ""}
      className={className}
    />
  );
};

/* 23. Reviewer/Approval */
const ReviewerField: React.FC<FormFieldRendererProps> = ({ value, onChange, label, required, error, readOnly, className }) => {
  const status = typeof value === "string" ? value : "pending";
  const statusMap: Record<string, { variant: "warning" | "success" | "danger" | "neutral"; text: string }> = {
    pending: { variant: "warning", text: "Pending" },
    approved: { variant: "success", text: "Approved" },
    rejected: { variant: "danger", text: "Rejected" },
  };
  const s = statusMap[status] || statusMap.pending;

  return (
    <FieldWrapper label={label} required={required} error={error} className={className}>
      <div className="flex items-center gap-3">
        <Badge variant={s.variant} dot>{s.text}</Badge>
        {!readOnly && status === "pending" && (
          <div className="flex items-center gap-2">
            <Button size="sm" variant="secondary" onClick={() => onChange?.("approved")}>Approve</Button>
            <Button size="sm" variant="danger" onClick={() => onChange?.("rejected")}>Reject</Button>
          </div>
        )}
      </div>
    </FieldWrapper>
  );
};

/* 24. Markdown */
const MarkdownField: React.FC<FormFieldRendererProps> = ({ value, onChange, label, required, error, disabled, readOnly, className }) => {
  const [preview, setPreview] = React.useState(false);
  const text = String(value ?? "");

  if (readOnly) return <ReadOnlyDisplay value={text} icon={<LockIcon />} label={label} required={required} error={error} className={className} />;

  return (
    <FieldWrapper label={label} required={required} error={error} className={className}>
      <div className="border border-ink-200 rounded-lg overflow-hidden">
        <div className="flex items-center gap-1 bg-ink-50 px-3 py-1.5 border-b border-ink-100">
          <button
            type="button"
            className={cn("text-xs font-medium px-2 py-1 rounded transition-colors", !preview ? "bg-white text-ink-950 shadow-sm" : "text-ink-500 hover:text-ink-700")}
            onClick={() => setPreview(false)}
          >
            Write
          </button>
          <button
            type="button"
            className={cn("text-xs font-medium px-2 py-1 rounded transition-colors", preview ? "bg-white text-ink-950 shadow-sm" : "text-ink-500 hover:text-ink-700")}
            onClick={() => setPreview(true)}
          >
            Preview
          </button>
        </div>
        {preview ? (
          <div className="p-3 prose prose-sm max-w-none min-h-[120px] text-ink-700 whitespace-pre-wrap">{text}</div>
        ) : (
          <textarea
            className="w-full p-3 text-sm text-ink-950 min-h-[120px] focus:outline-none resize-y font-mono"
            value={text}
            onChange={(e) => onChange?.(e.target.value)}
            disabled={disabled}
          />
        )}
      </div>
    </FieldWrapper>
  );
};

/* 25. ID/Number */
const IdNumberField: React.FC<FormFieldRendererProps> = ({ value, label, required, error, className }) => (
  <ReadOnlyDisplay value={value} icon={<HashIcon />} mono label={label} required={required} error={error} className={className} />
);

/* 26. Action Barcode */
const ActionBarcodeField: React.FC<FormFieldRendererProps> = ({ label, error, disabled, readOnly, className }) => (
  <FieldWrapper label={label} error={error} className={className}>
    <Button
      variant="outline"
      size="sm"
      disabled={disabled || readOnly}
      leftIcon={<BarcodeIcon />}
    >
      Scan Barcode
    </Button>
  </FieldWrapper>
);

/* 27. Exchange Rate */
const ExchangeRateField: React.FC<FormFieldRendererProps> = ({ value, onChange, label, required, error, disabled, readOnly, config, className }) => {
  const data = (value && typeof value === "object" && !Array.isArray(value)) ? (value as { base?: number; target?: number }) : { base: undefined, target: undefined };
  const rate = config?.exchangeRate ?? 1;
  const baseCur = config?.baseCurrency || "USD";
  const targetCur = config?.targetCurrency || "EUR";

  if (readOnly) {
    return (
      <FieldWrapper label={label} required={required} error={error} className={className}>
        <div className="flex items-center gap-2 bg-ink-50 border border-ink-100 rounded-lg px-3 py-2.5 text-sm">
          <LockIcon />
          <span className="font-mono">{baseCur} {data.base ?? ""}</span>
          <ExchangeIcon />
          <span className="font-mono">{targetCur} {data.target ?? ""}</span>
        </div>
      </FieldWrapper>
    );
  }

  return (
    <FieldWrapper label={label} required={required} error={error} className={className}>
      <div className="flex items-center gap-2">
        <Input
          type="number"
          disabled={disabled}
          value={String(data.base ?? "")}
          onChange={(e) => {
            const base = e.target.valueAsNumber || 0;
            onChange?.({ base, target: +(base * rate).toFixed(2) });
          }}
          leadingAddon={<span className="text-xs font-medium text-ink-500">{baseCur}</span>}
          className="font-mono"
        />
        <div className="shrink-0">
          <ExchangeIcon />
        </div>
        <Input
          type="number"
          disabled={disabled}
          value={String(data.target ?? "")}
          onChange={(e) => {
            const target = e.target.valueAsNumber || 0;
            onChange?.({ base: rate > 0 ? +(target / rate).toFixed(2) : 0, target });
          }}
          leadingAddon={<span className="text-xs font-medium text-ink-500">{targetCur}</span>}
          className="font-mono"
        />
      </div>
      <p className="text-xs text-ink-400 mt-1">Rate: 1 {baseCur} = {rate} {targetCur}</p>
    </FieldWrapper>
  );
};

/* 28. Rich Text */
const RichTextField: React.FC<FormFieldRendererProps> = ({ value, onChange, label, required, error, disabled, readOnly, className }) => {
  const editorRef = React.useRef<HTMLDivElement>(null);
  const text = String(value ?? "");

  if (readOnly) return <ReadOnlyDisplay value={text} icon={<LockIcon />} label={label} required={required} error={error} className={className} />;

  const exec = (cmd: string, val?: string) => {
    document.execCommand(cmd, false, val);
    editorRef.current?.focus();
    /* Emit onChange */
    if (editorRef.current) onChange?.(editorRef.current.innerHTML);
  };

  return (
    <FieldWrapper label={label} required={required} error={error} className={className}>
      <div className={cn("border border-ink-200 rounded-lg overflow-hidden", disabled && "opacity-50 pointer-events-none")}>
        {/* Toolbar */}
        <div className="flex items-center gap-1 bg-ink-50 px-2 py-1.5 border-b border-ink-100">
          <button type="button" onClick={() => exec("bold")} className="p-1.5 rounded hover:bg-ink-100 text-ink-600 font-bold text-xs">B</button>
          <button type="button" onClick={() => exec("italic")} className="p-1.5 rounded hover:bg-ink-100 text-ink-600 italic text-xs">I</button>
          <button type="button" onClick={() => { const url = prompt("Enter URL:"); if (url) exec("createLink", url); }} className="p-1.5 rounded hover:bg-ink-100 text-ink-600 text-xs underline">Link</button>
        </div>
        {/* Editable area */}
        <div
          ref={editorRef}
          contentEditable={!disabled}
          suppressContentEditableWarning
          className="p-3 min-h-[120px] text-sm text-ink-950 focus:outline-none prose prose-sm max-w-none"
          onInput={() => {
            if (editorRef.current) onChange?.(editorRef.current.innerHTML);
          }}
          dangerouslySetInnerHTML={{ __html: text }}
        />
      </div>
    </FieldWrapper>
  );
};

/* ================================================================== */
/*  Field type → component map                                         */
/* ================================================================== */

const fieldRenderers: Record<RagicFieldType, React.FC<FormFieldRendererProps>> = {
  text: TextField,
  number: NumberField,
  date: DateField,
  email: EmailField,
  phone: PhoneField,
  url: URLField,
  currency: CurrencyField,
  percentage: PercentageField,
  textarea: TextareaField,
  select: SelectField,
  "multi-select": MultiSelectField,
  checkbox: CheckboxField,
  radio: RadioField,
  "date-range": DateRangeField,
  "file-upload": FileUploadField,
  image: ImageField,
  barcode: BarcodeField,
  "auto-generated": AutoGeneratedField,
  formula: FormulaField,
  aggregate: AggregateField,
  "select-from-sheet": SelectFromSheetField,
  "masked-text": MaskedTextField,
  reviewer: ReviewerField,
  markdown: MarkdownField,
  "id-number": IdNumberField,
  "action-barcode": ActionBarcodeField,
  "exchange-rate": ExchangeRateField,
  "rich-text": RichTextField,
};

/* ================================================================== */
/*  Main Component                                                     */
/* ================================================================== */

const FormFieldRenderer: React.FC<FormFieldRendererProps> = (props) => {
  const Renderer = fieldRenderers[props.fieldType];

  if (!Renderer) {
    return (
      <FieldWrapper label={props.label} required={props.required} error={props.error} className={props.className}>
        <div className="bg-red-50 border border-red-200 rounded-lg px-3 py-2.5 text-sm text-red-600">
          Unknown field type: {props.fieldType}
        </div>
      </FieldWrapper>
    );
  }

  return <Renderer {...props} />;
};
FormFieldRenderer.displayName = "FormFieldRenderer";

export { FormFieldRenderer };
