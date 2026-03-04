import type { Meta, StoryObj } from '@storybook/react'
import { ResetPasswordForm } from '.'
import { fn } from '@storybook/test'

const meta: Meta<typeof ResetPasswordForm> = {
  title: 'Auth/ResetPasswordForm',
  component: ResetPasswordForm,
  parameters: {
    docs: {
      description: {
        component: 'A password reset form where users set a new password after receiving a reset code.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof ResetPasswordForm>

export const Default: Story = {
  args: {
    onSubmit: fn(),
    code: 'mock-reset-code-123',
    onLoginClick: fn(),
  },
}

export const WithError: Story = {
  args: {
    onSubmit: fn(),
    code: 'expired-code',
    onLoginClick: fn(),
    error: { code: 'auth/expired-action-code', message: 'This reset link has expired. Please request a new one.' },
  },
}

export const Loading: Story = {
  args: {
    onSubmit: fn(),
    code: 'mock-code',
    loading: true,
    onLoginClick: fn(),
  },
}
