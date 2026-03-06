import type { Meta, StoryObj } from '@storybook/react'
import { FileX, Inbox, Search } from 'lucide-react'
import { EmptyState } from '.'

const meta: Meta<typeof EmptyState> = {
  title: 'Data Display/EmptyState',
  component: EmptyState,
  parameters: {
    docs: {
      description: {
        component: 'Displays a centered empty state with icon, title, description, and optional action.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof EmptyState>

export const Default: Story = {
  render: () => (
    <EmptyState
      icon={<Inbox />}
      title="No messages"
      description="You don't have any messages yet. Start a conversation to get going."
      action={<button className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground">New message</button>}
    />
  ),
  parameters: {
    docs: {
      source: {
        code: `import { EmptyState } from '@forge-ui/react'
import { Inbox } from 'lucide-react'

<EmptyState
  icon={<Inbox />}
  title="No messages"
  description="You don't have any messages yet."
  action={<Button>New message</Button>}
/>`,
      },
    },
  },
}

export const NoIcon: Story = {
  render: () => (
    <EmptyState
      title="Nothing here"
      description="There are no items to display."
    />
  ),
}

export const WithSearch: Story = {
  render: () => (
    <EmptyState
      icon={<Search />}
      title="No results found"
      description="Try adjusting your search or filter to find what you're looking for."
    />
  ),
}

export const WithError: Story = {
  render: () => (
    <EmptyState
      icon={<FileX />}
      title="Failed to load"
      description="Something went wrong while loading the data."
      action={<button className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm">Retry</button>}
    />
  ),
}
