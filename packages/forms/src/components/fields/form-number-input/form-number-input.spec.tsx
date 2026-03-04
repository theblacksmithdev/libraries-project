import { render, screen } from '@testing-library/react'
import { z } from 'zod'
import { Form } from '../../form'
import { FormNumberInput } from './form-number-input'

const schema = z.object({ age: z.number() })

function renderWithForm(ui: React.ReactElement) {
  return render(
    <Form schema={schema} onSubmit={() => {}} defaultValues={{ age: 0 }}>
      {ui}
    </Form>,
  )
}

describe('FormNumberInput', () => {
  it('renders with label', () => {
    renderWithForm(<FormNumberInput name="age" label="Age" />)
    expect(screen.getByText('Age')).toBeInTheDocument()
  })

  it('renders the number input', () => {
    renderWithForm(<FormNumberInput name="age" label="Age" />)
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })
})
