import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { NotificationCenter } from '.'
import { useNotificationCenter, notify } from '@/hooks/use-notification-center'
import type { NotificationVariant } from '@/hooks/use-notification-center'

const meta: Meta<typeof NotificationCenter> = {
  title: 'Feedback/NotificationCenter',
  component: NotificationCenter,
  parameters: {
    docs: {
      description: {
        component:
          'A notification center panel with stacked notifications, powered by a pub/sub hook.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof NotificationCenter>

function seedNotifications() {
  notify({
    title: 'Deployment successful',
    description: 'Your app was deployed to production.',
    variant: 'success',
    timestamp: new Date(Date.now() - 5 * 60 * 1000),
  })
  notify({
    title: 'New comment on PR #42',
    description: 'Alice left a review on your pull request.',
    variant: 'info',
    timestamp: new Date(Date.now() - 30 * 60 * 1000),
  })
  notify({
    title: 'Build warning',
    description: 'Bundle size increased by 12%.',
    variant: 'warning',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
  })
  notify({
    title: 'Failed to sync',
    description: 'Could not connect to the remote server.',
    variant: 'error',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
  })
}

export const Default: Story = {
  render: () => {
    const { dismissAll } = useNotificationCenter()

    React.useEffect(() => {
      dismissAll()
      seedNotifications()
    }, [])

    return <NotificationCenter />
  },
  parameters: {
    docs: {
      source: {
        code: `import { NotificationCenter, notify } from '@flatui/react'

// Add notifications from anywhere
notify({ title: 'Deployed!', variant: 'success' })

// Render the center
<NotificationCenter />`,
      },
    },
  },
}

export const Empty: Story = {
  render: () => {
    const { dismissAll } = useNotificationCenter()
    React.useEffect(() => { dismissAll() }, [])
    return <NotificationCenter />
  },
}

export const Interactive: Story = {
  render: () => {
    const { dismissAll } = useNotificationCenter()

    React.useEffect(() => {
      dismissAll()
    }, [])

    const variants: NotificationVariant[] = ['info', 'success', 'warning', 'error']

    return (
      <div className="flex items-start gap-4">
        <NotificationCenter />
        <div className="flex flex-wrap gap-2">
          {variants.map((variant) => (
            <button
              key={variant}
              className="rounded bg-primary px-3 py-1.5 text-sm text-primary-foreground capitalize"
              onClick={() =>
                notify({
                  title: `${variant} notification`,
                  description: `This is a ${variant} notification.`,
                  variant,
                })
              }
            >
              Add {variant}
            </button>
          ))}
        </div>
      </div>
    )
  },
}

export const AllRead: Story = {
  render: () => {
    const { dismissAll, markAllAsRead } = useNotificationCenter()

    React.useEffect(() => {
      dismissAll()
      seedNotifications()
      // Small delay to allow state updates
      setTimeout(() => markAllAsRead(), 0)
    }, [])

    return <NotificationCenter />
  },
}
