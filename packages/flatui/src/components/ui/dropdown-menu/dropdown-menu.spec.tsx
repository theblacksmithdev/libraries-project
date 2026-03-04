import { render, screen } from '@testing-library/react'
import { DropdownMenu, DropdownMenuPrimitives, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '.'

describe('DropdownMenu', () => {
  it('renders simplified trigger', () => {
    render(
      <DropdownMenu
        trigger={<button>Open</button>}
        items={[
          { label: 'Item 1' },
          { type: 'separator' },
          { label: 'Item 2' },
        ]}
      />
    )
    expect(screen.getByText('Open')).toBeInTheDocument()
  })

  it('renders compound primitives', () => {
    render(
      <DropdownMenuPrimitives.Root>
        <DropdownMenuPrimitives.Trigger>Open</DropdownMenuPrimitives.Trigger>
        <DropdownMenuPrimitives.Content>
          <DropdownMenuPrimitives.Item>Item</DropdownMenuPrimitives.Item>
        </DropdownMenuPrimitives.Content>
      </DropdownMenuPrimitives.Root>
    )
    expect(screen.getByText('Open')).toBeInTheDocument()
  })

  it('exports sub-parts for backward compat', () => {
    render(
      <DropdownMenuPrimitives.Root>
        <DropdownMenuTrigger>Open</DropdownMenuTrigger>
        <DropdownMenuContent><DropdownMenuItem>Item</DropdownMenuItem></DropdownMenuContent>
      </DropdownMenuPrimitives.Root>
    )
    expect(screen.getByText('Open')).toBeInTheDocument()
  })
})
