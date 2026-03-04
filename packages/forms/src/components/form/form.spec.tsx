import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { z } from 'zod'
import { Form } from './form'
import { FormInput } from '../fields/form-input'

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email'),
})

describe('Form', () => {
  it('renders children', () => {
    render(
      <Form schema={schema} onSubmit={() => {}}>
        <FormInput name="name" label="Name" />
        <FormInput name="email" label="Email" />
      </Form>,
    )

    expect(screen.getByLabelText('Name')).toBeInTheDocument()
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
  })

  it('calls onSubmit with valid data', async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()

    render(
      <Form schema={schema} onSubmit={onSubmit} defaultValues={{ name: '', email: '' }}>
        <FormInput name="name" label="Name" />
        <FormInput name="email" label="Email" />
        <button type="submit">Submit</button>
      </Form>,
    )

    await user.type(screen.getByLabelText('Name'), 'John')
    await user.type(screen.getByLabelText('Email'), 'john@example.com')
    await user.click(screen.getByText('Submit'))

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith(
        { name: 'John', email: 'john@example.com' },
        expect.anything(),
      )
    })
  })

  it('shows validation errors for invalid data', async () => {
    const user = userEvent.setup()

    render(
      <Form schema={schema} onSubmit={() => {}} defaultValues={{ name: '', email: '' }}>
        <FormInput name="name" label="Name" />
        <FormInput name="email" label="Email" />
        <button type="submit">Submit</button>
      </Form>,
    )

    await user.click(screen.getByText('Submit'))

    await waitFor(() => {
      expect(screen.getByText('Name must be at least 2 characters')).toBeInTheDocument()
    })
  })

  it('displays mutation error', () => {
    const mutation = { error: new Error('Server error'), isPending: false }

    render(
      <Form schema={schema} onSubmit={() => {}} mutation={mutation}>
        <FormInput name="name" label="Name" />
      </Form>,
    )

    expect(screen.getByText('Server error')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    const { container } = render(
      <Form schema={schema} onSubmit={() => {}} className="custom-class">
        <div>content</div>
      </Form>,
    )

    expect(container.querySelector('form')).toHaveClass('custom-class')
  })
})
