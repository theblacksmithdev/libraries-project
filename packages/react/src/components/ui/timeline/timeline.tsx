import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Check, Circle, X } from "lucide-react"

import { cn } from "@/lib/utils"

/* --------------------------------- Variants -------------------------------- */

const timelineDotVariants = cva(
  "relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border [&_svg]:size-4",
  {
    variants: {
      status: {
        completed: "border-primary bg-primary text-primary-foreground",
        active: "border-primary bg-background text-primary",
        upcoming: "border-muted-foreground/25 bg-muted text-muted-foreground",
        error: "border-destructive bg-destructive text-destructive-foreground",
      },
    },
    defaultVariants: { status: "upcoming" },
  }
)

const timelineConnectorVariants = cva("absolute left-1/2 w-0.5 -translate-x-1/2", {
  variants: {
    status: {
      completed: "bg-primary",
      active: "bg-primary",
      upcoming: "bg-border",
      error: "bg-destructive",
    },
  },
  defaultVariants: { status: "upcoming" },
})

/* -------------------------------- Primitives ------------------------------- */

const TimelineRoot = React.forwardRef<
  HTMLOListElement,
  React.HTMLAttributes<HTMLOListElement>
>(({ className, ...props }, ref) => (
  <ol ref={ref} className={cn("space-y-0", className)} {...props} />
))
TimelineRoot.displayName = "TimelineRoot"

export type TimelineItemStatus = "completed" | "active" | "upcoming" | "error"

interface TimelineItemProps extends React.HTMLAttributes<HTMLLIElement> {
  status?: TimelineItemStatus
}

const TimelineItem = React.forwardRef<HTMLLIElement, TimelineItemProps>(
  ({ className, status = "upcoming", children, ...props }, ref) => (
    <li
      ref={ref}
      className={cn("relative flex gap-4", className)}
      data-status={status}
      {...props}
    >
      {children}
    </li>
  )
)
TimelineItem.displayName = "TimelineItem"

interface TimelineConnectorProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof timelineConnectorVariants> {}

const TimelineConnector = React.forwardRef<HTMLDivElement, TimelineConnectorProps>(
  ({ className, status, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(timelineConnectorVariants({ status }), "top-9 h-full", className)}
      {...props}
    />
  )
)
TimelineConnector.displayName = "TimelineConnector"

interface TimelineDotProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof timelineDotVariants> {
  icon?: React.ReactNode
}

const defaultIcons: Record<string, React.ReactNode> = {
  completed: <Check />,
  active: <Circle />,
  upcoming: <Circle />,
  error: <X />,
}

const TimelineDot = React.forwardRef<HTMLDivElement, TimelineDotProps>(
  ({ className, status = "upcoming", icon, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(timelineDotVariants({ status }), className)}
      {...props}
    >
      {icon ?? children ?? defaultIcons[status ?? "upcoming"]}
    </div>
  )
)
TimelineDot.displayName = "TimelineDot"

const TimelineContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex-1 pb-8", className)} {...props} />
))
TimelineContent.displayName = "TimelineContent"

const TimelineTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("text-sm font-semibold leading-9", className)}
    {...props}
  />
))
TimelineTitle.displayName = "TimelineTitle"

const TimelineDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
TimelineDescription.displayName = "TimelineDescription"

const TimelineTime = React.forwardRef<
  HTMLTimeElement,
  React.TimeHTMLAttributes<HTMLTimeElement>
>(({ className, ...props }, ref) => (
  <time
    ref={ref}
    className={cn("text-xs text-muted-foreground", className)}
    {...props}
  />
))
TimelineTime.displayName = "TimelineTime"

export {
  TimelineRoot,
  TimelineItem,
  TimelineConnector,
  TimelineDot,
  TimelineContent,
  TimelineTitle,
  TimelineDescription,
  TimelineTime,
  timelineDotVariants,
  timelineConnectorVariants,
}

export type { TimelineItemProps, TimelineConnectorProps, TimelineDotProps }
