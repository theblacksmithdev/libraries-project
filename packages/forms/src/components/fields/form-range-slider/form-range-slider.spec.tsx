import { render, screen } from '@testing-library/react'
import { z } from 'zod'
import { Form } from '../../form'
import { FormRangeSlider } from './form-range-slider'

const schema = z.object({ range: z.tuple([z.number(), z.number()]) })

function renderWithForm(ui: React.ReactElement) {
  return render(
    <Form schema={schema} onSubmit={() => {}} defaultValues={{ range: [20, 80] }}>
      {ui}
    </Form>,
  )
}

describe('FormRangeSlider', () => {
  it('renders with label', () => {
    renderWithForm(<FormRangeSlider name="range" label="Price Range" />)
    expect(screen.getByText('Price Range')).toBeInTheDocument()
  })

  it('renders two slider thumbs', () => {
    renderWithForm(<FormRangeSlider name="range" label="Price Range" />)
    const sliders = screen.getAllByRole('slider')
    expect(sliders.length).toBe(2)
  })
})
