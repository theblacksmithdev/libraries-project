import { render, screen } from '@testing-library/react'
import { Tooltip, TooltipPrimitives, TooltipProvider } from '.'

describe('Tooltip', () => {
  it('renders simplified trigger', () => {
    render(
      <Tooltip content="Tip text">
        <button>Hover</button>
      </Tooltip>
    )
    expect(screen.getByText('Hover')).toBeInTheDocument()
  })

  it('renders compound primitives', () => {
    render(
      <TooltipPrimitives.Provider>
        <TooltipPrimitives.Root>
          <TooltipPrimitives.Trigger>Trigger</TooltipPrimitives.Trigger>
          <TooltipPrimitives.Content>Content</TooltipPrimitives.Content>
        </TooltipPrimitives.Root>
      </TooltipPrimitives.Provider>
    )
    expect(screen.getByText('Trigger')).toBeInTheDocument()
  })

  it('exports sub-parts for backward compat', () => {
    render(
      <TooltipProvider>
        <TooltipPrimitives.Root>
          <TooltipPrimitives.Trigger>Hover</TooltipPrimitives.Trigger>
          <TooltipPrimitives.Content>Tip</TooltipPrimitives.Content>
        </TooltipPrimitives.Root>
      </TooltipProvider>
    )
    expect(screen.getByText('Hover')).toBeInTheDocument()
  })
})
