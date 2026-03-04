import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { AuthLayout } from '.'

const meta: Meta<typeof AuthLayout> = {
  title: 'Auth/AuthLayout',
  component: AuthLayout,
  parameters: {
    docs: {
      description: {
        component: 'A wrapper layout component for auth forms, rendering a centered card with title, description, and footer.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof AuthLayout>

export const Default: Story = {
  args: {
    title: 'Welcome',
    description: 'Sign in to continue',
    children: <div className="h-32 rounded-md border border-dashed border-muted-foreground/30 flex items-center justify-center text-sm text-muted-foreground">Form content goes here</div>,
    footer: <span className="text-sm text-muted-foreground">Footer content</span>,
  },
}

export const WithoutFooter: Story = {
  args: {
    title: 'Simple Layout',
    description: 'No footer in this example',
    children: <div className="h-32 rounded-md border border-dashed border-muted-foreground/30 flex items-center justify-center text-sm text-muted-foreground">Content</div>,
  },
}
