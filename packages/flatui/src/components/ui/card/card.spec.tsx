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

  it('renders default variant with border and bg-card', () => {
    const { container } = render(<Card title="Test">Body</Card>)
    const root = container.firstChild as HTMLElement
    expect(root.className).toContain('border')
    expect(root.className).toContain('bg-card')
  })

  it('renders elevated variant with shadow', () => {
    const { container } = render(<Card title="Test" variant="elevated">Body</Card>)
    const root = container.firstChild as HTMLElement
    expect(root.className).toContain('shadow-md')
    expect(root.className).toContain('bg-card')
  })

  it('renders ghost variant without border', () => {
    const { container } = render(<Card title="Test" variant="ghost">Body</Card>)
    const root = container.firstChild as HTMLElement
    expect(root.className).toContain('bg-transparent')
    expect(root.className).not.toContain('border')
  })

  it('renders outlined variant with border-2', () => {
    const { container } = render(<Card title="Test" variant="outlined">Body</Card>)
    const root = container.firstChild as HTMLElement
    expect(root.className).toContain('border-2')
  })

  it('renders filled variant with bg-muted', () => {
    const { container } = render(<Card title="Test" variant="filled">Body</Card>)
    const root = container.firstChild as HTMLElement
    expect(root.className).toContain('bg-muted')
  })
})
