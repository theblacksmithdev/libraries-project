import * as React from "react"
import {
  Popover as PopoverRoot,
  PopoverTrigger,
  PopoverContent,
  PopoverAnchor,
} from "./popover"

export interface PopoverProps {
  /** Trigger element that opens the popover */
  trigger: React.ReactNode
  /** Popover content */
  children: React.ReactNode
  /** Controlled open state */
  open?: boolean
  /** Callback when open state changes */
  onOpenChange?: (open: boolean) => void
  /** Preferred side of the trigger */
  side?: React.ComponentPropsWithoutRef<typeof PopoverContent>["side"]
  /** Preferred alignment against the trigger */
  align?: React.ComponentPropsWithoutRef<typeof PopoverContent>["align"]
}

function Popover({ trigger, children, open, onOpenChange, side, align }: PopoverProps) {
  return (
    <PopoverRoot open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>{trigger}</PopoverTrigger>
      <PopoverContent side={side} align={align}>
        {children}
      </PopoverContent>
    </PopoverRoot>
  )
}
Popover.displayName = "Popover"

export const PopoverPrimitives = {
  Root: PopoverRoot,
  Trigger: PopoverTrigger,
  Content: PopoverContent,
  Anchor: PopoverAnchor,
}

export { Popover }
