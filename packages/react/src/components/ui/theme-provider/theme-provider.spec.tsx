import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import * as React from 'react'
import { ThemeProvider } from './theme-provider'
import { useThemeConfig } from '../../../hooks/use-theme-config'

// Helper to read context values
function ThemeConsumer() {
  const ctx = useThemeConfig()
  return (
    <div>
      <span data-testid="mode">{ctx.mode}</span>
      <span data-testid="resolved">{ctx.resolvedMode}</span>
      <button onClick={() => ctx.setMode('dark')}>Set Dark</button>
      <button onClick={() => ctx.setMode('light')}>Set Light</button>
      <button onClick={() => ctx.setMode('system')}>Set System</button>
    </div>
  )
}

let mockMatchMedia: {
  matches: boolean
  listeners: Array<(e: MediaQueryListEvent) => void>
}

beforeEach(() => {
  localStorage.clear()
  mockMatchMedia = { matches: false, listeners: [] }
  vi.spyOn(window, 'matchMedia').mockImplementation(() => ({
    matches: mockMatchMedia.matches,
    media: '(prefers-color-scheme: dark)',
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: (_: string, fn: EventListenerOrEventListenerObject) => {
      mockMatchMedia.listeners.push(fn as (e: MediaQueryListEvent) => void)
    },
    removeEventListener: (_: string, fn: EventListenerOrEventListenerObject) => {
      mockMatchMedia.listeners = mockMatchMedia.listeners.filter(l => l !== fn)
    },
    dispatchEvent: vi.fn(),
  }))
})

afterEach(() => {
  vi.restoreAllMocks()
})

describe('ThemeProvider', () => {
  it('renders children', () => {
    render(
      <ThemeProvider>
        <span>Hello</span>
      </ThemeProvider>
    )
    expect(screen.getByText('Hello')).toBeInTheDocument()
  })

  it('applies dark class when defaultMode is dark', () => {
    const { container } = render(
      <ThemeProvider defaultMode="dark">
        <span>Dark</span>
      </ThemeProvider>
    )
    expect(container.firstChild).toHaveClass('dark')
  })

  it('does not apply dark class in light mode', () => {
    const { container } = render(
      <ThemeProvider defaultMode="light">
        <span>Light</span>
      </ThemeProvider>
    )
    expect(container.firstChild).not.toHaveClass('dark')
  })

  it('applies inline CSS variables from theme', () => {
    const { container } = render(
      <ThemeProvider theme={{ colors: { primary: '217 91% 60%' }, radius: '1rem' }}>
        <span>Themed</span>
      </ThemeProvider>
    )
    const div = container.firstChild as HTMLElement
    expect(div.style.getPropertyValue('--primary')).toBe('217 91% 60%')
    expect(div.style.getPropertyValue('--radius')).toBe('1rem')
  })

  it('converts hex colors in inline styles', () => {
    const { container } = render(
      <ThemeProvider theme={{ colors: { primary: '#3b82f6' } }}>
        <span>Hex</span>
      </ThemeProvider>
    )
    const div = container.firstChild as HTMLElement
    expect(div.style.getPropertyValue('--primary')).toBe('217 91% 60%')
  })

  it('uses darkColors in dark mode', () => {
    const { container } = render(
      <ThemeProvider
        defaultMode="dark"
        theme={{
          colors: { primary: '100 50% 50%' },
          darkColors: { primary: '200 60% 40%' },
        }}
      >
        <span>Dark theme</span>
      </ThemeProvider>
    )
    const div = container.firstChild as HTMLElement
    expect(div.style.getPropertyValue('--primary')).toBe('200 60% 40%')
  })

  it('provides mode and resolvedMode via context', () => {
    render(
      <ThemeProvider defaultMode="dark">
        <ThemeConsumer />
      </ThemeProvider>
    )
    expect(screen.getByTestId('mode')).toHaveTextContent('dark')
    expect(screen.getByTestId('resolved')).toHaveTextContent('dark')
  })

  it('setMode updates mode and persists to localStorage', async () => {
    const user = userEvent.setup()
    render(
      <ThemeProvider defaultMode="light">
        <ThemeConsumer />
      </ThemeProvider>
    )
    expect(screen.getByTestId('mode')).toHaveTextContent('light')
    await user.click(screen.getByText('Set Dark'))
    expect(screen.getByTestId('mode')).toHaveTextContent('dark')
    expect(localStorage.getItem('flatui-theme-mode')).toBe('dark')
  })

  it('reads initial mode from localStorage', () => {
    localStorage.setItem('flatui-theme-mode', 'dark')
    render(
      <ThemeProvider defaultMode="light">
        <ThemeConsumer />
      </ThemeProvider>
    )
    expect(screen.getByTestId('mode')).toHaveTextContent('dark')
  })

  it('uses custom storageKey', async () => {
    const user = userEvent.setup()
    render(
      <ThemeProvider storageKey="my-key" defaultMode="light">
        <ThemeConsumer />
      </ThemeProvider>
    )
    await user.click(screen.getByText('Set Dark'))
    expect(localStorage.getItem('my-key')).toBe('dark')
    expect(localStorage.getItem('flatui-theme-mode')).toBeNull()
  })

  it('resolves system mode from matchMedia', () => {
    mockMatchMedia.matches = true
    render(
      <ThemeProvider defaultMode="system">
        <ThemeConsumer />
      </ThemeProvider>
    )
    expect(screen.getByTestId('mode')).toHaveTextContent('system')
    expect(screen.getByTestId('resolved')).toHaveTextContent('dark')
  })

  it('responds to matchMedia changes', async () => {
    mockMatchMedia.matches = false
    render(
      <ThemeProvider defaultMode="system">
        <ThemeConsumer />
      </ThemeProvider>
    )
    expect(screen.getByTestId('resolved')).toHaveTextContent('light')

    act(() => {
      mockMatchMedia.listeners.forEach(fn =>
        fn({ matches: true } as MediaQueryListEvent)
      )
    })
    expect(screen.getByTestId('resolved')).toHaveTextContent('dark')
  })
})

describe('useThemeConfig outside provider', () => {
  it('returns safe defaults without crashing', () => {
    function Standalone() {
      const ctx = useThemeConfig()
      return (
        <div>
          <span data-testid="mode">{ctx.mode}</span>
          <span data-testid="resolved">{ctx.resolvedMode}</span>
        </div>
      )
    }
    render(<Standalone />)
    expect(screen.getByTestId('mode')).toHaveTextContent('system')
    expect(screen.getByTestId('resolved')).toHaveTextContent('light')
  })
})
