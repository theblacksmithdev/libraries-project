import { render } from '@testing-library/react'
import { Calendar } from '.'

describe('Calendar', () => {
  it('renders', () => {
    const { container } = render(<Calendar mode="single" />)
    const element = container.querySelector('table')
    expect(element).toBeTruthy()
  })
})
