import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full font-medium border",
  {
    variants: {
      variant: {
        brand: "bg-brand-50 text-brand-700 border-brand-200",
        success: "bg-accent-subtle text-emerald-700 border-emerald-200",
        neutral: "bg-ink-50 text-ink-600 border-ink-200",
        danger: "bg-red-50 text-red-700 border-red-200",
        warning: "bg-amber-50 text-amber-700 border-amber-200",
      },
      size: {
        sm: "text-xs px-2 py-0.5",
        md: "text-xs px-2.5 py-1",
        lg: "text-sm px-3 py-1",
      },
    },
    defaultVariants: {
      variant: "brand",
      size: "md",
    },
  }
);

const dotColorMap: Record<string, string> = {
  brand: "bg-brand-600",
  success: "bg-emerald-500",
  neutral: "bg-ink-400",
  danger: "bg-red-500",
  warning: "bg-amber-500",
};

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  dot?: boolean;
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, size, dot, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(badgeVariants({ variant, size, className }))}
        {...props}
      >
        {dot && (
          <span
            className={cn(
              "h-1.5 w-1.5 rounded-full",
              dotColorMap[variant || "brand"]
            )}
          />
        )}
        {children}
      </span>
    );
  }
);
Badge.displayName = "Badge";

export { Badge, badgeVariants };
