import type { Meta, StoryObj } from '@storybook/react'
import { Divider } from '.'

const meta: Meta<typeof Divider> = {
  title: 'Layout/Divider',
  component: Divider,
  parameters: {
    docs: {
      description: {
        component:
          'Enhanced separator with optional label/text support. Supports horizontal and vertical orientations with solid, dashed, and dotted styles.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Divider>

export const Default: Story = {
  render: () => <Divider />,
  parameters: {
    docs: {
      source: {
        code: `import { Divider } from '@blacksmith-ui/react'\n\n<Divider />`,
      },
    },
  },
}

export const WithLabel: Story = {
  render: () => <Divider label="or" />,
  parameters: {
    docs: {
      source: {
        code: `<Divider label="or" />`,
      },
    },
  },
}

export const LabelPositions: Story = {
  render: () => (
    <div className="space-y-6">
      <Divider label="Start" labelPosition="start" />
      <Divider label="Center" labelPosition="center" />
      <Divider label="End" labelPosition="end" />
    </div>
  ),
}

export const Dashed: Story = {
  render: () => (
    <div className="space-y-6">
      <Divider variant="dashed" />
      <Divider variant="dashed" label="dashed" />
    </div>
  ),
}

export const Dotted: Story = {
  render: () => (
    <div className="space-y-6">
      <Divider variant="dotted" />
      <Divider variant="dotted" label="dotted" />
    </div>
  ),
}

export const Vertical: Story = {
  render: () => (
    <div className="flex items-center h-24 gap-4">
      <span className="text-sm">Left</span>
      <Divider orientation="vertical" />
      <span className="text-sm">Right</span>
    </div>
  ),
}

export const VerticalWithLabel: Story = {
  render: () => (
    <div className="flex items-stretch h-32 gap-4">
      <span className="text-sm self-center">Left</span>
      <Divider orientation="vertical" label="or" />
      <span className="text-sm self-center">Right</span>
    </div>
  ),
}

export const LoginExample: Story = {
  name: 'Example: Login Divider',
  render: () => (
    <div className="max-w-sm mx-auto space-y-4">
      <div className="rounded-md border p-4 text-center text-sm">
        Sign in with Google
      </div>
      <Divider label="or continue with" />
      <div className="rounded-md border p-4 text-center text-sm">
        Email &amp; password form
      </div>
    </div>
  ),
}
