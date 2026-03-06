import type { Meta, StoryObj } from '@storybook/react'
import { Slider } from '.'

const meta: Meta<typeof Slider> = {
  title: 'Inputs/Slider',
  component: Slider,
  parameters: {
    docs: {
      description: {
        component: 'An input where the user selects a value from within a range.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Slider>

export const Default: Story = {
  render: () => (<Slider defaultValue={[50]} max={100} step={1} className="w-[60%]" />
  ),
  parameters: {
    docs: {
      source: {
        code: `import { Slider } from '@forge-ui/react'

<Slider defaultValue={[50]} max={100} step={1} />`,
      },
    },
  },
}
