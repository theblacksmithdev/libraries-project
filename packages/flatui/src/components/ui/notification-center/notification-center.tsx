"use client"

import * as React from "react"
import * as PopoverPrimitive from "@radix-ui/react-popover"
import { Bell, X } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import type { Notification } from "@/hooks/use-notification-center"

const NotificationCenterRoot = PopoverPrimitive.Root

const NotificationCenterTrigger = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Trigger> & {
    unreadCount?: number
  }
>(({ className, unreadCount = 0, children, ...props }, ref) => (
  <PopoverPrimitive.Trigger
    ref={ref}
    aria-label="Notifications"
    className={cn(
      "relative inline-flex items-center justify-center rounded-md p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring",
      className
    )}
    {...props}
  >
    {children ?? <Bell className="h-5 w-5" />}
    {unreadCount > 0 && (
      <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-medium text-destructive-foreground">
        {unreadCount > 99 ? "99+" : unreadCount}
      </span>
    )}
  </PopoverPrimitive.Trigger>
))
NotificationCenterTrigger.displayName = "NotificationCenterTrigger"

const NotificationCenterContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = "end", sideOffset = 4, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        "z-50 w-80 rounded-md border bg-popover text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
        className
      )}
      {...props}
    />
  </PopoverPrimitive.Portal>
))
NotificationCenterContent.displayName = "NotificationCenterContent"

const NotificationCenterHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex items-center justify-between border-b px-4 py-3",
      className
    )}
    {...props}
  />
)
NotificationCenterHeader.displayName = "NotificationCenterHeader"

const NotificationCenterList = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    role="list"
    className={cn("max-h-80 overflow-y-auto", className)}
    {...props}
  />
))
NotificationCenterList.displayName = "NotificationCenterList"

const NotificationCenterEmpty = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col items-center justify-center py-8 text-sm text-muted-foreground",
      className
    )}
    {...props}
  />
)
NotificationCenterEmpty.displayName = "NotificationCenterEmpty"

const notificationItemVariants = cva(
  "relative flex gap-3 border-b px-4 py-3 text-sm transition-colors last:border-b-0",
  {
    variants: {
      variant: {
        info: "border-l-2 border-l-blue-500",
        success: "border-l-2 border-l-emerald-500",
        warning: "border-l-2 border-l-amber-500",
        error: "border-l-2 border-l-red-500",
      },
      read: {
        true: "bg-popover",
        false: "bg-accent/50",
      },
    },
    defaultVariants: {
      variant: "info",
      read: false,
    },
  }
)

interface NotificationCenterItemProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof notificationItemVariants> {
  notification: Notification
  onDismiss?: (id: string) => void
}

const NotificationCenterItem = React.forwardRef<
  HTMLDivElement,
  NotificationCenterItemProps
>(({ className, notification, onDismiss, ...props }, ref) => {
  const timeAgo = getRelativeTime(notification.timestamp)

  return (
    <div
      ref={ref}
      role="listitem"
      className={cn(
        notificationItemVariants({
          variant: notification.variant,
          read: notification.read,
        }),
        className
      )}
      {...props}
    >
      {!notification.read && (
        <span className="absolute left-1 top-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full bg-primary" />
      )}
      <div className="flex-1 space-y-1">
        <p className="font-medium leading-none">{notification.title}</p>
        {notification.description && (
          <p className="text-muted-foreground">{notification.description}</p>
        )}
        <p className="text-xs text-muted-foreground">{timeAgo}</p>
      </div>
      {onDismiss && (
        <button
          type="button"
          aria-label="Dismiss notification"
          onClick={(e) => {
            e.stopPropagation()
            onDismiss(notification.id)
          }}
          className="shrink-0 rounded-sm text-muted-foreground/50 transition-colors hover:text-muted-foreground"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  )
})
NotificationCenterItem.displayName = "NotificationCenterItem"

function getRelativeTime(date: Date): string {
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffSec = Math.floor(diffMs / 1000)
  const diffMin = Math.floor(diffSec / 60)
  const diffHour = Math.floor(diffMin / 60)
  const diffDay = Math.floor(diffHour / 24)

  if (diffSec < 60) return "Just now"
  if (diffMin < 60) return `${diffMin}m ago`
  if (diffHour < 24) return `${diffHour}h ago`
  if (diffDay < 7) return `${diffDay}d ago`
  return date.toLocaleDateString()
}

export {
  NotificationCenterRoot,
  NotificationCenterTrigger,
  NotificationCenterContent,
  NotificationCenterHeader,
  NotificationCenterList,
  NotificationCenterItem,
  NotificationCenterEmpty,
  notificationItemVariants,
}
