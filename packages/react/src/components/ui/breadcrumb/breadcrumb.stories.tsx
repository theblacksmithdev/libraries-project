import type { Meta, StoryObj } from '@storybook/react'
import { Breadcrumb, BreadcrumbPrimitives } from '.'

const meta: Meta<typeof Breadcrumb> = {
  title: 'Navigation/Breadcrumb',
  component: Breadcrumb,
  parameters: {
    docs: {
      description: {
        component: 'Displays the path to the current page in a hierarchy of links.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Breadcrumb>

export const Default: Story = {
  render: () => (
    <Breadcrumb
      items={[
        { label: 'Home', href: '/' },
        { label: 'Components', href: '/components' },
        { label: 'Breadcrumb' },
      ]}
    />
  ),
  parameters: {
    docs: {
      source: {
        code: `import { Breadcrumb } from '@forge-ui/react'

<Breadcrumb
  items={[
    { label: 'Home', href: '/' },
    { label: 'Components', href: '/components' },
    { label: 'Breadcrumb' },
  ]}
/>`,
      },
    },
  },
}

export const Primitives: Story = {
  name: 'Compound / Primitives',
  render: () => (
    <BreadcrumbPrimitives.Root>
      <BreadcrumbPrimitives.List>
        <BreadcrumbPrimitives.Item>
          <BreadcrumbPrimitives.Link href="/">Home</BreadcrumbPrimitives.Link>
        </BreadcrumbPrimitives.Item>
        <BreadcrumbPrimitives.Separator />
        <BreadcrumbPrimitives.Item>
          <BreadcrumbPrimitives.Link href="/components">Components</BreadcrumbPrimitives.Link>
        </BreadcrumbPrimitives.Item>
        <BreadcrumbPrimitives.Separator />
        <BreadcrumbPrimitives.Item>
          <BreadcrumbPrimitives.Page>Breadcrumb</BreadcrumbPrimitives.Page>
        </BreadcrumbPrimitives.Item>
      </BreadcrumbPrimitives.List>
    </BreadcrumbPrimitives.Root>
  ),
}
