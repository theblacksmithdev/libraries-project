import { render, screen } from '@testing-library/react'
import { Home, Search, Settings } from 'lucide-react'
import { Dock } from '.'

const items = [
  { icon: <Home />, label: 'Home', onClick: vi.fn() },
  { icon: <Search />, label: 'Search', onClick: vi.fn() },
  { icon: <Settings />, label: 'Settings', onClick: vi.fn() },
]

describe('Dock', () => {
  it('renders all items', () => {
    render(<Dock items={items} />)
    expect(screen.getByRole('button', { name: 'Home' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Settings' })).toBeInTheDocument()
  })

  it('has toolbar role', () => {
    render(<Dock items={items} />)
    expect(screen.getByRole('toolbar')).toBeInTheDocument()
  })

  it('calls onClick when item is clicked', async () => {
    const onClick = vi.fn()
    render(<Dock items={[{ icon: <Home />, label: 'Home', onClick }]} />)
    screen.getByRole('button', { name: 'Home' }).click()
    expect(onClick).toHaveBeenCalledOnce()
  })

  it('renders active indicator', () => {
    const { container } = render(
      <Dock items={[{ icon: <Home />, label: 'Home', active: true }]} />
    )
    expect(container.querySelector('.rounded-full.bg-foreground')).toBeInTheDocument()
  })

  it('renders links when href is provided', () => {
    render(
      <Dock items={[{ icon: <Home />, label: 'Home', href: '/home' }]} />
    )
    const link = screen.getByRole('link', { name: 'Home' })
    expect(link).toHaveAttribute('href', '/home')
  })

  it('accepts custom className', () => {
    render(<Dock items={items} className="custom-dock" />)
    expect(screen.getByRole('toolbar')).toHaveClass('custom-dock')
  })
})
