import type { Meta, StoryObj } from '@storybook/react'
import * as React from 'react'
import { Pagination, PaginationPrimitives } from '.'

const meta: Meta<typeof Pagination> = {
  title: 'Navigation/Pagination',
  component: Pagination,
  parameters: {
    docs: {
      description: {
        component: 'Displays pagination with page navigation controls.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Pagination>

export const Default: Story = {
  render: () => {
    const [page, setPage] = React.useState(3)
    return <Pagination currentPage={page} totalPages={10} onPageChange={setPage} />
  },
  parameters: {
    docs: {
      source: {
        code: `import { Pagination } from '@blacksmith-ui/react'

<Pagination currentPage={3} totalPages={10} onPageChange={setPage} />`,
      },
    },
  },
}

export const Primitives: Story = {
  name: 'Compound / Primitives',
  render: () => (
    <PaginationPrimitives.Root>
      <PaginationPrimitives.Content>
        <PaginationPrimitives.Item><PaginationPrimitives.Previous href="#" /></PaginationPrimitives.Item>
        <PaginationPrimitives.Item><PaginationPrimitives.Link href="#">1</PaginationPrimitives.Link></PaginationPrimitives.Item>
        <PaginationPrimitives.Item><PaginationPrimitives.Link href="#" isActive>2</PaginationPrimitives.Link></PaginationPrimitives.Item>
        <PaginationPrimitives.Item><PaginationPrimitives.Link href="#">3</PaginationPrimitives.Link></PaginationPrimitives.Item>
        <PaginationPrimitives.Item><PaginationPrimitives.Ellipsis /></PaginationPrimitives.Item>
        <PaginationPrimitives.Item><PaginationPrimitives.Next href="#" /></PaginationPrimitives.Item>
      </PaginationPrimitives.Content>
    </PaginationPrimitives.Root>
  ),
}
