import { render, screen } from '@testing-library/react'
import { ScrollArea } from '.'

describe('ScrollArea', () => {
  it('renders', () => {
    render(<ScrollArea className="h-[100px]"><div>Content</div></ScrollArea>)
    expect(screen.getByText('Content')).toBeInTheDocument()
  })
})
