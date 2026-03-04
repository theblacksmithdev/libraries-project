import { render, screen } from '@testing-library/react'
import { Drawer, DrawerTrigger } from '.'

describe('Drawer', () => {
  it('renders', () => {
    render(<Drawer><DrawerTrigger>Open</DrawerTrigger></Drawer>)
    expect(screen.getByText('Open')).toBeInTheDocument()
  })
})
