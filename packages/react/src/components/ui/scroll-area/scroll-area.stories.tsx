import type { Meta, StoryObj } from '@storybook/react'
import { ScrollArea } from '.'

const meta: Meta<typeof ScrollArea> = {
  title: 'Layout/ScrollArea',
  component: ScrollArea,
  parameters: {
    docs: {
      description: {
        component: 'Augments native scroll functionality with custom scrollbars.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof ScrollArea>

export const Default: Story = {
  render: () => (
    <ScrollArea className="h-72 w-48 rounded-md border">
      <div className="p-4">
        <h4 className="mb-4 text-sm font-medium leading-none">Tags</h4>
        {Array.from({ length: 50 }).map((_, i) => (
          <div key={i} className="text-sm py-1">
            Tag {i + 1}
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
  parameters: {
    docs: {
      source: {
        code: `import { ScrollArea } from '@forge-ui/react'

<ScrollArea className="h-72 w-48 rounded-md border">
  <div className="p-4">
    {items.map((tag) => (
      <div key={tag} className="text-sm">{tag}</div>
    ))}
  </div>
</ScrollArea>`,
      },
    },
  },
}
