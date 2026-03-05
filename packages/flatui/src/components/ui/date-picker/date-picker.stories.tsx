import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import type { DateRange } from 'react-day-picker'
import { DatePicker, DateRangePicker } from '.'

const meta: Meta<typeof DatePicker> = {
  title: 'Inputs/DatePicker',
  component: DatePicker,
  parameters: {
    docs: {
      description: {
        component:
          'Combined input + calendar popover. Wraps the existing Calendar component in a Popover with a trigger button.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof DatePicker>

export const Default: Story = {
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>()
    return <DatePicker value={date} onChange={setDate} />
  },
  parameters: {
    docs: {
      source: {
        code: `import { DatePicker } from '@flatui/react'\n\nconst [date, setDate] = useState<Date>()\n<DatePicker value={date} onChange={setDate} />`,
      },
    },
  },
}

export const WithValue: Story = {
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>(new Date())
    return <DatePicker value={date} onChange={setDate} />
  },
}

export const CustomFormat: Story = {
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>(new Date())
    return <DatePicker value={date} onChange={setDate} dateFormat="dd/MM/yyyy" />
  },
}

export const Disabled: Story = {
  render: () => <DatePicker value={new Date()} disabled />,
}

export const RangePicker: Story = {
  render: () => {
    const [range, setRange] = React.useState<DateRange | undefined>()
    return <DateRangePicker value={range} onChange={setRange} />
  },
}
