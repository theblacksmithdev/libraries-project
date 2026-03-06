import { render, screen } from '@testing-library/react'
import { HoverCard, HoverCardPrimitives, HoverCardTrigger, HoverCardContent } from '.'

describe('HoverCard', () => {
  it('renders simplified trigger', () => {
    render(
      <HoverCard trigger={<span>Hover</span>}>
        Content
      </HoverCard>
    )
    expect(screen.getByText('Hover')).toBeInTheDocument()
  })

  it('renders compound primitives', () => {
    render(
      <HoverCardPrimitives.Root>
        <HoverCardPrimitives.Trigger>Hover</HoverCardPrimitives.Trigger>
        <HoverCardPrimitives.Content>Content</HoverCardPrimitives.Content>
      </HoverCardPrimitives.Root>
    )
    expect(screen.getByText('Hover')).toBeInTheDocument()
  })

  it('exports sub-parts for backward compat', () => {
    render(
      <HoverCardPrimitives.Root>
        <HoverCardTrigger>Hover</HoverCardTrigger>
        <HoverCardContent>Content</HoverCardContent>
      </HoverCardPrimitives.Root>
    )
    expect(screen.getByText('Hover')).toBeInTheDocument()
  })
})
