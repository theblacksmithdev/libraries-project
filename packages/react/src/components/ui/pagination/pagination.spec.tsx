import { render, screen } from '@testing-library/react'
import { Pagination, PaginationPrimitives, PaginationContent, PaginationItem, PaginationLink } from '.'

describe('Pagination', () => {
  it('renders simplified with current page and total', () => {
    const onPageChange = vi.fn()
    render(<Pagination currentPage={3} totalPages={10} onPageChange={onPageChange} />)
    expect(screen.getByText('3')).toBeInTheDocument()
    expect(screen.getByText('Previous')).toBeInTheDocument()
    expect(screen.getByText('Next')).toBeInTheDocument()
  })

  it('renders compound primitives', () => {
    render(
      <PaginationPrimitives.Root>
        <PaginationPrimitives.Content>
          <PaginationPrimitives.Item>
            <PaginationPrimitives.Link href="#">1</PaginationPrimitives.Link>
          </PaginationPrimitives.Item>
        </PaginationPrimitives.Content>
      </PaginationPrimitives.Root>
    )
    expect(screen.getByText('1')).toBeInTheDocument()
  })

  it('exports sub-parts for backward compat', () => {
    render(
      <PaginationPrimitives.Root>
        <PaginationContent>
          <PaginationItem><PaginationLink href="#">1</PaginationLink></PaginationItem>
        </PaginationContent>
      </PaginationPrimitives.Root>
    )
    expect(screen.getByText('1')).toBeInTheDocument()
  })
})
