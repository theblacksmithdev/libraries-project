import type { Meta, StoryObj } from '@storybook/react'
import { LoginForm } from '.'
import { fn } from '@storybook/test'

const meta: Meta<typeof LoginForm> = {
  title: 'Auth/LoginForm',
  component: LoginForm,
  parameters: {
    docs: {
      description: {
        component: 'A complete login form with email/password fields, social login support, and navigation links.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof LoginForm>

export const Default: Story = {
  args: {
    onSubmit: fn(),
    onForgotPasswordClick: fn(),
    onRegisterClick: fn(),
  },
}

export const WithSocialProviders: Story = {
  args: {
    onSubmit: fn(),
    onSocialLogin: fn(),
    socialProviders: ['google', 'github', 'apple'],
    onForgotPasswordClick: fn(),
    onRegisterClick: fn(),
  },
}

export const WithError: Story = {
  args: {
    onSubmit: fn(),
    onRegisterClick: fn(),
    error: { code: 'auth/wrong-password', message: 'Invalid email or password. Please try again.' },
  },
}

export const Loading: Story = {
  args: {
    onSubmit: fn(),
    loading: true,
    onRegisterClick: fn(),
  },
}

export const CustomLabels: Story = {
  args: {
    onSubmit: fn(),
    onRegisterClick: fn(),
    labels: {
      loginTitle: 'Bienvenue',
      loginDescription: 'Connectez-vous à votre compte',
      loginButton: 'Se connecter',
      emailLabel: 'Adresse e-mail',
      passwordLabel: 'Mot de passe',
    },
  },
}
