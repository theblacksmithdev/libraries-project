import type { Meta, StoryObj } from '@storybook/react'
import { Input } from '.'

const meta: Meta<typeof Input> = {
  title: 'Inputs/Input',
  component: Input,
  parameters: {
    docs: {
      description: {
        component: 'Displays a form input field.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Input>

export const Default: Story = {
  render: () => (<Input type="email" placeholder="Email" className="w-[300px]" />
  ),
  parameters: {
    docs: {
      source: {
        code: `import { Input } from '@forge-ui/react'

<Input type="email" placeholder="Email" />`,
      },
    },
  },
}

export const Disabled: Story = {
  render: () => (<Input disabled placeholder="Disabled" className="w-[300px]" />
  ),
  parameters: {
    docs: {
      source: {
        code: `<Input disabled placeholder="Disabled" />`,
      },
    },
  },
}

export const WithLabel: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <label htmlFor="email" className="text-sm font-medium">Email</label>
      <Input type="email" id="email" placeholder="Email" />
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `import { Input } from '@forge-ui/react'
import { Label } from '@forge-ui/react'

<div className="grid w-full max-w-sm gap-1.5">
  <Label htmlFor="email">Email</Label>
  <Input type="email" id="email" placeholder="Email" />
</div>`,
      },
    },
  },
}
