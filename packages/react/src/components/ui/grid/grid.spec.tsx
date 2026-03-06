import { render, screen } from '@testing-library/react'
import { Grid, GridItem } from '.'

describe('Grid', () => {
  it('renders children', () => {
    render(<Grid>Content</Grid>)
    expect(screen.getByText('Content')).toBeInTheDocument()
  })

  it('applies grid class', () => {
    render(<Grid>Content</Grid>)
    expect(screen.getByText('Content')).toHaveClass('grid')
  })

  it('applies columns variant', () => {
    render(<Grid columns={3}>Content</Grid>)
    expect(screen.getByText('Content')).toHaveClass('grid-cols-3')
  })

  it('applies gap variant', () => {
    render(<Grid gap={8}>Content</Grid>)
    expect(screen.getByText('Content')).toHaveClass('gap-8')
  })

  it('applies responsive column classes', () => {
    render(<Grid responsive={{ sm: 2, md: 3, lg: 4 }}>Content</Grid>)
    const el = screen.getByText('Content')
    expect(el).toHaveClass('sm:grid-cols-2')
    expect(el).toHaveClass('md:grid-cols-3')
    expect(el).toHaveClass('lg:grid-cols-4')
  })

  it('applies alignment variants', () => {
    render(<Grid align="center" justify="center">Content</Grid>)
    const el = screen.getByText('Content')
    expect(el).toHaveClass('items-center')
    expect(el).toHaveClass('justify-items-center')
  })

  it('renders as custom element', () => {
    render(<Grid as="section">Content</Grid>)
    expect(screen.getByText('Content').tagName).toBe('SECTION')
  })

  it('merges custom className', () => {
    render(<Grid className="custom">Content</Grid>)
    expect(screen.getByText('Content')).toHaveClass('grid', 'custom')
  })
})

describe('GridItem', () => {
  it('renders children', () => {
    render(<GridItem>Item</GridItem>)
    expect(screen.getByText('Item')).toBeInTheDocument()
  })

  it('applies span class', () => {
    render(<GridItem span={2}>Item</GridItem>)
    expect(screen.getByText('Item')).toHaveClass('col-span-2')
  })

  it('applies full span', () => {
    render(<GridItem span="full">Item</GridItem>)
    expect(screen.getByText('Item')).toHaveClass('col-span-full')
  })

  it('applies start class', () => {
    render(<GridItem start={3}>Item</GridItem>)
    expect(screen.getByText('Item')).toHaveClass('col-start-3')
  })

  it('combines span and start', () => {
    render(<GridItem span={2} start={2}>Item</GridItem>)
    const el = screen.getByText('Item')
    expect(el).toHaveClass('col-span-2')
    expect(el).toHaveClass('col-start-2')
  })
})
