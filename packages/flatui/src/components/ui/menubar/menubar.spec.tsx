import { render, screen } from '@testing-library/react'
import { Menubar, MenubarMenu, MenubarTrigger, MenubarContent, MenubarItem } from '.'

describe('Menubar', () => {
  it('renders', () => {
    render(<Menubar><MenubarMenu><MenubarTrigger>File</MenubarTrigger><MenubarContent><MenubarItem>New</MenubarItem></MenubarContent></MenubarMenu></Menubar>)
    expect(screen.getByText('File')).toBeInTheDocument()
  })
})
