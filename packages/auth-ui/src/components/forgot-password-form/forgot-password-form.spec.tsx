import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ForgotPasswordForm } from '.'

describe('ForgotPasswordForm', () => {
  it('renders email field and submit button', () => {
    render(<ForgotPasswordForm onSubmit={vi.fn()} />)
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /send reset link/i })).toBeInTheDocument()
  })

  it('calls onSubmit with email', async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()
    render(<ForgotPasswordForm onSubmit={onSubmit} />)

    await user.type(screen.getByLabelText(/email/i), 'test@example.com')
    await user.click(screen.getByRole('button', { name: /send reset link/i }))

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({ email: 'test@example.com' })
    })
  })

  it('shows success message after submission', async () => {
    const user = userEvent.setup()
    render(<ForgotPasswordForm onSubmit={vi.fn()} />)

    await user.type(screen.getByLabelText(/email/i), 'test@example.com')
    await user.click(screen.getByRole('button', { name: /send reset link/i }))

    await waitFor(() => {
      expect(screen.getByRole('status')).toHaveTextContent(/check your email/i)
    })
  })

  it('displays error message', () => {
    render(
      <ForgotPasswordForm
        onSubmit={vi.fn()}
        error={{ code: 'auth/too-many-requests', message: 'Too many requests' }}
      />,
    )
    expect(screen.getByRole('alert')).toHaveTextContent('Too many requests')
  })

  it('disables input when loading', () => {
    render(<ForgotPasswordForm onSubmit={vi.fn()} loading />)
    expect(screen.getByLabelText(/email/i)).toBeDisabled()
    expect(screen.getByRole('button', { name: /sending/i })).toBeDisabled()
  })

  it('renders login link when callback provided', async () => {
    const user = userEvent.setup()
    const onLoginClick = vi.fn()
    render(<ForgotPasswordForm onSubmit={vi.fn()} onLoginClick={onLoginClick} />)

    await user.click(screen.getByText(/sign in/i))
    expect(onLoginClick).toHaveBeenCalled()
  })
})
