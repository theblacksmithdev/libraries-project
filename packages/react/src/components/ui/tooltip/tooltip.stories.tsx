import type { Meta, StoryObj } from '@storybook/react'
import { Tooltip, TooltipPrimitives } from '.'

const meta: Meta<typeof Tooltip> = {
  title: 'Overlay/Tooltip',
  component: Tooltip,
  parameters: {
    docs: {
      description: {
        component: 'A popup that displays information when hovering over an element.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Tooltip>

export const Default: Story = {
  render: () => (
    <Tooltip content="Add to library">
      <button className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm">
        Hover me
      </button>
    </Tooltip>
  ),
  parameters: {
    docs: {
      source: {
        code: `import { Tooltip } from '@blacksmith-ui/react'

<Tooltip content="Add to library">
  <Button variant="outline">Hover me</Button>
</Tooltip>`,
      },
    },
  },
}

export const Primitives: Story = {
  name: 'Compound / Primitives',
  render: () => (
    <TooltipPrimitives.Provider>
      <TooltipPrimitives.Root>
        <TooltipPrimitives.Trigger asChild>
          <button className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm">
            Hover me
          </button>
        </TooltipPrimitives.Trigger>
        <TooltipPrimitives.Content>
          <p>Add to library</p>
        </TooltipPrimitives.Content>
      </TooltipPrimitives.Root>
    </TooltipPrimitives.Provider>
  ),
  parameters: {
    docs: {
      source: {
        code: `import { TooltipPrimitives } from '@blacksmith-ui/react'

<TooltipPrimitives.Provider>
  <TooltipPrimitives.Root>
    <TooltipPrimitives.Trigger asChild>
      <Button variant="outline">Hover me</Button>
    </TooltipPrimitives.Trigger>
    <TooltipPrimitives.Content>
      <p>Add to library</p>
    </TooltipPrimitives.Content>
  </TooltipPrimitives.Root>
</TooltipPrimitives.Provider>`,
      },
    },
  },
}
