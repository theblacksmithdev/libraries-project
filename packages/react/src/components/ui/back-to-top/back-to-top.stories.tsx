import type { Meta, StoryObj } from '@storybook/react'
import { ChevronsUp } from 'lucide-react'
import { BackToTop } from '.'

const meta: Meta<typeof BackToTop> = {
  title: 'Navigation/BackToTop',
  component: BackToTop,
  parameters: {
    docs: {
      description: {
        component:
          'Scroll-to-top floating button that appears after scrolling past a configurable threshold. Supports smooth scrolling, custom icons, and multiple positions.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof BackToTop>

export const Default: Story = {
  render: () => (
    <div>
      <p className="text-sm text-muted-foreground mb-4">
        Scroll down this page to see the Back to Top button appear in the bottom-right corner.
      </p>
      <BackToTop alwaysVisible />
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `import { BackToTop } from '@forge-ui/react'\n\n<BackToTop />`,
      },
    },
  },
}

export const Outline: Story = {
  render: () => <BackToTop variant="outline" alwaysVisible />,
}

export const Secondary: Story = {
  render: () => <BackToTop variant="secondary" alwaysVisible />,
}

export const Sizes: Story = {
  render: () => (
    <div className="flex gap-4 items-center">
      <BackToTop size="sm" alwaysVisible position="bottom-left" />
      <BackToTop size="default" alwaysVisible position="bottom-center" />
      <BackToTop size="lg" alwaysVisible position="bottom-right" />
    </div>
  ),
}

export const CustomIcon: Story = {
  render: () => <BackToTop icon={<ChevronsUp />} alwaysVisible />,
}

export const BottomLeft: Story = {
  render: () => <BackToTop position="bottom-left" alwaysVisible />,
}

export const BottomCenter: Story = {
  render: () => <BackToTop position="bottom-center" alwaysVisible />,
}
