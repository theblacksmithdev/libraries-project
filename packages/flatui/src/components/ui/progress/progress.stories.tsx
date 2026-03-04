import type { Meta, StoryObj } from '@storybook/react'
import { Progress } from '.'

const meta: Meta<typeof Progress> = {
  title: 'Feedback/Progress',
  component: Progress,
  parameters: {
    docs: {
      description: {
        component: 'Displays an indicator showing the completion progress of a task.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Progress>

export const Default: Story = {
  render: () => (<Progress value={60} className="w-[60%]" />
  ),
  parameters: {
    docs: {
      source: {
        code: `import { Progress } from '@flatui/react'

<Progress value={60} />`,
      },
    },
  },
}
