import type { Meta, StoryObj } from '@storybook/react'
import { SocialLoginButtons } from '.'
import { fn } from '@storybook/test'

const meta: Meta<typeof SocialLoginButtons> = {
  title: 'Auth/SocialLoginButtons',
  component: SocialLoginButtons,
  parameters: {
    docs: {
      description: {
        component: 'Social/third-party login buttons supporting Google, GitHub, Facebook, Apple, Microsoft, and Twitter.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof SocialLoginButtons>

export const FullLayout: Story = {
  args: {
    providers: ['google', 'github', 'apple'],
    onSocialLogin: fn(),
    layout: 'full',
  },
}

export const IconsLayout: Story = {
  args: {
    providers: ['google', 'github', 'facebook', 'apple', 'microsoft', 'twitter'],
    onSocialLogin: fn(),
    layout: 'icons',
  },
}

export const AllProviders: Story = {
  args: {
    providers: ['google', 'github', 'facebook', 'apple', 'microsoft', 'twitter'],
    onSocialLogin: fn(),
    layout: 'full',
  },
}

export const Disabled: Story = {
  args: {
    providers: ['google', 'github'],
    onSocialLogin: fn(),
    disabled: true,
  },
}
