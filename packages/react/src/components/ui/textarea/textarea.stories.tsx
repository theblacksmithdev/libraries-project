import type { Meta, StoryObj } from '@storybook/react'
import { Textarea } from '.'

const meta: Meta<typeof Textarea> = {
  title: 'Inputs/Textarea',
  component: Textarea,
  parameters: {
    docs: {
      description: {
        component: 'Displays a form textarea field.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Textarea>

export const Default: Story = {
  render: () => (<Textarea placeholder="Type your message here." className="w-[300px]" />
  ),
  parameters: {
    docs: {
      source: {
        code: `import { Textarea } from '@forge-ui/react'

<Textarea placeholder="Type your message here." />`,
      },
    },
  },
}

export const WithLabel: Story = {
  render: () => (
    <div className="grid w-full max-w-sm gap-1.5">
      <label htmlFor="message" className="text-sm font-medium">Your message</label>
      <Textarea placeholder="Type your message here." id="message" />
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `import { Textarea } from '@forge-ui/react'
import { Label } from '@forge-ui/react'

<div className="grid w-full gap-1.5">
  <Label htmlFor="message">Your message</Label>
  <Textarea placeholder="Type your message here." id="message" />
</div>`,
      },
    },
  },
}
