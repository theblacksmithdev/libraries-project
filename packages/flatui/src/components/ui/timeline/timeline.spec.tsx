import { render, screen } from '@testing-library/react'
import { Timeline, TimelinePrimitives, TimelineItem, TimelineDot, TimelineContent, TimelineTitle } from '.'

describe('Timeline', () => {
  it('renders simplified with items', () => {
    render(
      <Timeline
        items={[
          { title: 'Step 1', description: 'First step', status: 'completed' },
          { title: 'Step 2', status: 'active' },
        ]}
      />
    )
    expect(screen.getByText('Step 1')).toBeInTheDocument()
    expect(screen.getByText('Step 2')).toBeInTheDocument()
    expect(screen.getByText('First step')).toBeInTheDocument()
  })

  it('renders time when provided', () => {
    render(
      <Timeline items={[{ title: 'Event', time: 'Jan 1' }]} />
    )
    expect(screen.getByText('Jan 1')).toBeInTheDocument()
  })

  it('renders compound primitives', () => {
    render(
      <TimelinePrimitives.Root>
        <TimelinePrimitives.Item status="completed">
          <TimelinePrimitives.Dot status="completed" />
          <TimelinePrimitives.Content>
            <TimelinePrimitives.Title>Done</TimelinePrimitives.Title>
          </TimelinePrimitives.Content>
        </TimelinePrimitives.Item>
      </TimelinePrimitives.Root>
    )
    expect(screen.getByText('Done')).toBeInTheDocument()
  })

  it('exports sub-parts for backward compat', () => {
    render(
      <TimelinePrimitives.Root>
        <TimelineItem>
          <TimelineDot />
          <TimelineContent>
            <TimelineTitle>Legacy</TimelineTitle>
          </TimelineContent>
        </TimelineItem>
      </TimelinePrimitives.Root>
    )
    expect(screen.getByText('Legacy')).toBeInTheDocument()
  })
})
