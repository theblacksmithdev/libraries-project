import type { Meta, StoryObj } from '@storybook/react'
import { Table, TablePrimitives } from '.'

const meta: Meta = {
  title: 'Data Display/Table',
  parameters: {
    docs: {
      description: {
        component: 'A responsive table component for displaying data.',
      },
    },
  },
}

export default meta
type Story = StoryObj

const invoices = [
  { invoice: 'INV001', status: 'Paid', method: 'Credit Card', amount: '$250.00' },
  { invoice: 'INV002', status: 'Pending', method: 'PayPal', amount: '$150.00' },
]

export const Default: Story = {
  render: () => (
    <Table
      columns={[
        { key: 'invoice', header: 'Invoice' },
        { key: 'status', header: 'Status' },
        { key: 'method', header: 'Method' },
        { key: 'amount', header: 'Amount' },
      ]}
      data={invoices}
      caption="A list of your recent invoices."
      rowKey="invoice"
    />
  ),
  parameters: {
    docs: {
      source: {
        code: `import { Table } from '@flatui/react'

<Table
  columns={[
    { key: 'invoice', header: 'Invoice' },
    { key: 'status', header: 'Status' },
    { key: 'amount', header: 'Amount' },
  ]}
  data={invoices}
  caption="A list of recent invoices."
  rowKey="invoice"
/>`,
      },
    },
  },
}

export const Primitives: Story = {
  name: 'Compound / Primitives',
  render: () => (
    <TablePrimitives.Root>
      <TablePrimitives.Caption>A list of your recent invoices.</TablePrimitives.Caption>
      <TablePrimitives.Header>
        <TablePrimitives.Row>
          <TablePrimitives.Head>Invoice</TablePrimitives.Head>
          <TablePrimitives.Head>Status</TablePrimitives.Head>
          <TablePrimitives.Head>Amount</TablePrimitives.Head>
        </TablePrimitives.Row>
      </TablePrimitives.Header>
      <TablePrimitives.Body>
        <TablePrimitives.Row>
          <TablePrimitives.Cell>INV001</TablePrimitives.Cell>
          <TablePrimitives.Cell>Paid</TablePrimitives.Cell>
          <TablePrimitives.Cell>$250.00</TablePrimitives.Cell>
        </TablePrimitives.Row>
      </TablePrimitives.Body>
    </TablePrimitives.Root>
  ),
}
