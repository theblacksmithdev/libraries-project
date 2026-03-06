import { render, screen } from '@testing-library/react'
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from '.'

describe('NavigationMenu', () => {
  it('renders', () => {
    render(<NavigationMenu><NavigationMenuList><NavigationMenuItem><NavigationMenuLink>Home</NavigationMenuLink></NavigationMenuItem></NavigationMenuList></NavigationMenu>)
    expect(screen.getByText('Home')).toBeInTheDocument()
  })
})
