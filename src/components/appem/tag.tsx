import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const tagVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full text-xs font-medium border px-2.5 py-1",
  {
    variants: {
      variant: {
        blue: "bg-brand-50 text-brand-700 border-brand-200",
        green: "bg-accent-subtle text-emerald-700 border-emerald-200",
        mono: "bg-ink-50 text-ink-600 border-ink-200 font-mono",
      },
    },
    defaultVariants: {
      variant: "blue",
    },
  }
);

export interface TagProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof tagVariants> {
  onRemove?: () => void;
}

const Tag = React.forwardRef<HTMLSpanElement, TagProps>(
  ({ className, variant, children, onRemove, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(tagVariants({ variant, className }))}
        {...props}
      >
        {children}
        {onRemove && (
          <button
            type="button"
            onClick={onRemove}
            className={cn(
              "inline-flex items-center justify-center h-3.5 w-3.5 rounded-full transition-colors duration-200",
              variant === "blue" && "hover:bg-brand-200",
              variant === "green" && "hover:bg-emerald-200",
              variant === "mono" && "hover:bg-ink-200"
            )}
            aria-label="Remove"
          >
            <svg
              className="h-3 w-3"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </span>
    );
  }
);
Tag.displayName = "Tag";

export { Tag, tagVariants };
