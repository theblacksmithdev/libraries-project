import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { ColorPicker } from '.'

const meta: Meta<typeof ColorPicker> = {
  title: 'Inputs/ColorPicker',
  component: ColorPicker,
  parameters: {
    docs: {
      description: {
        component:
          'Color selection input with swatch grid, native color picker, and hex text input.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof ColorPicker>

export const Default: Story = {
  render: () => {
    const [color, setColor] = React.useState('#3b82f6')
    return <ColorPicker value={color} onChange={setColor} />
  },
  parameters: {
    docs: {
      source: {
        code: `import { ColorPicker } from '@flatui/react'\n\nconst [color, setColor] = useState('#3b82f6')\n<ColorPicker value={color} onChange={setColor} />`,
      },
    },
  },
}

export const NoValue: Story = {
  render: () => {
    const [color, setColor] = React.useState('')
    return <ColorPicker value={color} onChange={setColor} />
  },
}

export const CustomSwatches: Story = {
  render: () => {
    const [color, setColor] = React.useState('#1e293b')
    return (
      <ColorPicker
        value={color}
        onChange={setColor}
        swatches={[
          '#0f172a', '#1e293b', '#334155', '#475569',
          '#64748b', '#94a3b8', '#cbd5e1', '#f1f5f9',
        ]}
      />
    )
  },
}

export const Disabled: Story = {
  render: () => <ColorPicker value="#ef4444" disabled />,
}
