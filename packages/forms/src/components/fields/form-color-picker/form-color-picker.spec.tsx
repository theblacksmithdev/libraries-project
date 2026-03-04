import { render, screen } from '@testing-library/react'
import { z } from 'zod'
import { Form } from '../../form'
import { FormColorPicker } from './form-color-picker'

const schema = z.object({ color: z.string() })

function renderWithForm(ui: React.ReactElement) {
  return render(
    <Form schema={schema} onSubmit={() => {}} defaultValues={{ color: '' }}>
      {ui}
    </Form>,
  )
}

describe('FormColorPicker', () => {
  it('renders with label', () => {
    renderWithForm(<FormColorPicker name="color" label="Color" />)
    expect(screen.getByText('Color')).toBeInTheDocument()
  })
})
