import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { NumberInput } from '.'

const meta: Meta<typeof NumberInput> = {
  title: 'Inputs/NumberInput',
  component: NumberInput,
  parameters: {
    docs: {
      description: {
        component:
          'Increment/decrement number field with stepper buttons. Supports inline (chevron) and split (plus/minus) stepper styles.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof NumberInput>

export const Default: Story = {
  render: () => {
    const [value, setValue] = React.useState(5)
    return (
      <div className="w-32">
        <NumberInput value={value} onChange={setValue} />
      </div>
    )
  },
  parameters: {
    docs: {
      source: {
        code: `import { NumberInput } from '@blacksmith-ui/react'\n\nconst [value, setValue] = useState(5)\n<NumberInput value={value} onChange={setValue} />`,
      },
    },
  },
}

export const SplitStepper: Story = {
  render: () => {
    const [value, setValue] = React.useState(1)
    return (
      <div className="w-32">
        <NumberInput value={value} onChange={setValue} stepper="split" min={0} max={10} />
      </div>
    )
  },
}

export const WithMinMax: Story = {
  render: () => {
    const [value, setValue] = React.useState(0)
    return (
      <div className="w-32">
        <NumberInput value={value} onChange={setValue} min={0} max={100} step={5} />
      </div>
    )
  },
}

export const Sizes: Story = {
  render: () => {
    const [v1, setV1] = React.useState(1)
    const [v2, setV2] = React.useState(2)
    const [v3, setV3] = React.useState(3)
    return (
      <div className="flex items-end gap-4">
        <div className="w-24">
          <p className="text-xs text-muted-foreground mb-1">sm</p>
          <NumberInput size="sm" value={v1} onChange={setV1} />
        </div>
        <div className="w-24">
          <p className="text-xs text-muted-foreground mb-1">default</p>
          <NumberInput value={v2} onChange={setV2} />
        </div>
        <div className="w-24">
          <p className="text-xs text-muted-foreground mb-1">lg</p>
          <NumberInput size="lg" value={v3} onChange={setV3} />
        </div>
      </div>
    )
  },
}

export const Disabled: Story = {
  render: () => (
    <div className="w-32">
      <NumberInput value={42} disabled />
    </div>
  ),
}
