import { render, screen } from '@testing-library/react'
import { z } from 'zod'
import { Form } from '../../form'
import { FormPinInput } from './form-pin-input'

const schema = z.object({ pin: z.string() })

function renderWithForm(ui: React.ReactElement) {
  return render(
    <Form schema={schema} onSubmit={() => {}} defaultValues={{ pin: '' }}>
      {ui}
    </Form>,
  )
}

describe('FormPinInput', () => {
  it('renders with label', () => {
    renderWithForm(<FormPinInput name="pin" label="PIN" />)
    expect(screen.getByText('PIN')).toBeInTheDocument()
  })

  it('renders pin input slots', () => {
    const { container } = renderWithForm(<FormPinInput name="pin" label="PIN" length={4} />)
    const inputs = container.querySelectorAll('input')
    expect(inputs.length).toBeGreaterThanOrEqual(1)
  })
})
