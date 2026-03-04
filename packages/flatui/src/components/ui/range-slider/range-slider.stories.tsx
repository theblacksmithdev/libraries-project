import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { RangeSlider } from '.'

const meta: Meta<typeof RangeSlider> = {
  title: 'Inputs/RangeSlider',
  component: RangeSlider,
  parameters: {
    docs: {
      description: {
        component:
          'Dual-handle slider for selecting a numeric range. Wraps Radix UI Slider with two thumbs.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof RangeSlider>

export const Default: Story = {
  render: () => {
    const [value, setValue] = React.useState<[number, number]>([25, 75])
    return (
      <div className="w-80">
        <RangeSlider value={value} onValueChange={setValue} />
        <p className="mt-2 text-sm text-muted-foreground">
          {value[0]} – {value[1]}
        </p>
      </div>
    )
  },
  parameters: {
    docs: {
      source: {
        code: `import { RangeSlider } from '@flatui/react'\n\nconst [value, setValue] = useState<[number, number]>([25, 75])\n<RangeSlider value={value} onValueChange={setValue} />`,
      },
    },
  },
}

export const WithLabels: Story = {
  render: () => {
    const [value, setValue] = React.useState<[number, number]>([20, 80])
    return (
      <div className="w-80 pt-8">
        <RangeSlider value={value} onValueChange={setValue} showLabels />
      </div>
    )
  },
}

export const PriceRange: Story = {
  render: () => {
    const [value, setValue] = React.useState<[number, number]>([100, 500])
    return (
      <div className="w-80 pt-8">
        <RangeSlider
          value={value}
          onValueChange={setValue}
          min={0}
          max={1000}
          step={10}
          showLabels
          formatLabel={(v) => `$${v}`}
        />
      </div>
    )
  },
}

export const CustomStep: Story = {
  render: () => {
    const [value, setValue] = React.useState<[number, number]>([0, 50])
    return (
      <div className="w-80">
        <RangeSlider value={value} onValueChange={setValue} min={0} max={100} step={5} />
        <p className="mt-2 text-sm text-muted-foreground">
          {value[0]}% – {value[1]}%
        </p>
      </div>
    )
  },
}

export const Disabled: Story = {
  render: () => (
    <div className="w-80">
      <RangeSlider defaultValue={[30, 70]} disabled />
    </div>
  ),
}
