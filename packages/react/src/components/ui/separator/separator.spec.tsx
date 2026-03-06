import { render } from '@testing-library/react'
import { Separator } from '.'

describe('Separator', () => {
  it('renders', () => {
    const { container } = render(<Separator />)
    const element = container.querySelector('[data-orientation="horizontal"]')
    expect(element).toBeTruthy()
  })
})
