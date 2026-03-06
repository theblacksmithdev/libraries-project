"use client"

import * as React from "react"

export type NotificationVariant = "info" | "success" | "warning" | "error"

export interface Notification {
  id: string
  title: string
  description?: string
  variant: NotificationVariant
  timestamp: Date
  read: boolean
}

const actionTypes = {
  ADD_NOTIFICATION: "ADD_NOTIFICATION",
  DISMISS_NOTIFICATION: "DISMISS_NOTIFICATION",
  DISMISS_ALL: "DISMISS_ALL",
  MARK_AS_READ: "MARK_AS_READ",
  MARK_ALL_AS_READ: "MARK_ALL_AS_READ",
} as const

type ActionType = typeof actionTypes

type Action =
  | { type: ActionType["ADD_NOTIFICATION"]; notification: Notification }
  | { type: ActionType["DISMISS_NOTIFICATION"]; id: string }
  | { type: ActionType["DISMISS_ALL"] }
  | { type: ActionType["MARK_AS_READ"]; id: string }
  | { type: ActionType["MARK_ALL_AS_READ"] }

interface State {
  notifications: Notification[]
}

let count = 0

function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER
  return count.toString()
}

export const notificationReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_NOTIFICATION":
      return {
        ...state,
        notifications: [action.notification, ...state.notifications],
      }
    case "DISMISS_NOTIFICATION":
      return {
        ...state,
        notifications: state.notifications.filter((n) => n.id !== action.id),
      }
    case "DISMISS_ALL":
      return {
        ...state,
        notifications: [],
      }
    case "MARK_AS_READ":
      return {
        ...state,
        notifications: state.notifications.map((n) =>
          n.id === action.id ? { ...n, read: true } : n
        ),
      }
    case "MARK_ALL_AS_READ":
      return {
        ...state,
        notifications: state.notifications.map((n) => ({ ...n, read: true })),
      }
  }
}

const listeners: Array<(state: State) => void> = []

let memoryState: State = { notifications: [] }

function dispatch(action: Action) {
  memoryState = notificationReducer(memoryState, action)
  listeners.forEach((listener) => {
    listener(memoryState)
  })
}

type NotificationInput = Omit<Notification, "id" | "timestamp" | "read"> & {
  timestamp?: Date
  read?: boolean
}

function notify(props: NotificationInput) {
  const id = genId()

  dispatch({
    type: "ADD_NOTIFICATION",
    notification: {
      ...props,
      id,
      timestamp: props.timestamp ?? new Date(),
      read: props.read ?? false,
    },
  })

  return {
    id,
    dismiss: () => dispatch({ type: "DISMISS_NOTIFICATION", id }),
    markAsRead: () => dispatch({ type: "MARK_AS_READ", id }),
  }
}

function useNotificationCenter() {
  const [state, setState] = React.useState<State>(memoryState)

  React.useEffect(() => {
    listeners.push(setState)
    return () => {
      const index = listeners.indexOf(setState)
      if (index > -1) {
        listeners.splice(index, 1)
      }
    }
  }, [state])

  return {
    notifications: state.notifications,
    unreadCount: state.notifications.filter((n) => !n.read).length,
    add: notify,
    dismiss: (id: string) => dispatch({ type: "DISMISS_NOTIFICATION", id }),
    dismissAll: () => dispatch({ type: "DISMISS_ALL" }),
    markAsRead: (id: string) => dispatch({ type: "MARK_AS_READ", id }),
    markAllAsRead: () => dispatch({ type: "MARK_ALL_AS_READ" }),
  }
}

export { useNotificationCenter, notify }
