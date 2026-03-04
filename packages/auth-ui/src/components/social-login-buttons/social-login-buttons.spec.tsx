import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { SocialLoginButtons } from '.'

describe('SocialLoginButtons', () => {
  it('renders buttons for each provider', () => {
    render(
      <SocialLoginButtons
        providers={['google', 'github']}
        onSocialLogin={vi.fn()}
      />,
    )
    expect(screen.getByText(/continue with google/i)).toBeInTheDocument()
    expect(screen.getByText(/continue with github/i)).toBeInTheDocument()
  })

  it('calls onSocialLogin with the correct provider', async () => {
    const user = userEvent.setup()
    const onSocialLogin = vi.fn()
    render(
      <SocialLoginButtons
        providers={['google', 'github']}
        onSocialLogin={onSocialLogin}
      />,
    )

    await user.click(screen.getByText(/continue with google/i))
    expect(onSocialLogin).toHaveBeenCalledWith('google')

    await user.click(screen.getByText(/continue with github/i))
    expect(onSocialLogin).toHaveBeenCalledWith('github')
  })

  it('renders icon-only layout', () => {
    render(
      <SocialLoginButtons
        providers={['google', 'github']}
        onSocialLogin={vi.fn()}
        layout="icons"
      />,
    )
    expect(screen.getByLabelText(/sign in with google/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/sign in with github/i)).toBeInTheDocument()
  })

  it('disables buttons when disabled', () => {
    render(
      <SocialLoginButtons
        providers={['google']}
        onSocialLogin={vi.fn()}
        disabled
      />,
    )
    expect(screen.getByText(/continue with google/i).closest('button')).toBeDisabled()
  })

  it('renders nothing when providers list is empty', () => {
    const { container } = render(
      <SocialLoginButtons providers={[]} onSocialLogin={vi.fn()} />,
    )
    expect(container.firstChild).toBeNull()
  })
})
