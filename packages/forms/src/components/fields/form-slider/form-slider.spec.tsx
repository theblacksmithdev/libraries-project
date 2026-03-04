import { render, screen } from '@testing-library/react'
import { z } from 'zod'
import { Form } from '../../form'
import { FormSlider } from './form-slider'

const schema = z.object({ volume: z.number() })

function renderWithForm(ui: React.ReactElement) {
  return render(
    <Form schema={schema} onSubmit={() => {}} defaultValues={{ volume: 50 }}>
      {ui}
    </Form>,
  )
}

describe('FormSlider', () => {
  it('renders with label', () => {
    renderWithForm(<FormSlider name="volume" label="Volume" />)
    expect(screen.getByText('Volume')).toBeInTheDocument()
  })

  it('renders the slider', () => {
    renderWithForm(<FormSlider name="volume" label="Volume" />)
    expect(screen.getByRole('slider')).toBeInTheDocument()
  })
})
