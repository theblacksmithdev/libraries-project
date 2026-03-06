import { render, screen } from '@testing-library/react'
import { ContextMenu, ContextMenuTrigger, ContextMenuContent, ContextMenuItem } from '.'

describe('ContextMenu', () => {
  it('renders', () => {
    render(<ContextMenu><ContextMenuTrigger>Trigger</ContextMenuTrigger><ContextMenuContent><ContextMenuItem>Item</ContextMenuItem></ContextMenuContent></ContextMenu>)
    expect(screen.getByText('Trigger')).toBeInTheDocument()
  })
})
