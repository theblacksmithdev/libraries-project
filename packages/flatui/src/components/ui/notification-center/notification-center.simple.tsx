"use client"

import * as React from "react"

import {
  NotificationCenterRoot,
  NotificationCenterTrigger,
  NotificationCenterContent,
  NotificationCenterHeader,
  NotificationCenterList,
  NotificationCenterItem,
  NotificationCenterEmpty,
} from "./notification-center"
import { useNotificationCenter } from "@/hooks/use-notification-center"

export interface NotificationCenterProps {
  /** Custom trigger element (defaults to Bell icon) */
  trigger?: React.ReactNode
  /** Panel header title */
  title?: string
  /** Maximum notifications visible in the list */
  maxVisible?: number
  /** Custom empty state content */
  emptyState?: React.ReactNode
  /** Controlled open state */
  open?: boolean
  /** Callback when open state changes */
  onOpenChange?: (open: boolean) => void
}

const NotificationCenter = ({
  trigger,
  title = "Notifications",
  maxVisible = 50,
  emptyState = "No notifications",
  open,
  onOpenChange,
}: NotificationCenterProps) => {
  const {
    notifications,
    unreadCount,
    dismiss,
    dismissAll,
    markAllAsRead,
  } = useNotificationCenter()

  const visibleNotifications = notifications.slice(0, maxVisible)

  return (
    <NotificationCenterRoot open={open} onOpenChange={onOpenChange}>
      <NotificationCenterTrigger unreadCount={unreadCount}>
        {trigger}
      </NotificationCenterTrigger>

      <NotificationCenterContent>
        <NotificationCenterHeader>
          <h3 className="text-sm font-semibold">{title}</h3>
          <div className="flex gap-2">
            {unreadCount > 0 && (
              <button
                type="button"
                onClick={markAllAsRead}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                Mark all as read
              </button>
            )}
            {notifications.length > 0 && (
              <button
                type="button"
                onClick={dismissAll}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                Clear all
              </button>
            )}
          </div>
        </NotificationCenterHeader>

        {visibleNotifications.length === 0 ? (
          <NotificationCenterEmpty>{emptyState}</NotificationCenterEmpty>
        ) : (
          <NotificationCenterList>
            {visibleNotifications.map((notification) => (
              <NotificationCenterItem
                key={notification.id}
                notification={notification}
                onDismiss={dismiss}
              />
            ))}
          </NotificationCenterList>
        )}
      </NotificationCenterContent>
    </NotificationCenterRoot>
  )
}
NotificationCenter.displayName = "NotificationCenter"

export const NotificationCenterPrimitives = {
  Root: NotificationCenterRoot,
  Trigger: NotificationCenterTrigger,
  Content: NotificationCenterContent,
  Header: NotificationCenterHeader,
  List: NotificationCenterList,
  Item: NotificationCenterItem,
  Empty: NotificationCenterEmpty,
}

export { NotificationCenter }
