import { render, screen } from '@testing-library/react'
import { z } from 'zod'
import { Form } from '../../form'
import { FormRating } from './form-rating'

const schema = z.object({ rating: z.number() })

function renderWithForm(ui: React.ReactElement) {
  return render(
    <Form schema={schema} onSubmit={() => {}} defaultValues={{ rating: 0 }}>
      {ui}
    </Form>,
  )
}

describe('FormRating', () => {
  it('renders with label', () => {
    renderWithForm(<FormRating name="rating" label="Rating" />)
    expect(screen.getByText('Rating')).toBeInTheDocument()
  })

  it('renders the rating component', () => {
    const { container } = renderWithForm(<FormRating name="rating" label="Rating" max={5} />)
    expect(container.querySelector('[role="radiogroup"], [data-rating]')).toBeTruthy()
  })
})
