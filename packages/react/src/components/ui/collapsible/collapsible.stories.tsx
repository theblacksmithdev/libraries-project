import type { Meta, StoryObj } from '@storybook/react'
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '.'
import * as React from 'react'

function CollapsibleDemo() {
  const [isOpen, setIsOpen] = React.useState(false)
  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-[350px] space-y-2">
      <div className="flex items-center justify-between space-x-4">
        <h4 className="text-sm font-semibold">Starred repositories</h4>
        <CollapsibleTrigger asChild>
          <button className="inline-flex items-center justify-center rounded-md border border-input bg-background px-2 py-1 text-sm">
            {isOpen ? 'Close' : 'Open'}
          </button>
        </CollapsibleTrigger>
      </div>
      <div className="rounded-md border px-4 py-3 text-sm">@radix-ui/primitives</div>
      <CollapsibleContent className="space-y-2">
        <div className="rounded-md border px-4 py-3 text-sm">@radix-ui/colors</div>
        <div className="rounded-md border px-4 py-3 text-sm">@stitches/react</div>
      </CollapsibleContent>
    </Collapsible>
  )
}
const meta: Meta<typeof Collapsible> = {
  title: 'Navigation/Collapsible',
  component: Collapsible,
  parameters: {
    docs: {
      description: {
        component: 'An interactive component which expands and collapses content.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Collapsible>

export const Default: Story = {
  render: () => (
    <CollapsibleDemo />
  ),
  parameters: {
    docs: {
      source: {
        code: `import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@forge-ui/react'

const [isOpen, setIsOpen] = React.useState(false)

<Collapsible open={isOpen} onOpenChange={setIsOpen}>
  <CollapsibleTrigger asChild>
    <Button variant="ghost">Toggle</Button>
  </CollapsibleTrigger>
  <CollapsibleContent>
    <p>This content can be collapsed.</p>
  </CollapsibleContent>
</Collapsible>`,
      },
    },
  },
}
