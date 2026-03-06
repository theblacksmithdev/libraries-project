import * as React from "react"
import {
  Tooltip as TooltipRoot,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "./tooltip"

export interface TooltipProps {
  /** Tooltip content */
  content: React.ReactNode
  /** Trigger element */
  children: React.ReactNode
  /** Preferred side of the trigger */
  side?: React.ComponentPropsWithoutRef<typeof TooltipContent>["side"]
  /** Preferred alignment against the trigger */
  align?: React.ComponentPropsWithoutRef<typeof TooltipContent>["align"]
  /** Delay before the tooltip opens (ms) */
  delayDuration?: number
}

function Tooltip({ content, children, side, align, delayDuration }: TooltipProps) {
  return (
    <TooltipProvider delayDuration={delayDuration}>
      <TooltipRoot>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent side={side} align={align}>
          {content}
        </TooltipContent>
      </TooltipRoot>
    </TooltipProvider>
  )
}
Tooltip.displayName = "Tooltip"

export const TooltipPrimitives = {
  Root: TooltipRoot,
  Trigger: TooltipTrigger,
  Content: TooltipContent,
  Provider: TooltipProvider,
}

export { Tooltip }
