// Simplified wrapper as the primary export
export { Tooltip, TooltipPrimitives } from './tooltip.simple'
export type { TooltipProps } from './tooltip.simple'

// Sub-parts still available individually (backward compat)
export { TooltipTrigger, TooltipContent, TooltipProvider } from './tooltip'
