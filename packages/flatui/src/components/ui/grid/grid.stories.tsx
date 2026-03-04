import type { Meta, StoryObj } from '@storybook/react'
import { Grid, GridItem } from '.'

const Cell = ({ children }: { children: React.ReactNode }) => (
  <div className="rounded-md bg-primary/10 border border-primary/20 p-4 text-sm text-center">
    {children}
  </div>
)

const meta: Meta<typeof Grid> = {
  title: 'Layout/Grid',
  component: Grid,
  parameters: {
    docs: {
      description: {
        component:
          'Responsive CSS grid layout helper with column, gap, and alignment control. Includes GridItem for spanning columns.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Grid>

export const Default: Story = {
  render: () => (
    <Grid columns={3}>
      <Cell>1</Cell>
      <Cell>2</Cell>
      <Cell>3</Cell>
      <Cell>4</Cell>
      <Cell>5</Cell>
      <Cell>6</Cell>
    </Grid>
  ),
  parameters: {
    docs: {
      source: {
        code: `import { Grid } from '@flatui/react'\n\n<Grid columns={3}>\n  <div>1</div>\n  <div>2</div>\n  <div>3</div>\n</Grid>`,
      },
    },
  },
}

export const TwoColumns: Story = {
  render: () => (
    <Grid columns={2} gap={6}>
      <Cell>Left</Cell>
      <Cell>Right</Cell>
    </Grid>
  ),
}

export const FourColumns: Story = {
  render: () => (
    <Grid columns={4} gap={4}>
      {Array.from({ length: 8 }, (_, i) => (
        <Cell key={i}>{i + 1}</Cell>
      ))}
    </Grid>
  ),
}

export const Responsive: Story = {
  render: () => (
    <Grid columns={1} responsive={{ sm: 2, md: 3, lg: 4 }} gap={4}>
      {Array.from({ length: 8 }, (_, i) => (
        <Cell key={i}>{i + 1}</Cell>
      ))}
    </Grid>
  ),
}

export const WithSpanning: Story = {
  render: () => (
    <Grid columns={4} gap={4}>
      <GridItem span={2}><Cell>Span 2</Cell></GridItem>
      <Cell>1</Cell>
      <Cell>1</Cell>
      <Cell>1</Cell>
      <GridItem span={3}><Cell>Span 3</Cell></GridItem>
      <GridItem span="full"><Cell>Full width</Cell></GridItem>
    </Grid>
  ),
}

export const WithStartPosition: Story = {
  render: () => (
    <Grid columns={4} gap={4}>
      <GridItem start={2} span={2}><Cell>Start 2, Span 2</Cell></GridItem>
      <Cell>Auto</Cell>
      <Cell>Auto</Cell>
      <Cell>Auto</Cell>
      <Cell>Auto</Cell>
    </Grid>
  ),
}

export const DashboardLayout: Story = {
  name: 'Example: Dashboard',
  render: () => (
    <Grid columns={1} responsive={{ md: 2, lg: 4 }} gap={4}>
      <Cell>Revenue</Cell>
      <Cell>Users</Cell>
      <Cell>Orders</Cell>
      <Cell>Growth</Cell>
      <GridItem span="full">
        <div className="rounded-md bg-primary/10 border border-primary/20 p-8 text-sm text-center">
          Chart area (full width)
        </div>
      </GridItem>
    </Grid>
  ),
}
