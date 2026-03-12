import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { ThemeProvider } from './theme-provider'
import { useThemeConfig } from '../../../hooks/use-theme-config'
import { presets, type PresetName } from '../../../lib/presets'
import type { ThemeMode } from '../../../lib/theme-types'

const meta: Meta<typeof ThemeProvider> = {
  title: 'Theme/ThemeProvider',
  component: ThemeProvider,
  parameters: { layout: 'padded' },
}

export default meta
type Story = StoryObj<typeof ThemeProvider>

function SampleCard({ label }: { label?: string }) {
  return (
    <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
      <h3 className="text-lg font-semibold">{label ?? 'Sample Card'}</h3>
      <p className="text-sm text-muted-foreground mt-1">
        This card demonstrates the current theme configuration.
      </p>
      <div className="flex gap-2 mt-4">
        <button className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground">
          Primary
        </button>
        <button className="rounded-md bg-secondary px-4 py-2 text-sm text-secondary-foreground">
          Secondary
        </button>
        <button className="rounded-md bg-destructive px-4 py-2 text-sm text-destructive-foreground">
          Destructive
        </button>
      </div>
    </div>
  )
}

function ModeToggle() {
  const { mode, setMode, resolvedMode } = useThemeConfig()
  const modes: ThemeMode[] = ['light', 'dark', 'system']
  return (
    <div className="flex items-center gap-4 mb-4">
      <span className="text-sm text-muted-foreground">
        Mode: <strong>{mode}</strong> (resolved: {resolvedMode})
      </span>
      <div className="flex gap-1">
        {modes.map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`rounded-md px-3 py-1 text-sm ${
              mode === m
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground'
            }`}
          >
            {m}
          </button>
        ))}
      </div>
    </div>
  )
}

// Stories

export const Default: Story = {
  render: () => (
    <ThemeProvider>
      <div className="bg-background text-foreground p-6 rounded-lg">
        <SampleCard />
      </div>
    </ThemeProvider>
  ),
}

export const CustomColors: Story = {
  render: () => (
    <ThemeProvider
      theme={{
        colors: { primary: '#3b82f6', 'primary-foreground': '0 0% 100%' },
      }}
    >
      <div className="bg-background text-foreground p-6 rounded-lg">
        <SampleCard label="Custom Blue Primary" />
      </div>
    </ThemeProvider>
  ),
}

export const WithPreset: Story = {
  render: () => (
    <ThemeProvider theme={presets.blue}>
      <div className="bg-background text-foreground p-6 rounded-lg">
        <SampleCard label="Blue Preset" />
      </div>
    </ThemeProvider>
  ),
}

export const AllPresets: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4">
      {(Object.keys(presets) as PresetName[]).map((name) => (
        <ThemeProvider key={name} theme={presets[name]} defaultMode="light">
          <div className="bg-background text-foreground p-6 rounded-lg">
            <SampleCard label={`${name} preset`} />
          </div>
        </ThemeProvider>
      ))}
    </div>
  ),
}

export const DarkMode: Story = {
  render: () => (
    <ThemeProvider theme={presets.blue} defaultMode="dark">
      <div className="bg-background text-foreground p-6 rounded-lg">
        <SampleCard label="Dark Mode (Blue)" />
      </div>
    </ThemeProvider>
  ),
}

export const ModeToggleStory: Story = {
  name: 'ModeToggle',
  render: () => (
    <ThemeProvider theme={presets.blue} defaultMode="light">
      <div className="bg-background text-foreground p-6 rounded-lg">
        <ModeToggle />
        <SampleCard label="Toggle the mode above" />
      </div>
    </ThemeProvider>
  ),
}

export const HexColors: Story = {
  render: () => (
    <ThemeProvider
      theme={{
        colors: {
          primary: '#8b5cf6',
          'primary-foreground': '#ffffff',
          background: '#faf5ff',
          foreground: '#1e1b4b',
        },
      }}
    >
      <div className="bg-background text-foreground p-6 rounded-lg">
        <SampleCard label="Hex Colors (Violet)" />
      </div>
    </ThemeProvider>
  ),
}

export const CustomTypography: Story = {
  render: () => (
    <ThemeProvider
      theme={{
        typography: {
          fontFamily: 'Georgia, serif',
        },
      }}
    >
      <div className="bg-background text-foreground p-6 rounded-lg">
        <SampleCard label="Custom Typography" />
      </div>
    </ThemeProvider>
  ),
}

export const CustomRadius: Story = {
  render: () => (
    <div className="flex gap-4">
      {['0rem', '0.5rem', '1rem', '1.5rem'].map((r) => (
        <ThemeProvider key={r} theme={{ radius: r }}>
          <div className="bg-background text-foreground p-4 rounded-lg">
            <SampleCard label={`radius: ${r}`} />
          </div>
        </ThemeProvider>
      ))}
    </div>
  ),
}

export const PartialOverride: Story = {
  render: () => (
    <ThemeProvider
      theme={{
        colors: { primary: '263 70% 58%' },
        radius: '1rem',
      }}
    >
      <div className="bg-background text-foreground p-6 rounded-lg">
        <SampleCard label="Partial Override (only primary + radius)" />
      </div>
    </ThemeProvider>
  ),
}
