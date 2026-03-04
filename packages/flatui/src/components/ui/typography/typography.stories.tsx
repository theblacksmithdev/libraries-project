import type { Meta, StoryObj } from '@storybook/react'
import { Typography } from '.'

const meta: Meta<typeof Typography> = {
  title: 'Data Display/Typography',
  component: Typography,
  parameters: {
    docs: {
      description: {
        component: 'A flexible typography component for rendering text with various styles, sizes, weights, and semantic elements.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Typography>

export const Default: Story = {
  render: () => (
    <Typography>This is a paragraph of text using the default variant.</Typography>
  ),
  parameters: {
    docs: {
      source: {
        code: `import { Typography } from '@flatui/react'

<Typography>This is a paragraph of text using the default variant.</Typography>`,
      },
    },
  },
}

export const Headings: Story = {
  render: () => (
    <div className="space-y-4">
      <Typography variant="h1">Heading 1</Typography>
      <Typography variant="h2">Heading 2</Typography>
      <Typography variant="h3">Heading 3</Typography>
      <Typography variant="h4">Heading 4</Typography>
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Typography variant="h1">Heading 1</Typography>
<Typography variant="h2">Heading 2</Typography>
<Typography variant="h3">Heading 3</Typography>
<Typography variant="h4">Heading 4</Typography>`,
      },
    },
  },
}

export const Variants: Story = {
  render: () => (
    <div className="space-y-4">
      <Typography variant="lead">This is a lead paragraph with larger, muted text.</Typography>
      <Typography variant="large">This is large text.</Typography>
      <Typography variant="small">This is small text.</Typography>
      <Typography variant="muted">This is muted text.</Typography>
      <Typography variant="blockquote">This is a blockquote with a left border.</Typography>
      <Typography variant="code">console.log("hello")</Typography>
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Typography variant="lead">Lead paragraph</Typography>
<Typography variant="large">Large text</Typography>
<Typography variant="small">Small text</Typography>
<Typography variant="muted">Muted text</Typography>
<Typography variant="blockquote">A blockquote</Typography>
<Typography variant="code">console.log("hello")</Typography>`,
      },
    },
  },
}

export const Sizes: Story = {
  render: () => (
    <div className="space-y-2">
      <Typography size="xs">Extra small text</Typography>
      <Typography size="sm">Small text</Typography>
      <Typography size="base">Base text</Typography>
      <Typography size="lg">Large text</Typography>
      <Typography size="xl">Extra large text</Typography>
      <Typography size="2xl">2XL text</Typography>
      <Typography size="3xl">3XL text</Typography>
      <Typography size="4xl">4XL text</Typography>
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Typography size="xs">Extra small text</Typography>
<Typography size="sm">Small text</Typography>
<Typography size="base">Base text</Typography>
<Typography size="lg">Large text</Typography>
<Typography size="xl">Extra large text</Typography>
<Typography size="2xl">2XL text</Typography>
<Typography size="3xl">3XL text</Typography>
<Typography size="4xl">4XL text</Typography>`,
      },
    },
  },
}

export const Weights: Story = {
  render: () => (
    <div className="space-y-2">
      <Typography weight="light">Light weight</Typography>
      <Typography weight="normal">Normal weight</Typography>
      <Typography weight="medium">Medium weight</Typography>
      <Typography weight="semibold">Semibold weight</Typography>
      <Typography weight="bold">Bold weight</Typography>
      <Typography weight="extrabold">Extrabold weight</Typography>
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Typography weight="light">Light weight</Typography>
<Typography weight="normal">Normal weight</Typography>
<Typography weight="medium">Medium weight</Typography>
<Typography weight="semibold">Semibold weight</Typography>
<Typography weight="bold">Bold weight</Typography>
<Typography weight="extrabold">Extrabold weight</Typography>`,
      },
    },
  },
}

export const Colors: Story = {
  render: () => (
    <div className="space-y-2">
      <Typography color="default">Default color</Typography>
      <Typography color="primary">Primary color</Typography>
      <Typography color="secondary">Secondary color</Typography>
      <Typography color="muted">Muted color</Typography>
      <Typography color="destructive">Destructive color</Typography>
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Typography color="default">Default color</Typography>
<Typography color="primary">Primary color</Typography>
<Typography color="secondary">Secondary color</Typography>
<Typography color="muted">Muted color</Typography>
<Typography color="destructive">Destructive color</Typography>`,
      },
    },
  },
}

export const Alignment: Story = {
  render: () => (
    <div className="space-y-2">
      <Typography align="left">Left aligned text</Typography>
      <Typography align="center">Center aligned text</Typography>
      <Typography align="right">Right aligned text</Typography>
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Typography align="left">Left aligned</Typography>
<Typography align="center">Center aligned</Typography>
<Typography align="right">Right aligned</Typography>`,
      },
    },
  },
}

export const CustomElement: Story = {
  render: () => (
    <Typography variant="h1" as="span">
      This renders as a span with h1 styles
    </Typography>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Typography variant="h1" as="span">
  This renders as a span with h1 styles
</Typography>`,
      },
    },
  },
}

export const Combined: Story = {
  render: () => (
    <div className="space-y-4">
      <Typography variant="h1">The Art of Typography</Typography>
      <Typography variant="lead">
        Good typography is the foundation of effective communication in design.
      </Typography>
      <Typography>
        Typography in user interfaces serves both functional and aesthetic purposes.
        It guides the reader through content hierarchy and establishes visual rhythm.
      </Typography>
      <Typography variant="blockquote">
        "Typography is the craft of endowing human language with a durable visual form."
      </Typography>
      <Typography variant="small" color="muted">
        Last updated: March 2026
      </Typography>
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Typography variant="h1">The Art of Typography</Typography>
<Typography variant="lead">Good typography is the foundation...</Typography>
<Typography>Typography in user interfaces...</Typography>
<Typography variant="blockquote">"Typography is the craft..."</Typography>
<Typography variant="small" color="muted">Last updated: March 2026</Typography>`,
      },
    },
  },
}
