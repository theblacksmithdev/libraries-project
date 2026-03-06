import * as React from "react"
import {
  TimelineRoot,
  TimelineItem,
  TimelineConnector,
  TimelineDot,
  TimelineContent,
  TimelineTitle,
  TimelineDescription,
  TimelineTime,
  type TimelineItemStatus,
} from "./timeline"

export interface TimelineItemDef {
  /** Title of the timeline item */
  title: React.ReactNode
  /** Description text */
  description?: React.ReactNode
  /** Time string */
  time?: string
  /** Status of this item */
  status?: TimelineItemStatus
  /** Custom icon override */
  icon?: React.ReactNode
}

export interface TimelineProps
  extends Omit<React.ComponentPropsWithoutRef<typeof TimelineRoot>, "children"> {
  /** Timeline item definitions */
  items: TimelineItemDef[]
}

const Timeline = React.forwardRef<
  React.ElementRef<typeof TimelineRoot>,
  TimelineProps
>(({ items, ...props }, ref) => (
  <TimelineRoot ref={ref} {...props}>
    {items.map((item, index) => {
      const isLast = index === items.length - 1
      return (
        <TimelineItem key={index} status={item.status}>
          <div className="relative flex flex-col items-center">
            <TimelineDot status={item.status} icon={item.icon} />
            {!isLast && <TimelineConnector status={item.status} />}
          </div>
          <TimelineContent>
            <TimelineTitle>{item.title}</TimelineTitle>
            {item.description && (
              <TimelineDescription>{item.description}</TimelineDescription>
            )}
            {item.time && <TimelineTime>{item.time}</TimelineTime>}
          </TimelineContent>
        </TimelineItem>
      )
    })}
  </TimelineRoot>
))
Timeline.displayName = "Timeline"

export const TimelinePrimitives = {
  Root: TimelineRoot,
  Item: TimelineItem,
  Connector: TimelineConnector,
  Dot: TimelineDot,
  Content: TimelineContent,
  Title: TimelineTitle,
  Description: TimelineDescription,
  Time: TimelineTime,
}

export { Timeline }
