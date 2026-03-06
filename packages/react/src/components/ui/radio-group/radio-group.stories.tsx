import type { Meta, StoryObj } from '@storybook/react'
import { RadioGroup, RadioGroupItem } from '.'

const meta: Meta<typeof RadioGroup> = {
  title: 'Inputs/RadioGroup',
  component: RadioGroup,
  parameters: {
    docs: {
      description: {
        component: 'A set of checkable buttons where only one can be checked at a time.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof RadioGroup>

export const Default: Story = {
  render: () => (
    <RadioGroup defaultValue="comfortable">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="default" id="r1" />
        <label htmlFor="r1" className="text-sm">Default</label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="comfortable" id="r2" />
        <label htmlFor="r2" className="text-sm">Comfortable</label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="compact" id="r3" />
        <label htmlFor="r3" className="text-sm">Compact</label>
      </div>
    </RadioGroup>
  ),
  parameters: {
    docs: {
      source: {
        code: `import { RadioGroup, RadioGroupItem } from '@blacksmith-ui/react'
import { Label } from '@blacksmith-ui/react'

<RadioGroup defaultValue="comfortable">
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="default" id="r1" />
    <Label htmlFor="r1">Default</Label>
  </div>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="comfortable" id="r2" />
    <Label htmlFor="r2">Comfortable</Label>
  </div>
</RadioGroup>`,
      },
    },
  },
}
