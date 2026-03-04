import { renderHook, act } from '@testing-library/react'
import { useNotificationCenter, notify, notificationReducer } from './use-notification-center'
import type { Notification } from './use-notification-center'

// Reset module state between tests
beforeEach(() => {
  // Dismiss all to reset state
  const { result } = renderHook(() => useNotificationCenter())
  act(() => {
    result.current.dismissAll()
  })
})

describe('useNotificationCenter', () => {
  it('starts with empty notifications', () => {
    const { result } = renderHook(() => useNotificationCenter())
    expect(result.current.notifications).toHaveLength(0)
    expect(result.current.unreadCount).toBe(0)
  })

  it('adds a notification', () => {
    const { result } = renderHook(() => useNotificationCenter())

    act(() => {
      result.current.add({ title: 'Test', variant: 'info' })
    })

    expect(result.current.notifications).toHaveLength(1)
    expect(result.current.notifications[0].title).toBe('Test')
    expect(result.current.notifications[0].variant).toBe('info')
    expect(result.current.notifications[0].read).toBe(false)
  })

  it('dismisses a notification', () => {
    const { result } = renderHook(() => useNotificationCenter())

    let id: string
    act(() => {
      const n = result.current.add({ title: 'Dismiss me', variant: 'warning' })
      id = n.id
    })

    act(() => {
      result.current.dismiss(id!)
    })

    expect(result.current.notifications).toHaveLength(0)
  })

  it('dismisses all notifications', () => {
    const { result } = renderHook(() => useNotificationCenter())

    act(() => {
      result.current.add({ title: 'A', variant: 'info' })
      result.current.add({ title: 'B', variant: 'success' })
      result.current.add({ title: 'C', variant: 'error' })
    })

    expect(result.current.notifications).toHaveLength(3)

    act(() => {
      result.current.dismissAll()
    })

    expect(result.current.notifications).toHaveLength(0)
  })

  it('marks a notification as read', () => {
    const { result } = renderHook(() => useNotificationCenter())

    let id: string
    act(() => {
      const n = result.current.add({ title: 'Read me', variant: 'info' })
      id = n.id
    })

    expect(result.current.unreadCount).toBe(1)

    act(() => {
      result.current.markAsRead(id!)
    })

    expect(result.current.notifications[0].read).toBe(true)
    expect(result.current.unreadCount).toBe(0)
  })

  it('marks all as read', () => {
    const { result } = renderHook(() => useNotificationCenter())

    act(() => {
      result.current.add({ title: 'A', variant: 'info' })
      result.current.add({ title: 'B', variant: 'success' })
    })

    expect(result.current.unreadCount).toBe(2)

    act(() => {
      result.current.markAllAsRead()
    })

    expect(result.current.unreadCount).toBe(0)
    expect(result.current.notifications.every((n) => n.read)).toBe(true)
  })

  it('computes unreadCount correctly', () => {
    const { result } = renderHook(() => useNotificationCenter())

    act(() => {
      result.current.add({ title: 'A', variant: 'info' })
      result.current.add({ title: 'B', variant: 'info' })
      result.current.add({ title: 'C', variant: 'info' })
    })

    expect(result.current.unreadCount).toBe(3)

    act(() => {
      result.current.markAsRead(result.current.notifications[0].id)
    })

    expect(result.current.unreadCount).toBe(2)
  })

  it('prepends new notifications (newest first)', () => {
    const { result } = renderHook(() => useNotificationCenter())

    act(() => {
      result.current.add({ title: 'First', variant: 'info' })
    })
    act(() => {
      result.current.add({ title: 'Second', variant: 'info' })
    })

    expect(result.current.notifications[0].title).toBe('Second')
    expect(result.current.notifications[1].title).toBe('First')
  })
})

describe('notify (imperative)', () => {
  beforeEach(() => {
    const { result } = renderHook(() => useNotificationCenter())
    act(() => {
      result.current.dismissAll()
    })
  })

  it('adds notification imperatively', () => {
    const { result } = renderHook(() => useNotificationCenter())

    act(() => {
      notify({ title: 'Imperative', variant: 'success' })
    })

    expect(result.current.notifications).toHaveLength(1)
    expect(result.current.notifications[0].title).toBe('Imperative')
  })

  it('returns dismiss and markAsRead helpers', () => {
    const { result } = renderHook(() => useNotificationCenter())

    let helpers: ReturnType<typeof notify>
    act(() => {
      helpers = notify({ title: 'Helpers', variant: 'info' })
    })

    expect(result.current.notifications).toHaveLength(1)

    act(() => {
      helpers.markAsRead()
    })

    expect(result.current.notifications[0].read).toBe(true)

    act(() => {
      helpers.dismiss()
    })

    expect(result.current.notifications).toHaveLength(0)
  })
})

describe('notificationReducer', () => {
  const makeNotification = (overrides?: Partial<Notification>): Notification => ({
    id: '1',
    title: 'Test',
    variant: 'info',
    timestamp: new Date(),
    read: false,
    ...overrides,
  })

  it('handles ADD_NOTIFICATION', () => {
    const notification = makeNotification()
    const state = notificationReducer({ notifications: [] }, { type: 'ADD_NOTIFICATION', notification })
    expect(state.notifications).toHaveLength(1)
  })

  it('handles DISMISS_NOTIFICATION', () => {
    const notification = makeNotification()
    const state = notificationReducer(
      { notifications: [notification] },
      { type: 'DISMISS_NOTIFICATION', id: '1' }
    )
    expect(state.notifications).toHaveLength(0)
  })

  it('handles DISMISS_ALL', () => {
    const state = notificationReducer(
      { notifications: [makeNotification({ id: '1' }), makeNotification({ id: '2' })] },
      { type: 'DISMISS_ALL' }
    )
    expect(state.notifications).toHaveLength(0)
  })

  it('handles MARK_AS_READ', () => {
    const state = notificationReducer(
      { notifications: [makeNotification({ id: '1', read: false })] },
      { type: 'MARK_AS_READ', id: '1' }
    )
    expect(state.notifications[0].read).toBe(true)
  })

  it('handles MARK_ALL_AS_READ', () => {
    const state = notificationReducer(
      {
        notifications: [
          makeNotification({ id: '1', read: false }),
          makeNotification({ id: '2', read: false }),
        ],
      },
      { type: 'MARK_ALL_AS_READ' }
    )
    expect(state.notifications.every((n) => n.read)).toBe(true)
  })
})
