import { render, screen } from '@testing-library/react'
import { z } from 'zod'
import { Form } from '../../form'
import { FormSelect } from './form-select'

const schema = z.object({ role: z.string() })

const options = [
  { value: 'admin', label: 'Admin' },
  { value: 'user', label: 'User' },
]

function renderWithForm(ui: React.ReactElement) {
  return render(
    <Form schema={schema} onSubmit={() => {}} defaultValues={{ role: '' }}>
      {ui}
    </Form>,
  )
}

describe('FormSelect', () => {
  it('renders with label', () => {
    renderWithForm(<FormSelect name="role" label="Role" options={options} />)
    expect(screen.getByText('Role')).toBeInTheDocument()
  })

  it('renders the select trigger', () => {
    renderWithForm(<FormSelect name="role" label="Role" options={options} placeholder="Select role" />)
    expect(screen.getByRole('combobox')).toBeInTheDocument()
  })
})
