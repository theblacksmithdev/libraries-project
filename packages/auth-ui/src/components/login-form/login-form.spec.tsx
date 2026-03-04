import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { LoginForm } from '.'

describe('LoginForm', () => {
  it('renders email and password fields', () => {
    render(<LoginForm onSubmit={vi.fn()} />)
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
  })

  it('renders the sign in button', () => {
    render(<LoginForm onSubmit={vi.fn()} />)
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument()
  })

  it('calls onSubmit with email and password', async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()
    render(<LoginForm onSubmit={onSubmit} />)

    await user.type(screen.getByLabelText(/email/i), 'test@example.com')
    await user.type(screen.getByLabelText(/password/i), 'password123')
    await user.click(screen.getByRole('button', { name: /sign in/i }))

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
      })
    })
  })

  it('displays error message when error prop is set', () => {
    render(
      <LoginForm
        onSubmit={vi.fn()}
        error={{ code: 'auth/wrong-password', message: 'Invalid credentials' }}
      />,
    )
    expect(screen.getByRole('alert')).toHaveTextContent('Invalid credentials')
  })

  it('disables inputs when loading', () => {
    render(<LoginForm onSubmit={vi.fn()} loading />)
    expect(screen.getByLabelText(/email/i)).toBeDisabled()
    expect(screen.getByLabelText(/password/i)).toBeDisabled()
    expect(screen.getByRole('button', { name: /signing in/i })).toBeDisabled()
  })

  it('renders forgot password link when callback is provided', async () => {
    const user = userEvent.setup()
    const onForgotPasswordClick = vi.fn()
    render(<LoginForm onSubmit={vi.fn()} onForgotPasswordClick={onForgotPasswordClick} />)

    const link = screen.getByText(/forgot password/i)
    await user.click(link)
    expect(onForgotPasswordClick).toHaveBeenCalled()
  })

  it('renders register link when callback is provided', async () => {
    const user = userEvent.setup()
    const onRegisterClick = vi.fn()
    render(<LoginForm onSubmit={vi.fn()} onRegisterClick={onRegisterClick} />)

    const link = screen.getByText(/sign up/i)
    await user.click(link)
    expect(onRegisterClick).toHaveBeenCalled()
  })

  it('renders social login buttons when configured', () => {
    render(
      <LoginForm
        onSubmit={vi.fn()}
        onSocialLogin={vi.fn()}
        socialProviders={['google', 'github']}
      />,
    )
    expect(screen.getByText(/continue with google/i)).toBeInTheDocument()
    expect(screen.getByText(/continue with github/i)).toBeInTheDocument()
  })

  it('supports custom labels', () => {
    render(
      <LoginForm
        onSubmit={vi.fn()}
        labels={{ loginTitle: 'Bienvenue', loginButton: 'Se connecter' }}
      />,
    )
    expect(screen.getByText('Bienvenue')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Se connecter' })).toBeInTheDocument()
  })
})
