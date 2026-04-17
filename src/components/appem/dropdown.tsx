"use client";

import * as React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export interface DropdownItem {
  label: string;
  icon?: React.ReactNode;
  variant?: "default" | "danger";
  disabled?: boolean;
  onSelect?: () => void;
}

export interface DropdownGroup {
  items: DropdownItem[];
  label?: string;
}

export interface DropdownProps {
  trigger: React.ReactNode;
  items?: DropdownItem[];
  groups?: DropdownGroup[];
  align?: "start" | "center" | "end";
  side?: "top" | "bottom" | "left" | "right";
  className?: string;
}

/* ------------------------------------------------------------------ */
/*  Dropdown Item renderer                                             */
/* ------------------------------------------------------------------ */

const DropdownMenuItem: React.FC<{ item: DropdownItem }> = ({ item }) => (
  <DropdownMenuPrimitive.Item
    disabled={item.disabled}
    onSelect={item.onSelect}
    className={cn(
      "relative flex items-center gap-2 px-3 py-2 text-sm rounded-md cursor-pointer select-none outline-none transition-colors duration-150",
      "data-[disabled]:opacity-50 data-[disabled]:pointer-events-none",
      item.variant === "danger"
        ? "text-red-600 data-[highlighted]:bg-red-50"
        : "text-ink-700 data-[highlighted]:bg-brand-50"
    )}
  >
    {item.icon && <span className="shrink-0 h-4 w-4">{item.icon}</span>}
    {item.label}
  </DropdownMenuPrimitive.Item>
);

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

const Dropdown: React.FC<DropdownProps> = ({
  trigger,
  items,
  groups,
  align = "end",
  side = "bottom",
  className,
}) => {
  /* Normalize to groups */
  const resolvedGroups: DropdownGroup[] = groups ?? (items ? [{ items }] : []);

  return (
    <DropdownMenuPrimitive.Root>
      <DropdownMenuPrimitive.Trigger asChild>{trigger}</DropdownMenuPrimitive.Trigger>

      <DropdownMenuPrimitive.Portal>
        <DropdownMenuPrimitive.Content
          align={align}
          side={side}
          sideOffset={4}
          className={cn(
            "z-50 min-w-[180px] bg-white border border-ink-100 rounded-lg shadow-lg py-1",
            "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
            "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
            className
          )}
        >
          {resolvedGroups.map((group, gi) => (
            <React.Fragment key={gi}>
              {gi > 0 && (
                <DropdownMenuPrimitive.Separator className="h-px bg-ink-100 my-1" />
              )}
              {group.label && (
                <DropdownMenuPrimitive.Label className="px-3 py-1.5 text-xs font-medium text-ink-400">
                  {group.label}
                </DropdownMenuPrimitive.Label>
              )}
              <DropdownMenuPrimitive.Group>
                {group.items.map((item, ii) => (
                  <DropdownMenuItem key={ii} item={item} />
                ))}
              </DropdownMenuPrimitive.Group>
            </React.Fragment>
          ))}
        </DropdownMenuPrimitive.Content>
      </DropdownMenuPrimitive.Portal>
    </DropdownMenuPrimitive.Root>
  );
};
Dropdown.displayName = "Dropdown";

export { Dropdown };
