import type { Meta, StoryObj } from '@storybook/react'
import { Calendar } from '.'
import * as React from 'react'

function CalendarDemo() {
  const [date, setDate] = React.useState<Date | undefined>(new Date())
  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      className="rounded-md border"
    />
  )
}
const meta: Meta<typeof Calendar> = {
  title: 'Inputs/Calendar',
  component: Calendar,
  parameters: {
    docs: {
      description: {
        component: 'A date picker component with month navigation.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Calendar>

export const Default: Story = {
  render: () => (
    <CalendarDemo />
  ),
  parameters: {
    docs: {
      source: {
        code: `import { Calendar } from '@flatui/react'

const [date, setDate] = React.useState<Date | undefined>(new Date())

<Calendar
  mode="single"
  selected={date}
  onSelect={setDate}
  className="rounded-md border"
/>`,
      },
    },
  },
}
