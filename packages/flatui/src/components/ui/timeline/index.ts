// Simplified wrapper as the primary export
export { Timeline, TimelinePrimitives } from './timeline.simple'
export type { TimelineProps, TimelineItemDef } from './timeline.simple'

// Sub-parts still available individually (backward compat)
export {
  TimelineRoot,
  TimelineItem,
  TimelineConnector,
  TimelineDot,
  TimelineContent,
  TimelineTitle,
  TimelineDescription,
  TimelineTime,
} from './timeline'

export type { TimelineItemStatus } from './timeline'
