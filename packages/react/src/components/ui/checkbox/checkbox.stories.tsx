import type { Meta, StoryObj } from '@storybook/react'
import { Checkbox } from '.'

const meta: Meta<typeof Checkbox> = {
  title: 'Inputs/Checkbox',
  component: Checkbox,
  parameters: {
    docs: {
      description: {
        component: 'A control that allows the user to toggle between checked and unchecked.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Checkbox>

export const Default: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms" />
      <label htmlFor="terms" className="text-sm font-medium leading-none">
        Accept terms and conditions
      </label>
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `import { Checkbox } from '@blacksmith-ui/react'

<div className="flex items-center space-x-2">
  <Checkbox id="terms" />
  <label htmlFor="terms">Accept terms and conditions</label>
</div>`,
      },
    },
  },
}
