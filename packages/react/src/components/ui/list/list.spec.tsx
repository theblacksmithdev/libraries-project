import { render, screen } from '@testing-library/react'
import { List, ListPrimitives, ListItem, ListItemContent, ListItemTitle } from '.'

describe('List', () => {
  it('renders simplified with items', () => {
    render(
      <List
        items={[
          { title: 'Item 1', description: 'Description 1' },
          { title: 'Item 2' },
        ]}
      />
    )
    expect(screen.getByText('Item 1')).toBeInTheDocument()
    expect(screen.getByText('Item 2')).toBeInTheDocument()
    expect(screen.getByText('Description 1')).toBeInTheDocument()
  })

  it('renders with leading and trailing slots', () => {
    render(
      <List
        items={[
          {
            leading: <svg data-testid="icon" />,
            title: 'With slots',
            trailing: <span>Badge</span>,
          },
        ]}
      />
    )
    expect(screen.getByTestId('icon')).toBeInTheDocument()
    expect(screen.getByText('Badge')).toBeInTheDocument()
  })

  it('renders compound primitives', () => {
    render(
      <ListPrimitives.Root>
        <ListPrimitives.Item>
          <ListPrimitives.ItemContent>
            <ListPrimitives.ItemTitle>Primitive</ListPrimitives.ItemTitle>
          </ListPrimitives.ItemContent>
        </ListPrimitives.Item>
      </ListPrimitives.Root>
    )
    expect(screen.getByText('Primitive')).toBeInTheDocument()
  })

  it('exports sub-parts for backward compat', () => {
    render(
      <ListPrimitives.Root>
        <ListItem>
          <ListItemContent>
            <ListItemTitle>Legacy</ListItemTitle>
          </ListItemContent>
        </ListItem>
      </ListPrimitives.Root>
    )
    expect(screen.getByText('Legacy')).toBeInTheDocument()
  })
})
