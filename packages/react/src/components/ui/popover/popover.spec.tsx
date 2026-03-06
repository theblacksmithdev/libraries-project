import { render, screen } from '@testing-library/react'
import { Popover, PopoverPrimitives, PopoverTrigger, PopoverContent } from '.'

describe('Popover', () => {
  it('renders simplified trigger', () => {
    render(
      <Popover trigger={<button>Open</button>}>
        Content
      </Popover>
    )
    expect(screen.getByText('Open')).toBeInTheDocument()
  })

  it('renders compound primitives', () => {
    render(
      <PopoverPrimitives.Root>
        <PopoverPrimitives.Trigger>Open</PopoverPrimitives.Trigger>
        <PopoverPrimitives.Content>Content</PopoverPrimitives.Content>
      </PopoverPrimitives.Root>
    )
    expect(screen.getByText('Open')).toBeInTheDocument()
  })

  it('exports sub-parts for backward compat', () => {
    render(
      <PopoverPrimitives.Root>
        <PopoverTrigger>Open</PopoverTrigger>
        <PopoverContent>Content</PopoverContent>
      </PopoverPrimitives.Root>
    )
    expect(screen.getByText('Open')).toBeInTheDocument()
  })
})
