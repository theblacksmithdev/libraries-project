import type { Meta, StoryObj } from '@storybook/react'
import { Card, CardPrimitives } from '.'

const meta: Meta<typeof Card> = {
  title: 'Data Display/Card',
  component: Card,
  parameters: {
    docs: {
      description: {
        component: 'Displays a card with header, content, and footer.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Card>

export const Default: Story = {
  render: () => (
    <Card
      className="w-[350px]"
      title="Create project"
      description="Deploy your new project in one-click."
      footer={
        <div className="flex justify-between w-full">
          <button className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm">Cancel</button>
          <button className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground">Deploy</button>
        </div>
      }
    >
      <p className="text-sm text-muted-foreground">
        Your new project will be created with default settings.
        You can customize everything later.
      </p>
    </Card>
  ),
  parameters: {
    docs: {
      source: {
        code: `import { Card } from '@forge-ui/react'

<Card
  title="Create project"
  description="Deploy your new project in one-click."
  footer={<Button>Deploy</Button>}
>
  <p>Your new project will be created with default settings.</p>
</Card>`,
      },
    },
  },
}

export const Primitives: Story = {
  name: 'Compound / Primitives',
  render: () => (
    <CardPrimitives.Root className="w-[350px]">
      <CardPrimitives.Header>
        <CardPrimitives.Title>Create project</CardPrimitives.Title>
        <CardPrimitives.Description>Deploy your new project in one-click.</CardPrimitives.Description>
      </CardPrimitives.Header>
      <CardPrimitives.Content>
        <p className="text-sm text-muted-foreground">
          Your new project will be created with default settings.
        </p>
      </CardPrimitives.Content>
      <CardPrimitives.Footer>
        <button className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground">Deploy</button>
      </CardPrimitives.Footer>
    </CardPrimitives.Root>
  ),
  parameters: {
    docs: {
      source: {
        code: `import { CardPrimitives } from '@forge-ui/react'

<CardPrimitives.Root>
  <CardPrimitives.Header>
    <CardPrimitives.Title>Create project</CardPrimitives.Title>
    <CardPrimitives.Description>Deploy your new project in one-click.</CardPrimitives.Description>
  </CardPrimitives.Header>
  <CardPrimitives.Content>Content here</CardPrimitives.Content>
  <CardPrimitives.Footer>
    <Button>Deploy</Button>
  </CardPrimitives.Footer>
</CardPrimitives.Root>`,
      },
    },
  },
}
