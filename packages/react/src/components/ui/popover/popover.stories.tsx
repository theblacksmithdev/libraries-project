import type { Meta, StoryObj } from '@storybook/react'
import { Popover, PopoverPrimitives } from '.'

const meta: Meta<typeof Popover> = {
  title: 'Overlay/Popover',
  component: Popover,
  parameters: {
    docs: {
      description: {
        component: 'Displays floating content anchored to a trigger.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Popover>

export const Default: Story = {
  render: () => (
    <Popover
      trigger={
        <button className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm">
          Open Popover
        </button>
      }
    >
      <div className="grid gap-4">
        <div className="space-y-2">
          <h4 className="font-medium leading-none">Dimensions</h4>
          <p className="text-sm text-muted-foreground">Set the dimensions for the layer.</p>
        </div>
      </div>
    </Popover>
  ),
  parameters: {
    docs: {
      source: {
        code: `import { Popover } from '@forge-ui/react'

<Popover trigger={<Button variant="outline">Open Popover</Button>}>
  <h4>Dimensions</h4>
  <p>Set the dimensions for the layer.</p>
</Popover>`,
      },
    },
  },
}

export const Primitives: Story = {
  name: 'Compound / Primitives',
  render: () => (
    <PopoverPrimitives.Root>
      <PopoverPrimitives.Trigger asChild>
        <button className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm">
          Open Popover
        </button>
      </PopoverPrimitives.Trigger>
      <PopoverPrimitives.Content className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Dimensions</h4>
            <p className="text-sm text-muted-foreground">Set the dimensions for the layer.</p>
          </div>
        </div>
      </PopoverPrimitives.Content>
    </PopoverPrimitives.Root>
  ),
}
