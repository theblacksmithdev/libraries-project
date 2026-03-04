import type { Meta, StoryObj } from '@storybook/react'
import { RegisterForm } from '.'
import { fn } from '@storybook/test'

const meta: Meta<typeof RegisterForm> = {
  title: 'Auth/RegisterForm',
  component: RegisterForm,
  parameters: {
    docs: {
      description: {
        component: 'A registration form with name, email, password, and confirm password fields.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof RegisterForm>

export const Default: Story = {
  args: {
    onSubmit: fn(),
    onLoginClick: fn(),
  },
}

export const WithSocialProviders: Story = {
  args: {
    onSubmit: fn(),
    onSocialLogin: fn(),
    socialProviders: ['google', 'github'],
    onLoginClick: fn(),
  },
}

export const WithError: Story = {
  args: {
    onSubmit: fn(),
    onLoginClick: fn(),
    error: { code: 'auth/email-already-in-use', message: 'An account with this email already exists.' },
  },
}

export const Loading: Story = {
  args: {
    onSubmit: fn(),
    loading: true,
    onLoginClick: fn(),
  },
}
