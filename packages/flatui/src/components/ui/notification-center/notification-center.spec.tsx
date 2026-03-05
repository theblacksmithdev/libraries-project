import { render, screen, fireEvent, renderHook } from '@testing-library/react'
import { act } from 'react'
import { NotificationCenter } from '.'
import { useNotificationCenter, notify } from '@/hooks/use-notification-center'

// Helper to reset notification state
function resetNotifications() {
  const { result } = renderHook(() =>
    useNotificationCenter()
  )
  act(() => {
    result.current.dismissAll()
  })
}

beforeEach(() => {
  resetNotifications()
})

describe('NotificationCenter', () => {
  it('renders the trigger button', () => {
    render(<NotificationCenter />)
    expect(screen.getByLabelText('Notifications')).toBeInTheDocument()
  })

  it('shows unread badge when there are unread notifications', () => {
    act(() => {
      notify({ title: 'Test', variant: 'info' })
    })

    render(<NotificationCenter />)
    expect(screen.getByText('1')).toBeInTheDocument()
  })

  it('opens the panel when trigger is clicked', () => {
    act(() => {
      notify({ title: 'Hello World', variant: 'info' })
    })

    render(<NotificationCenter />)
    fireEvent.click(screen.getByLabelText('Notifications'))
    expect(screen.getByText('Notifications')).toBeInTheDocument()
    expect(screen.getByText('Hello World')).toBeInTheDocument()
  })

  it('renders notification items', () => {
    act(() => {
      notify({ title: 'First', variant: 'info', description: 'First desc' })
      notify({ title: 'Second', variant: 'success' })
    })

    render(<NotificationCenter />)
    fireEvent.click(screen.getByLabelText('Notifications'))

    expect(screen.getByText('First')).toBeInTheDocument()
    expect(screen.getByText('First desc')).toBeInTheDocument()
    expect(screen.getByText('Second')).toBeInTheDocument()
  })

  it('dismisses a notification via X button', () => {
    act(() => {
      notify({ title: 'Dismiss me', variant: 'warning' })
    })

    render(<NotificationCenter />)
    fireEvent.click(screen.getByLabelText('Notifications'))

    expect(screen.getByText('Dismiss me')).toBeInTheDocument()

    fireEvent.click(screen.getByLabelText('Dismiss notification'))

    expect(screen.queryByText('Dismiss me')).not.toBeInTheDocument()
  })

  it('shows empty state when no notifications', () => {
    render(<NotificationCenter />)
    fireEvent.click(screen.getByLabelText('Notifications'))
    expect(screen.getByText('No notifications')).toBeInTheDocument()
  })

  it('shows custom empty state', () => {
    render(<NotificationCenter emptyState="All caught up!" />)
    fireEvent.click(screen.getByLabelText('Notifications'))
    expect(screen.getByText('All caught up!')).toBeInTheDocument()
  })

  it('clears all notifications', () => {
    act(() => {
      notify({ title: 'A', variant: 'info' })
      notify({ title: 'B', variant: 'info' })
    })

    render(<NotificationCenter />)
    fireEvent.click(screen.getByLabelText('Notifications'))

    fireEvent.click(screen.getByText('Clear all'))

    expect(screen.getByText('No notifications')).toBeInTheDocument()
  })

  it('marks all as read', () => {
    act(() => {
      notify({ title: 'Unread', variant: 'info' })
    })

    render(<NotificationCenter />)
    fireEvent.click(screen.getByLabelText('Notifications'))

    expect(screen.getByText('Mark all as read')).toBeInTheDocument()
    fireEvent.click(screen.getByText('Mark all as read'))

    // After marking all as read, the "Mark all as read" button should disappear
    expect(screen.queryByText('Mark all as read')).not.toBeInTheDocument()
  })

  it('uses custom title', () => {
    render(<NotificationCenter title="Alerts" />)
    fireEvent.click(screen.getByLabelText('Notifications'))
    expect(screen.getByText('Alerts')).toBeInTheDocument()
  })
})
