import { render, screen, fireEvent } from '@testing-library/react'
import { DataTable, DataTablePrimitives } from '.'

interface TestRow {
  id: string
  name: string
  email: string
  age: number
}

const testData: TestRow[] = [
  { id: '1', name: 'Alice', email: 'alice@test.com', age: 30 },
  { id: '2', name: 'Bob', email: 'bob@test.com', age: 25 },
  { id: '3', name: 'Charlie', email: 'charlie@test.com', age: 35 },
]

const columns = [
  { key: 'name' as const, header: 'Name' },
  { key: 'email' as const, header: 'Email' },
  { key: 'age' as const, header: 'Age' },
]

describe('DataTable', () => {
  it('renders data with columns', () => {
    render(<DataTable columns={columns} data={testData} rowKey="id" pageSize={0} />)
    expect(screen.getByText('Name')).toBeInTheDocument()
    expect(screen.getByText('Alice')).toBeInTheDocument()
    expect(screen.getByText('bob@test.com')).toBeInTheDocument()
  })

  it('sorts by column on click', () => {
    render(<DataTable columns={columns} data={testData} rowKey="id" pageSize={0} />)
    const nameHeader = screen.getByText('Name')
    fireEvent.click(nameHeader)
    const cells = screen.getAllByRole('cell')
    const nameCells = cells.filter((_, i) => i % 3 === 0)
    expect(nameCells[0]).toHaveTextContent('Alice')
    expect(nameCells[1]).toHaveTextContent('Bob')
    expect(nameCells[2]).toHaveTextContent('Charlie')
  })

  it('filters data', () => {
    render(
      <DataTable columns={columns} data={testData} rowKey="id" filterable pageSize={0} />
    )
    const input = screen.getByPlaceholderText('Filter...')
    fireEvent.change(input, { target: { value: 'bob' } })
    expect(screen.getByText('Bob')).toBeInTheDocument()
    expect(screen.queryByText('Alice')).not.toBeInTheDocument()
  })

  it('paginates data', () => {
    render(<DataTable columns={columns} data={testData} rowKey="id" pageSize={2} />)
    expect(screen.getByText('Alice')).toBeInTheDocument()
    expect(screen.getByText('Bob')).toBeInTheDocument()
    expect(screen.queryByText('Charlie')).not.toBeInTheDocument()

    fireEvent.click(screen.getByText('Next'))
    expect(screen.queryByText('Alice')).not.toBeInTheDocument()
    expect(screen.getByText('Charlie')).toBeInTheDocument()
  })

  it('selects rows', () => {
    render(
      <DataTable columns={columns} data={testData} rowKey="id" selectable pageSize={0} />
    )
    const checkboxes = screen.getAllByRole('checkbox')
    // First is select-all, rest are row checkboxes
    expect(checkboxes).toHaveLength(4)
    fireEvent.click(checkboxes[1]) // Select Alice
    expect(checkboxes[1]).toBeChecked()
  })

  it('shows empty state when no data', () => {
    render(<DataTable columns={columns} data={[]} rowKey="id" pageSize={0} />)
    expect(screen.getByText('No results.')).toBeInTheDocument()
  })

  it('renders with custom cell renderer', () => {
    render(
      <DataTable
        columns={[
          { key: 'name', header: 'Name', cell: (row) => <strong>{row.name}</strong> },
        ]}
        data={testData}
        rowKey="id"
        pageSize={0}
      />
    )
    expect(screen.getByText('Alice').tagName).toBe('STRONG')
  })

  it('exports primitives', () => {
    expect(DataTablePrimitives.Root).toBeDefined()
    expect(DataTablePrimitives.Toolbar).toBeDefined()
    expect(DataTablePrimitives.Filter).toBeDefined()
    expect(DataTablePrimitives.ColumnHeader).toBeDefined()
    expect(DataTablePrimitives.Pagination).toBeDefined()
    expect(DataTablePrimitives.Table).toBeDefined()
  })
})
