import * as React from "react"
import {
  HoverCard as HoverCardRoot,
  HoverCardTrigger,
  HoverCardContent,
} from "./hover-card"

export interface HoverCardProps {
  /** Trigger element */
  trigger: React.ReactNode
  /** Hover card content */
  children: React.ReactNode
  /** Controlled open state */
  open?: boolean
  /** Callback when open state changes */
  onOpenChange?: (open: boolean) => void
  /** Preferred side of the trigger */
  side?: React.ComponentPropsWithoutRef<typeof HoverCardContent>["side"]
  /** Preferred alignment against the trigger */
  align?: React.ComponentPropsWithoutRef<typeof HoverCardContent>["align"]
  /** Delay before the card opens (ms) */
  openDelay?: number
  /** Delay before the card closes (ms) */
  closeDelay?: number
}

function HoverCard({
  trigger,
  children,
  open,
  onOpenChange,
  side,
  align,
  openDelay,
  closeDelay,
}: HoverCardProps) {
  return (
    <HoverCardRoot
      open={open}
      onOpenChange={onOpenChange}
      openDelay={openDelay}
      closeDelay={closeDelay}
    >
      <HoverCardTrigger asChild>{trigger}</HoverCardTrigger>
      <HoverCardContent side={side} align={align}>
        {children}
      </HoverCardContent>
    </HoverCardRoot>
  )
}
HoverCard.displayName = "HoverCard"

export const HoverCardPrimitives = {
  Root: HoverCardRoot,
  Trigger: HoverCardTrigger,
  Content: HoverCardContent,
}

export { HoverCard }
