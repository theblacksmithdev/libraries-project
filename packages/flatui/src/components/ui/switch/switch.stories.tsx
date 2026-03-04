import type { Meta, StoryObj } from '@storybook/react'
import { Switch } from '.'

const meta: Meta<typeof Switch> = {
  title: 'Inputs/Switch',
  component: Switch,
  parameters: {
    docs: {
      description: {
        component: 'A control that allows the user to toggle between on and off.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Switch>

export const Default: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Switch id="airplane-mode" />
      <label htmlFor="airplane-mode" className="text-sm">Airplane Mode</label>
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `import { Switch } from '@flatui/react'
import { Label } from '@flatui/react'

<div className="flex items-center space-x-2">
  <Switch id="airplane-mode" />
  <Label htmlFor="airplane-mode">Airplane Mode</Label>
</div>`,
      },
    },
  },
}
