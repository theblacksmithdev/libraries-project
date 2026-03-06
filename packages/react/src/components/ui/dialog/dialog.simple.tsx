"use client"

import * as React from "react"
import {
  Dialog as DialogRoot,
  DialogPortal,
  DialogOverlay,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "./dialog"

export interface DialogProps {
  /** Trigger element that opens the dialog */
  trigger?: React.ReactNode
  /** Dialog title */
  title?: React.ReactNode
  /** Dialog description */
  description?: React.ReactNode
  /** Footer content */
  footer?: React.ReactNode
  /** Dialog body content */
  children?: React.ReactNode
  /** Controlled open state */
  open?: boolean
  /** Callback when open state changes */
  onOpenChange?: (open: boolean) => void
  /** Additional class name for the content container */
  contentClassName?: string
}

function Dialog({
  trigger,
  title,
  description,
  footer,
  children,
  open,
  onOpenChange,
  contentClassName,
}: DialogProps) {
  return (
    <DialogRoot open={open} onOpenChange={onOpenChange}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent className={contentClassName}>
        {(title || description) && (
          <DialogHeader>
            {title && <DialogTitle>{title}</DialogTitle>}
            {description && <DialogDescription>{description}</DialogDescription>}
          </DialogHeader>
        )}
        {children}
        {footer && <DialogFooter>{footer}</DialogFooter>}
      </DialogContent>
    </DialogRoot>
  )
}
Dialog.displayName = "Dialog"

export const DialogPrimitives = {
  Root: DialogRoot,
  Portal: DialogPortal,
  Overlay: DialogOverlay,
  Trigger: DialogTrigger,
  Close: DialogClose,
  Content: DialogContent,
  Header: DialogHeader,
  Footer: DialogFooter,
  Title: DialogTitle,
  Description: DialogDescription,
}

export { Dialog }
