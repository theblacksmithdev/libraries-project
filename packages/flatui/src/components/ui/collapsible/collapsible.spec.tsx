import { render, screen } from '@testing-library/react'
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '.'

describe('Collapsible', () => {
  it('renders', () => {
    render(<Collapsible><CollapsibleTrigger>Toggle</CollapsibleTrigger><CollapsibleContent>Content</CollapsibleContent></Collapsible>)
    expect(screen.getByText('Toggle')).toBeInTheDocument()
  })
})
