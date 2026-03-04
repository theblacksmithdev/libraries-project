import { render, screen } from '@testing-library/react'
import { Table, TablePrimitives, TableHeader, TableBody, TableRow, TableHead, TableCell } from '.'

describe('Table', () => {
  it('renders simplified with columns and data', () => {
    render(
      <Table
        columns={[
          { key: 'name', header: 'Name' },
          { key: 'email', header: 'Email' },
        ]}
        data={[
          { name: 'Alice', email: 'alice@example.com' },
          { name: 'Bob', email: 'bob@example.com' },
        ]}
      />
    )
    expect(screen.getByText('Name')).toBeInTheDocument()
    expect(screen.getByText('Alice')).toBeInTheDocument()
    expect(screen.getByText('bob@example.com')).toBeInTheDocument()
  })

  it('renders with custom cell renderer', () => {
    render(
      <Table
        columns={[
          { key: 'name', header: 'Name', cell: (row) => <strong>{row.name as string}</strong> },
        ]}
        data={[{ name: 'Alice' }]}
      />
    )
    expect(screen.getByText('Alice').tagName).toBe('STRONG')
  })

  it('renders compound primitives', () => {
    render(
      <TablePrimitives.Root>
        <TablePrimitives.Header>
          <TablePrimitives.Row>
            <TablePrimitives.Head>Name</TablePrimitives.Head>
          </TablePrimitives.Row>
        </TablePrimitives.Header>
        <TablePrimitives.Body>
          <TablePrimitives.Row>
            <TablePrimitives.Cell>Value</TablePrimitives.Cell>
          </TablePrimitives.Row>
        </TablePrimitives.Body>
      </TablePrimitives.Root>
    )
    expect(screen.getByText('Name')).toBeInTheDocument()
  })

  it('exports sub-parts for backward compat', () => {
    render(
      <TablePrimitives.Root>
        <TableHeader><TableRow><TableHead>H</TableHead></TableRow></TableHeader>
        <TableBody><TableRow><TableCell>C</TableCell></TableRow></TableBody>
      </TablePrimitives.Root>
    )
    expect(screen.getByText('H')).toBeInTheDocument()
  })
})
