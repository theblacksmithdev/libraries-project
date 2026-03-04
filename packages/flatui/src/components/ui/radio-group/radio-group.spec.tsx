import { render, screen } from '@testing-library/react'
import { RadioGroup, RadioGroupItem } from '.'

describe('RadioGroup', () => {
  it('renders', () => {
    render(<RadioGroup defaultValue="a"><RadioGroupItem value="a" /><RadioGroupItem value="b" /></RadioGroup>)
    const elements = screen.getAllByRole('radio')
    expect(elements).toHaveLength(2)
  })
})
