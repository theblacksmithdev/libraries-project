import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { z } from 'zod'
import { Form } from '../../form'
import { FormInput } from './form-input'

const schema = z.object({ name: z.string() })

function renderWithForm(ui: React.ReactElement) {
  return render(
    <Form schema={schema} onSubmit={() => {}} defaultValues={{ name: '' }}>
      {ui}
    </Form>,
  )
}

describe('FormInput', () => {
  it('renders with label', () => {
    renderWithForm(<FormInput name="name" label="Name" />)
    expect(screen.getByLabelText('Name')).toBeInTheDocument()
  })

  it('renders with placeholder', () => {
    renderWithForm(<FormInput name="name" placeholder="Enter name" />)
    expect(screen.getByPlaceholderText('Enter name')).toBeInTheDocument()
  })

  it('accepts user input', async () => {
    const user = userEvent.setup()
    renderWithForm(<FormInput name="name" label="Name" />)

    const input = screen.getByLabelText('Name')
    await user.type(input, 'John')
    expect(input).toHaveValue('John')
  })

  it('renders with description', () => {
    renderWithForm(<FormInput name="name" label="Name" description="Enter your full name" />)
    expect(screen.getByText('Enter your full name')).toBeInTheDocument()
  })

  it('supports disabled state', () => {
    renderWithForm(<FormInput name="name" label="Name" disabled />)
    expect(screen.getByLabelText('Name')).toBeDisabled()
  })
})
