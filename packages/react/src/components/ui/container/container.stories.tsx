import type { Meta, StoryObj } from '@storybook/react'
import { Container } from '.'

const meta: Meta<typeof Container> = {
  title: 'Layout/Container',
  component: Container,
  parameters: {
    docs: {
      description: {
        component:
          'Max-width wrapper with responsive horizontal padding. Centers content and constrains width at breakpoints.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Container>

export const Default: Story = {
  render: () => (
    <Container className="bg-muted/50 py-8">
      <p className="text-sm text-muted-foreground">
        Default container (max-w-screen-xl) with responsive padding.
      </p>
    </Container>
  ),
  parameters: {
    docs: {
      source: {
        code: `import { Container } from '@forge-ui/react'\n\n<Container>\n  Content goes here\n</Container>`,
      },
    },
  },
}

export const Small: Story = {
  render: () => (
    <Container size="sm" className="bg-muted/50 py-8">
      <p className="text-sm text-muted-foreground">Small container (max-w-screen-sm)</p>
    </Container>
  ),
}

export const Medium: Story = {
  render: () => (
    <Container size="md" className="bg-muted/50 py-8">
      <p className="text-sm text-muted-foreground">Medium container (max-w-screen-md)</p>
    </Container>
  ),
}

export const Large: Story = {
  render: () => (
    <Container size="lg" className="bg-muted/50 py-8">
      <p className="text-sm text-muted-foreground">Large container (max-w-screen-lg)</p>
    </Container>
  ),
}

export const AllSizes: Story = {
  render: () => (
    <div className="space-y-4">
      {(["sm", "md", "lg", "xl", "2xl", "full"] as const).map((size) => (
        <Container key={size} size={size} className="bg-muted/50 py-4">
          <p className="text-sm text-muted-foreground">size=&quot;{size}&quot;</p>
        </Container>
      ))}
    </div>
  ),
}

export const AsSection: Story = {
  render: () => (
    <Container as="section" size="lg" className="bg-muted/50 py-8">
      <p className="text-sm text-muted-foreground">Rendered as a &lt;section&gt; element</p>
    </Container>
  ),
}
