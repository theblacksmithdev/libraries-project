import type { Meta, StoryObj } from '@storybook/react'
import { Spinner } from '.'

const meta: Meta<typeof Spinner> = {
  title: 'Feedback/Spinner',
  component: Spinner,
  parameters: {
    docs: {
      description: {
        component: 'Animated loading indicator with multiple visual styles.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Spinner>

export const Default: Story = {
  render: () => <Spinner />,
  parameters: {
    docs: {
      source: {
        code: `import { Spinner } from '@flatui/react'\n\n<Spinner />`,
      },
    },
  },
}

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
    </div>
  ),
}

export const Dots: Story = {
  render: () => <Spinner variant="dots" />,
  parameters: {
    docs: {
      source: {
        code: `<Spinner variant="dots" />`,
      },
    },
  },
}

export const Bars: Story = {
  render: () => <Spinner variant="bars" />,
  parameters: {
    docs: {
      source: {
        code: `<Spinner variant="bars" />`,
      },
    },
  },
}

export const WithLabel: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Spinner size="sm" />
      <span className="text-sm text-muted-foreground">Loading...</span>
    </div>
  ),
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex items-center gap-8">
      <div className="flex flex-col items-center gap-2">
        <Spinner variant="spinner" size="lg" />
        <span className="text-xs text-muted-foreground">Spinner</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner variant="dots" size="lg" />
        <span className="text-xs text-muted-foreground">Dots</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner variant="bars" size="lg" />
        <span className="text-xs text-muted-foreground">Bars</span>
      </div>
    </div>
  ),
}
