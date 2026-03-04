import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { RegisterForm } from '.'

describe('RegisterForm', () => {
  it('renders all fields', () => {
    render(<RegisterForm onSubmit={vi.fn()} />)
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/^password$/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument()
  })

  it('calls onSubmit with form data', async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()
    render(<RegisterForm onSubmit={onSubmit} />)

    await user.type(screen.getByLabelText(/full name/i), 'John Doe')
    await user.type(screen.getByLabelText(/email/i), 'john@example.com')
    await user.type(screen.getByLabelText(/^password$/i), 'password123')
    await user.type(screen.getByLabelText(/confirm password/i), 'password123')
    await user.click(screen.getByRole('button', { name: /create account/i }))

    expect(onSubmit).toHaveBeenCalledWith({
      email: 'john@example.com',
      password: 'password123',
      displayName: 'John Doe',
    })
  })

  it('shows validation error when passwords do not match', async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()
    render(<RegisterForm onSubmit={onSubmit} />)

    await user.type(screen.getByLabelText(/full name/i), 'John')
    await user.type(screen.getByLabelText(/email/i), 'john@example.com')
    await user.type(screen.getByLabelText(/^password$/i), 'password123')
    await user.type(screen.getByLabelText(/confirm password/i), 'different')
    await user.click(screen.getByRole('button', { name: /create account/i }))

    expect(screen.getByRole('alert')).toHaveTextContent('Passwords do not match')
    expect(onSubmit).not.toHaveBeenCalled()
  })

  it('shows validation error for short passwords', async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()
    render(<RegisterForm onSubmit={onSubmit} />)

    await user.type(screen.getByLabelText(/full name/i), 'John')
    await user.type(screen.getByLabelText(/email/i), 'john@example.com')
    await user.type(screen.getByLabelText(/^password$/i), 'short')
    await user.type(screen.getByLabelText(/confirm password/i), 'short')
    await user.click(screen.getByRole('button', { name: /create account/i }))

    expect(screen.getByRole('alert')).toHaveTextContent('at least 8 characters')
    expect(onSubmit).not.toHaveBeenCalled()
  })

  it('displays external error', () => {
    render(
      <RegisterForm
        onSubmit={vi.fn()}
        error={{ code: 'auth/email-already-in-use', message: 'Email taken' }}
      />,
    )
    expect(screen.getByRole('alert')).toHaveTextContent('Email taken')
  })

  it('disables inputs when loading', () => {
    render(<RegisterForm onSubmit={vi.fn()} loading />)
    expect(screen.getByLabelText(/email/i)).toBeDisabled()
    expect(screen.getByRole('button', { name: /creating account/i })).toBeDisabled()
  })

  it('renders login link when callback provided', async () => {
    const user = userEvent.setup()
    const onLoginClick = vi.fn()
    render(<RegisterForm onSubmit={vi.fn()} onLoginClick={onLoginClick} />)

    await user.click(screen.getByText(/sign in/i))
    expect(onLoginClick).toHaveBeenCalled()
  })
})
