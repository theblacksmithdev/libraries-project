import { render, screen } from '@testing-library/react'
import { Card, CardPrimitives, CardHeader, CardTitle, CardContent } from '.'

describe('Card', () => {
  it('renders simplified with title and children', () => {
    render(<Card title="Title">Content</Card>)
    expect(screen.getByText('Title')).toBeInTheDocument()
    expect(screen.getByText('Content')).toBeInTheDocument()
  })

  it('renders with description and footer', () => {
    render(<Card title="T" description="Desc" footer={<button>Action</button>}>Body</Card>)
    expect(screen.getByText('Desc')).toBeInTheDocument()
    expect(screen.getByText('Action')).toBeInTheDocument()
  })

  it('renders compound primitives', () => {
    render(
      <CardPrimitives.Root>
        <CardPrimitives.Header>
          <CardPrimitives.Title>Title</CardPrimitives.Title>
        </CardPrimitives.Header>
        <CardPrimitives.Content>Content</CardPrimitives.Content>
      </CardPrimitives.Root>
    )
    expect(screen.getByText('Title')).toBeInTheDocument()
  })

  it('exports sub-parts for backward compat', () => {
    render(
      <CardPrimitives.Root>
        <CardHeader><CardTitle>Legacy</CardTitle></CardHeader>
        <CardContent>Body</CardContent>
      </CardPrimitives.Root>
    )
    expect(screen.getByText('Legacy')).toBeInTheDocument()
  })
})
