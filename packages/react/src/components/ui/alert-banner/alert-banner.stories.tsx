import type { Meta, StoryObj } from '@storybook/react'
import { AlertBanner } from '.'
import { Button } from '../button'

const meta: Meta<typeof AlertBanner> = {
  title: 'Feedback/AlertBanner',
  component: AlertBanner,
  parameters: {
    docs: {
      description: {
        component:
          'Full-width persistent or dismissible banner for status messages. Distinct from the inline Alert component.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof AlertBanner>

export const Default: Story = {
  render: () => (
    <AlertBanner title="New update available">
      A new version has been released. Please refresh to update.
    </AlertBanner>
  ),
  parameters: {
    docs: {
      source: {
        code: `import { AlertBanner } from '@forge-ui/react'\n\n<AlertBanner title="New update available">\n  A new version has been released.\n</AlertBanner>`,
      },
    },
  },
}

export const Success: Story = {
  render: () => (
    <AlertBanner variant="success" title="Changes saved">
      Your changes have been saved successfully.
    </AlertBanner>
  ),
}

export const Warning: Story = {
  render: () => (
    <AlertBanner variant="warning" title="Rate limit approaching">
      You have used 90% of your API quota this month.
    </AlertBanner>
  ),
}

export const Error: Story = {
  render: () => (
    <AlertBanner variant="error" title="Connection lost">
      Unable to connect to the server. Please check your network.
    </AlertBanner>
  ),
}

export const Dismissible: Story = {
  render: () => (
    <AlertBanner
      variant="info"
      title="Scheduled maintenance"
      dismissible
      onDismiss={() => alert('Dismissed!')}
    >
      The system will be down for maintenance on Saturday.
    </AlertBanner>
  ),
}

export const WithAction: Story = {
  render: () => (
    <AlertBanner
      variant="warning"
      title="Trial expiring soon"
      action={
        <Button size="sm" variant="outline">
          Upgrade
        </Button>
      }
    >
      Your trial expires in 3 days.
    </AlertBanner>
  ),
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col">
      <AlertBanner variant="info" title="Info banner">
        Informational message.
      </AlertBanner>
      <AlertBanner variant="success" title="Success banner">
        Operation completed.
      </AlertBanner>
      <AlertBanner variant="warning" title="Warning banner">
        Proceed with caution.
      </AlertBanner>
      <AlertBanner variant="error" title="Error banner">
        Something went wrong.
      </AlertBanner>
    </div>
  ),
}
