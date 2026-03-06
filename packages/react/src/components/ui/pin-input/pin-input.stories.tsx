import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { PinInput } from '.'

const meta: Meta<typeof PinInput> = {
  title: 'Inputs/PinInput',
  component: PinInput,
  parameters: {
    docs: {
      description: {
        component:
          'Pin/OTP code input with customizable length, masking, separators, and size variants. Alternative to InputOTP with more built-in customization.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof PinInput>

export const Default: Story = {
  render: () => {
    const [value, setValue] = React.useState('')
    return (
      <div className="space-y-2">
        <PinInput value={value} onChange={setValue} />
        <p className="text-sm text-muted-foreground">Value: {value || '(empty)'}</p>
      </div>
    )
  },
  parameters: {
    docs: {
      source: {
        code: `import { PinInput } from '@blacksmith-ui/react'\n\nconst [value, setValue] = useState('')\n<PinInput value={value} onChange={setValue} />`,
      },
    },
  },
}

export const FourDigit: Story = {
  render: () => {
    const [value, setValue] = React.useState('')
    return <PinInput value={value} onChange={setValue} length={4} />
  },
}

export const WithSeparator: Story = {
  render: () => {
    const [value, setValue] = React.useState('')
    return <PinInput value={value} onChange={setValue} separatorAfter={[2]} />
  },
}

export const Masked: Story = {
  render: () => {
    const [value, setValue] = React.useState('')
    return <PinInput value={value} onChange={setValue} length={4} mask />
  },
}

export const Alphanumeric: Story = {
  render: () => {
    const [value, setValue] = React.useState('')
    return <PinInput value={value} onChange={setValue} type="alphanumeric" />
  },
}

export const Sizes: Story = {
  render: () => {
    const [v1, setV1] = React.useState('123')
    const [v2, setV2] = React.useState('456')
    const [v3, setV3] = React.useState('789')
    return (
      <div className="space-y-4">
        <div>
          <p className="text-xs text-muted-foreground mb-1">sm</p>
          <PinInput size="sm" length={4} value={v1} onChange={setV1} />
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">default</p>
          <PinInput length={4} value={v2} onChange={setV2} />
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">lg</p>
          <PinInput size="lg" length={4} value={v3} onChange={setV3} />
        </div>
      </div>
    )
  },
}

export const FilledVariant: Story = {
  render: () => {
    const [value, setValue] = React.useState('')
    return <PinInput value={value} onChange={setValue} variant="filled" length={4} />
  },
}

export const WithAutoFocus: Story = {
  render: () => {
    const [value, setValue] = React.useState('')
    return <PinInput value={value} onChange={setValue} autoFocus length={4} />
  },
}

export const Disabled: Story = {
  render: () => <PinInput value="1234" length={4} disabled />,
}

export const OnComplete: Story = {
  render: () => {
    const [value, setValue] = React.useState('')
    const [completed, setCompleted] = React.useState(false)
    return (
      <div className="space-y-2">
        <PinInput
          value={value}
          onChange={(v) => { setValue(v); setCompleted(false) }}
          onComplete={() => setCompleted(true)}
          length={4}
        />
        {completed && (
          <p className="text-sm text-emerald-600">Code entered: {value}</p>
        )}
      </div>
    )
  },
}
