import { render, screen } from '@testing-library/react'
import { z } from 'zod'
import { Form } from '../../form'
import { FormDatePicker } from './form-date-picker'

const schema = z.object({ date: z.date().optional() })

function renderWithForm(ui: React.ReactElement) {
  return render(
    <Form schema={schema} onSubmit={() => {}} defaultValues={{ date: undefined }}>
      {ui}
    </Form>,
  )
}

describe('FormDatePicker', () => {
  it('renders with label', () => {
    renderWithForm(<FormDatePicker name="date" label="Date" />)
    expect(screen.getByText('Date')).toBeInTheDocument()
  })

  it('renders the date picker trigger', () => {
    renderWithForm(<FormDatePicker name="date" label="Date" placeholder="Pick a date" />)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })
})
