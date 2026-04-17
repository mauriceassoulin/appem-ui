"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export interface ModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "full";
  closeOnBackdrop?: boolean;
}

export interface ModalHeaderProps {
  title: string;
  description?: string;
  className?: string;
}

export interface ModalBodyProps {
  children: React.ReactNode;
  className?: string;
}

export interface ModalFooterProps {
  children: React.ReactNode;
  className?: string;
}

/* ------------------------------------------------------------------ */
/*  Width map                                                          */
/* ------------------------------------------------------------------ */

const maxWidthMap: Record<string, string> = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  full: "max-w-full mx-4",
};

/* ------------------------------------------------------------------ */
/*  Close icon                                                         */
/* ------------------------------------------------------------------ */

const CloseIcon = () => (
  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

const ModalHeader: React.FC<ModalHeaderProps> = ({ title, description, className }) => (
  <div className={cn("flex items-start justify-between p-6 pb-0", className)}>
    <div className="flex flex-col gap-1">
      <DialogPrimitive.Title className="font-display text-xl text-ink-950">
        {title}
      </DialogPrimitive.Title>
      {description && (
        <DialogPrimitive.Description className="text-sm text-ink-500">
          {description}
        </DialogPrimitive.Description>
      )}
    </div>
    <DialogPrimitive.Close className="rounded-lg p-1.5 text-ink-400 hover:text-ink-600 hover:bg-ink-50 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-200">
      <CloseIcon />
      <span className="sr-only">Close</span>
    </DialogPrimitive.Close>
  </div>
);
ModalHeader.displayName = "ModalHeader";

const ModalBody: React.FC<ModalBodyProps> = ({ children, className }) => (
  <div className={cn("p-6 overflow-y-auto", className)}>{children}</div>
);
ModalBody.displayName = "ModalBody";

const ModalFooter: React.FC<ModalFooterProps> = ({ children, className }) => (
  <div className={cn("flex items-center justify-end gap-3 p-6 pt-0", className)}>{children}</div>
);
ModalFooter.displayName = "ModalFooter";

/* ------------------------------------------------------------------ */
/*  Modal                                                              */
/* ------------------------------------------------------------------ */

const Modal: React.FC<ModalProps> = ({
  open,
  onOpenChange,
  children,
  maxWidth = "md",
  closeOnBackdrop = true,
}) => {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay
          className="fixed inset-0 z-50 bg-ink-950/50 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0"
          onClick={closeOnBackdrop ? undefined : (e) => e.stopPropagation()}
        />
        <DialogPrimitive.Content
          className={cn(
            "fixed left-[50%] top-[50%] z-50 translate-x-[-50%] translate-y-[-50%] bg-white rounded-2xl shadow-2xl w-full",
            "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]",
            "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]",
            maxWidthMap[maxWidth]
          )}
          onInteractOutside={closeOnBackdrop ? undefined : (e) => e.preventDefault()}
        >
          {children}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};
Modal.displayName = "Modal";

export { Modal, ModalHeader, ModalBody, ModalFooter };
