import { render, screen } from '@testing-library/react'
import { Command, CommandInput, CommandList, CommandGroup, CommandItem } from '.'

beforeAll(() => {
  Element.prototype.scrollIntoView = vi.fn()
})

describe('Command', () => {
  it('renders', () => {
    render(<Command><CommandInput placeholder="Search..." /><CommandList><CommandGroup><CommandItem>Item</CommandItem></CommandGroup></CommandList></Command>)
    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument()
  })
})
