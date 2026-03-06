import type { Meta, StoryObj } from '@storybook/react'
import { Badge } from '.'

const meta: Meta<typeof Badge> = {
  title: 'Data Display/Badge',
  component: Badge,
  parameters: {
    docs: {
      description: {
        component: 'Displays a badge or a component that looks like a badge.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Badge>

export const Default: Story = {
  render: () => (<Badge>Badge</Badge>
  ),
  parameters: {
    docs: {
      source: {
        code: `import { Badge } from '@forge-ui/react'

<Badge>Badge</Badge>`,
      },
    },
  },
}

export const Secondary: Story = {
  render: () => (<Badge variant="secondary">Secondary</Badge>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Badge variant="secondary">Secondary</Badge>`,
      },
    },
  },
}

export const Outline: Story = {
  render: () => (<Badge variant="outline">Outline</Badge>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Badge variant="outline">Outline</Badge>`,
      },
    },
  },
}

export const Destructive: Story = {
  render: () => (<Badge variant="destructive">Destructive</Badge>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Badge variant="destructive">Destructive</Badge>`,
      },
    },
  },
}
