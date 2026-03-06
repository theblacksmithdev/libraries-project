"use client"

import * as React from "react"
import {
  Sheet as SheetRoot,
  SheetPortal,
  SheetOverlay,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
} from "./sheet"

export interface SheetProps {
  /** Trigger element that opens the sheet */
  trigger?: React.ReactNode
  /** Sheet title */
  title?: React.ReactNode
  /** Sheet description */
  description?: React.ReactNode
  /** Footer content */
  footer?: React.ReactNode
  /** Sheet body content */
  children?: React.ReactNode
  /** Which side the sheet slides in from */
  side?: "top" | "bottom" | "left" | "right"
  /** Controlled open state */
  open?: boolean
  /** Callback when open state changes */
  onOpenChange?: (open: boolean) => void
  /** Additional class name for the content container */
  contentClassName?: string
}

function Sheet({
  trigger,
  title,
  description,
  footer,
  children,
  side,
  open,
  onOpenChange,
  contentClassName,
}: SheetProps) {
  return (
    <SheetRoot open={open} onOpenChange={onOpenChange}>
      {trigger && <SheetTrigger asChild>{trigger}</SheetTrigger>}
      <SheetContent side={side} className={contentClassName}>
        {(title || description) && (
          <SheetHeader>
            {title && <SheetTitle>{title}</SheetTitle>}
            {description && <SheetDescription>{description}</SheetDescription>}
          </SheetHeader>
        )}
        {children}
        {footer && <SheetFooter>{footer}</SheetFooter>}
      </SheetContent>
    </SheetRoot>
  )
}
Sheet.displayName = "Sheet"

export const SheetPrimitives = {
  Root: SheetRoot,
  Portal: SheetPortal,
  Overlay: SheetOverlay,
  Trigger: SheetTrigger,
  Close: SheetClose,
  Content: SheetContent,
  Header: SheetHeader,
  Footer: SheetFooter,
  Title: SheetTitle,
  Description: SheetDescription,
}

export { Sheet }
