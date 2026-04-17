import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const skeletonVariants = cva("animate-pulse bg-ink-100", {
  variants: {
    variant: {
      rectangle: "rounded-lg",
      circle: "rounded-full",
      text: "rounded",
    },
  },
  defaultVariants: {
    variant: "rectangle",
  },
});

export interface SkeletonProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof skeletonVariants> {
  width?: string | number;
  height?: string | number;
  lines?: number;
}

const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, variant, width, height, lines, style, ...props }, ref) => {
    if (variant === "text") {
      const lineCount = lines || 3;
      const widths = ["100%", "92%", "76%", "88%", "60%"];
      return (
        <div ref={ref} className={cn("flex flex-col gap-2", className)} {...props}>
          {Array.from({ length: lineCount }).map((_, i) => (
            <div
              key={i}
              className="animate-pulse bg-ink-100 rounded h-4"
              style={{ width: widths[i % widths.length] }}
            />
          ))}
        </div>
      );
    }

    if (variant === "circle") {
      const size = width || height || 40;
      return (
        <div
          ref={ref}
          className={cn(skeletonVariants({ variant, className }))}
          style={{ width: size, height: size, ...style }}
          {...props}
        />
      );
    }

    return (
      <div
        ref={ref}
        className={cn(skeletonVariants({ variant, className }))}
        style={{
          width: width || "100%",
          height: height || 20,
          ...style,
        }}
        {...props}
      />
    );
  }
);
Skeleton.displayName = "Skeleton";

export { Skeleton, skeletonVariants };
