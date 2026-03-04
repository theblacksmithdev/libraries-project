import type { Meta, StoryObj } from '@storybook/react'
import { Package, Truck, CheckCircle } from 'lucide-react'
import { Timeline, TimelinePrimitives } from '.'

const meta: Meta<typeof Timeline> = {
  title: 'Data Display/Timeline',
  component: Timeline,
  parameters: {
    docs: {
      description: {
        component: 'Vertical timeline with status-based styling for displaying chronological events.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Timeline>

export const Default: Story = {
  render: () => (
    <Timeline
      items={[
        { title: 'Order placed', description: 'Your order has been confirmed.', time: 'Jan 1, 2025', status: 'completed' },
        { title: 'Processing', description: 'Your order is being prepared.', time: 'Jan 2, 2025', status: 'completed' },
        { title: 'Shipped', description: 'Your order is on the way.', time: 'Jan 3, 2025', status: 'active' },
        { title: 'Delivered', description: 'Estimated delivery date.', time: 'Jan 5, 2025', status: 'upcoming' },
      ]}
    />
  ),
  parameters: {
    docs: {
      source: {
        code: `import { Timeline } from '@flatui/react'

<Timeline
  items={[
    { title: 'Order placed', description: 'Confirmed.', time: 'Jan 1', status: 'completed' },
    { title: 'Shipped', status: 'active' },
    { title: 'Delivered', status: 'upcoming' },
  ]}
/>`,
      },
    },
  },
}

export const WithError: Story = {
  render: () => (
    <Timeline
      items={[
        { title: 'Started', status: 'completed' },
        { title: 'Build failed', description: 'Exit code 1', status: 'error' },
        { title: 'Deploy', status: 'upcoming' },
      ]}
    />
  ),
}

export const CustomIcons: Story = {
  render: () => (
    <Timeline
      items={[
        { title: 'Packed', icon: <Package />, status: 'completed' },
        { title: 'In transit', icon: <Truck />, status: 'active' },
        { title: 'Delivered', icon: <CheckCircle />, status: 'upcoming' },
      ]}
    />
  ),
}

export const Primitives: Story = {
  name: 'Compound / Primitives',
  render: () => (
    <TimelinePrimitives.Root>
      <TimelinePrimitives.Item status="completed">
        <div className="relative flex flex-col items-center">
          <TimelinePrimitives.Dot status="completed" />
          <TimelinePrimitives.Connector status="completed" />
        </div>
        <TimelinePrimitives.Content>
          <TimelinePrimitives.Title>Step 1</TimelinePrimitives.Title>
          <TimelinePrimitives.Description>Done</TimelinePrimitives.Description>
        </TimelinePrimitives.Content>
      </TimelinePrimitives.Item>
      <TimelinePrimitives.Item status="active">
        <div className="relative flex flex-col items-center">
          <TimelinePrimitives.Dot status="active" />
        </div>
        <TimelinePrimitives.Content>
          <TimelinePrimitives.Title>Step 2</TimelinePrimitives.Title>
        </TimelinePrimitives.Content>
      </TimelinePrimitives.Item>
    </TimelinePrimitives.Root>
  ),
}
