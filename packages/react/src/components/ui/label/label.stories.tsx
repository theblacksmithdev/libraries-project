import type { Meta, StoryObj } from '@storybook/react'
import { Label } from '.'

const meta: Meta<typeof Label> = {
  title: 'Inputs/Label',
  component: Label,
  parameters: {
    docs: {
      description: {
        component: 'Renders an accessible label associated with controls.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Label>

export const Default: Story = {
  render: () => (<Label htmlFor="email">Your email address</Label>
  ),
  parameters: {
    docs: {
      source: {
        code: `import { Label } from '@blacksmith-ui/react'

<Label htmlFor="email">Your email address</Label>`,
      },
    },
  },
}
