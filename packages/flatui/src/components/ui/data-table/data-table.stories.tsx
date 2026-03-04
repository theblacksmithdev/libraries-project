import type { Meta, StoryObj } from '@storybook/react'
import { DataTable } from '.'

const meta: Meta = {
  title: 'Data Display/DataTable',
  parameters: {
    docs: {
      description: {
        component: 'Feature-rich data table with sorting, filtering, pagination, and row selection.',
      },
    },
  },
}

export default meta
type Story = StoryObj

interface Payment {
  id: string
  status: string
  email: string
  amount: number
}

const payments: Payment[] = [
  { id: 'pay_001', status: 'Success', email: 'alice@example.com', amount: 316 },
  { id: 'pay_002', status: 'Pending', email: 'bob@example.com', amount: 242 },
  { id: 'pay_003', status: 'Success', email: 'charlie@example.com', amount: 837 },
  { id: 'pay_004', status: 'Failed', email: 'dave@example.com', amount: 874 },
  { id: 'pay_005', status: 'Success', email: 'eve@example.com', amount: 721 },
  { id: 'pay_006', status: 'Pending', email: 'frank@example.com', amount: 130 },
  { id: 'pay_007', status: 'Success', email: 'grace@example.com', amount: 593 },
  { id: 'pay_008', status: 'Failed', email: 'heidi@example.com', amount: 412 },
  { id: 'pay_009', status: 'Success', email: 'ivan@example.com', amount: 155 },
  { id: 'pay_010', status: 'Pending', email: 'judy@example.com', amount: 689 },
  { id: 'pay_011', status: 'Success', email: 'karl@example.com', amount: 201 },
  { id: 'pay_012', status: 'Failed', email: 'lisa@example.com', amount: 445 },
]

export const Default: Story = {
  render: () => (
    <DataTable<Payment>
      columns={[
        { key: 'status', header: 'Status' },
        { key: 'email', header: 'Email' },
        { key: 'amount', header: 'Amount', cell: (row) => `$${row.amount.toFixed(2)}` },
      ]}
      data={payments}
      rowKey="id"
      filterable
      filterPlaceholder="Filter emails..."
      pageSize={5}
    />
  ),
  parameters: {
    docs: {
      source: {
        code: `import { DataTable } from '@flatui/react'

<DataTable
  columns={[
    { key: 'status', header: 'Status' },
    { key: 'email', header: 'Email' },
    { key: 'amount', header: 'Amount', cell: (row) => \`$\${row.amount}\` },
  ]}
  data={payments}
  rowKey="id"
  filterable
  pageSize={5}
/>`,
      },
    },
  },
}

export const WithSelection: Story = {
  render: () => (
    <DataTable<Payment>
      columns={[
        { key: 'status', header: 'Status' },
        { key: 'email', header: 'Email' },
        { key: 'amount', header: 'Amount', cell: (row) => `$${row.amount.toFixed(2)}` },
      ]}
      data={payments}
      rowKey="id"
      selectable
      filterable
      pageSize={5}
    />
  ),
}

export const NoPagination: Story = {
  render: () => (
    <DataTable<Payment>
      columns={[
        { key: 'status', header: 'Status' },
        { key: 'email', header: 'Email' },
        { key: 'amount', header: 'Amount' },
      ]}
      data={payments.slice(0, 5)}
      rowKey="id"
      pageSize={0}
    />
  ),
}
