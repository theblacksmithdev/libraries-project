import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Heart } from 'lucide-react'
import { Rating } from '.'

const meta: Meta<typeof Rating> = {
  title: 'Inputs/Rating',
  component: Rating,
  parameters: {
    docs: {
      description: {
        component: 'Star rating input and display component with support for half-star precision and custom icons.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Rating>

export const Default: Story = {
  render: () => <Rating value={3} readOnly />,
  parameters: {
    docs: {
      source: {
        code: `import { Rating } from '@flatui/react'\n\n<Rating value={3} readOnly />`,
      },
    },
  },
}

export const Interactive: Story = {
  render: () => {
    const [value, setValue] = React.useState(0)
    return (
      <div className="flex flex-col gap-2">
        <Rating value={value} onChange={setValue} />
        <span className="text-sm text-muted-foreground">
          Selected: {value} star{value !== 1 ? 's' : ''}
        </span>
      </div>
    )
  },
}

export const HalfStars: Story = {
  render: () => <Rating value={3.5} precision="half" readOnly />,
}

export const InteractiveHalfStars: Story = {
  render: () => {
    const [value, setValue] = React.useState(2.5)
    return (
      <div className="flex flex-col gap-2">
        <Rating value={value} onChange={setValue} precision="half" />
        <span className="text-sm text-muted-foreground">
          Selected: {value}
        </span>
      </div>
    )
  },
}

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <Rating value={4} size="sm" readOnly />
      <Rating value={4} size="md" readOnly />
      <Rating value={4} size="lg" readOnly />
    </div>
  ),
}

export const CustomIcon: Story = {
  render: () => {
    const [value, setValue] = React.useState(3)
    return <Rating value={value} onChange={setValue} icon={<Heart />} />
  },
}

export const Disabled: Story = {
  render: () => <Rating value={2} disabled onChange={() => {}} />,
}

export const CustomMax: Story = {
  render: () => <Rating value={7} max={10} readOnly />,
}
