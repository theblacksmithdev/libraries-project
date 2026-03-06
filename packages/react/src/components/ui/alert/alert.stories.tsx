import type { Meta, StoryObj } from '@storybook/react'
import { Alert, AlertPrimitives } from '.'

const meta: Meta<typeof Alert> = {
  title: 'Feedback/Alert',
  component: Alert,
  parameters: {
    docs: {
      description: {
        component: 'Displays a callout for important information.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Alert>

export const Default: Story = {
  render: () => (
    <Alert
      title="Heads up!"
      description="You can add components to your app using the cli."
    />
  ),
  parameters: {
    docs: {
      source: {
        code: `import { Alert } from '@forge-ui/react'

<Alert title="Heads up!" description="You can add components to your app using the cli." />`,
      },
    },
  },
}

export const Destructive: Story = {
  render: () => (
    <Alert
      variant="destructive"
      title="Error"
      description="Your session has expired. Please log in again."
    />
  ),
  parameters: {
    docs: {
      source: {
        code: `import { Alert } from '@forge-ui/react'

<Alert variant="destructive" title="Error" description="Your session has expired. Please log in again." />`,
      },
    },
  },
}

export const Primitives: Story = {
  name: 'Compound / Primitives',
  render: () => (
    <AlertPrimitives.Root>
      <AlertPrimitives.Title>Heads up!</AlertPrimitives.Title>
      <AlertPrimitives.Description>
        You can add components to your app using the cli.
      </AlertPrimitives.Description>
    </AlertPrimitives.Root>
  ),
  parameters: {
    docs: {
      source: {
        code: `import { AlertPrimitives } from '@forge-ui/react'

<AlertPrimitives.Root>
  <AlertPrimitives.Title>Heads up!</AlertPrimitives.Title>
  <AlertPrimitives.Description>
    You can add components to your app using the cli.
  </AlertPrimitives.Description>
</AlertPrimitives.Root>`,
      },
    },
  },
}
