"use client";

import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const avatarSizeVariants = cva(
  "relative inline-flex shrink-0 overflow-hidden rounded-full ring-2 ring-white",
  {
    variants: {
      size: {
        xs: "h-6 w-6",
        sm: "h-8 w-8",
        md: "h-10 w-10",
        lg: "h-12 w-12",
        xl: "h-16 w-16",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

const fallbackSizeVariants = cva(
  "flex h-full w-full items-center justify-center rounded-full bg-brand-100 text-brand-700 font-medium",
  {
    variants: {
      size: {
        xs: "text-[10px]",
        sm: "text-xs",
        md: "text-sm",
        lg: "text-base",
        xl: "text-lg",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export interface AvatarProps
  extends VariantProps<typeof avatarSizeVariants> {
  src?: string;
  alt?: string;
  name?: string;
  className?: string;
}

const Avatar = React.forwardRef<HTMLSpanElement, AvatarProps>(
  ({ className, size, src, alt, name }, ref) => {
    return (
      <AvatarPrimitive.Root
        ref={ref}
        className={cn(avatarSizeVariants({ size, className }))}
      >
        {src && (
          <AvatarPrimitive.Image
            src={src}
            alt={alt || name || ""}
            className="h-full w-full object-cover rounded-full"
          />
        )}
        <AvatarPrimitive.Fallback
          className={cn(fallbackSizeVariants({ size }))}
          delayMs={src ? 600 : 0}
        >
          {name ? getInitials(name) : "?"}
        </AvatarPrimitive.Fallback>
      </AvatarPrimitive.Root>
    );
  }
);
Avatar.displayName = "Avatar";

export { Avatar, avatarSizeVariants };
