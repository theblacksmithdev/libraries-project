import type { Meta, StoryObj } from '@storybook/react'
import { ForgotPasswordForm } from '.'
import { fn } from '@storybook/test'

const meta: Meta<typeof ForgotPasswordForm> = {
  title: 'Auth/ForgotPasswordForm',
  component: ForgotPasswordForm,
  parameters: {
    docs: {
      description: {
        component: 'A forgot password form that sends a password reset email.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof ForgotPasswordForm>

export const Default: Story = {
  args: {
    onSubmit: fn(),
    onLoginClick: fn(),
  },
}

export const WithError: Story = {
  args: {
    onSubmit: fn(),
    onLoginClick: fn(),
    error: { code: 'auth/too-many-requests', message: 'Too many requests. Please try again later.' },
  },
}

export const Loading: Story = {
  args: {
    onSubmit: fn(),
    loading: true,
    onLoginClick: fn(),
  },
}
