import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ResetPasswordForm } from '.'

describe('ResetPasswordForm', () => {
  it('renders password fields and submit button', () => {
    render(<ResetPasswordForm onSubmit={vi.fn()} code="test-code" />)
    expect(screen.getByLabelText(/^password$/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /reset password/i })).toBeInTheDocument()
  })

  it('calls onSubmit with password and code', async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()
    render(<ResetPasswordForm onSubmit={onSubmit} code="abc123" />)

    await user.type(screen.getByLabelText(/^password$/i), 'newpass123')
    await user.type(screen.getByLabelText(/confirm password/i), 'newpass123')
    await user.click(screen.getByRole('button', { name: /reset password/i }))

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({ password: 'newpass123', code: 'abc123' })
    })
  })

  it('shows validation error when passwords do not match', async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()
    render(<ResetPasswordForm onSubmit={onSubmit} code="abc" />)

    await user.type(screen.getByLabelText(/^password$/i), 'password1')
    await user.type(screen.getByLabelText(/confirm password/i), 'different1')
    await user.click(screen.getByRole('button', { name: /reset password/i }))

    expect(await screen.findByText('Passwords do not match')).toBeInTheDocument()
    expect(onSubmit).not.toHaveBeenCalled()
  })

  it('shows validation error for short passwords', async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()
    render(<ResetPasswordForm onSubmit={onSubmit} code="abc" />)

    await user.type(screen.getByLabelText(/^password$/i), 'short')
    await user.type(screen.getByLabelText(/confirm password/i), 'short')
    await user.click(screen.getByRole('button', { name: /reset password/i }))

    expect(await screen.findByText(/at least 8 characters/)).toBeInTheDocument()
    expect(onSubmit).not.toHaveBeenCalled()
  })

  it('shows success message after submission', async () => {
    const user = userEvent.setup()
    render(<ResetPasswordForm onSubmit={vi.fn()} code="abc123" />)

    await user.type(screen.getByLabelText(/^password$/i), 'newpass123')
    await user.type(screen.getByLabelText(/confirm password/i), 'newpass123')
    await user.click(screen.getByRole('button', { name: /reset password/i }))

    await waitFor(() => {
      expect(screen.getByRole('status')).toHaveTextContent(/password reset successful/i)
    })
  })

  it('displays external error', () => {
    render(
      <ResetPasswordForm
        onSubmit={vi.fn()}
        code="expired"
        error={{ code: 'auth/expired-action-code', message: 'Link expired' }}
      />,
    )
    expect(screen.getByRole('alert')).toHaveTextContent('Link expired')
  })

  it('disables inputs when loading', () => {
    render(<ResetPasswordForm onSubmit={vi.fn()} code="abc" loading />)
    expect(screen.getByLabelText(/^password$/i)).toBeDisabled()
    expect(screen.getByRole('button', { name: /resetting/i })).toBeDisabled()
  })
})
