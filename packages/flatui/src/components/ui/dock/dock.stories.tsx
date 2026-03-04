import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import {
  Home, Search, Mail, Calendar, Settings, Music, Image, Film,
} from 'lucide-react'
import { Dock } from '.'

const meta: Meta<typeof Dock> = {
  title: 'Navigation/Dock',
  component: Dock,
  parameters: {
    docs: {
      description: {
        component:
          'macOS-style icon dock bar with magnification effect on hover, active indicators, and link support.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Dock>

const items = [
  { icon: <Home />, label: 'Home', active: true, onClick: () => {} },
  { icon: <Search />, label: 'Search', onClick: () => {} },
  { icon: <Mail />, label: 'Mail', onClick: () => {} },
  { icon: <Calendar />, label: 'Calendar', onClick: () => {} },
  { icon: <Music />, label: 'Music', onClick: () => {} },
  { icon: <Image />, label: 'Photos', onClick: () => {} },
  { icon: <Film />, label: 'Videos', onClick: () => {} },
  { icon: <Settings />, label: 'Settings', onClick: () => {} },
]

export const Default: Story = {
  render: () => (
    <div className="flex justify-center py-16">
      <Dock items={items} />
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `import { Dock } from '@flatui/react'\nimport { Home, Search, Mail } from 'lucide-react'\n\n<Dock items={[\n  { icon: <Home />, label: 'Home', active: true, onClick: () => {} },\n  { icon: <Search />, label: 'Search', onClick: () => {} },\n  { icon: <Mail />, label: 'Mail', onClick: () => {} },\n]} />`,
      },
    },
  },
}

export const NoMagnification: Story = {
  render: () => (
    <div className="flex justify-center py-16">
      <Dock items={items} magnification={false} />
    </div>
  ),
}

export const CustomSizes: Story = {
  render: () => (
    <div className="flex justify-center py-16">
      <Dock items={items} iconSize={24} maxIconSize={40} />
    </div>
  ),
}

export const WithLinks: Story = {
  render: () => (
    <div className="flex justify-center py-16">
      <Dock
        items={[
          { icon: <Home />, label: 'Home', href: '#home', active: true },
          { icon: <Search />, label: 'Search', href: '#search' },
          { icon: <Mail />, label: 'Mail', href: '#mail' },
          { icon: <Settings />, label: 'Settings', href: '#settings' },
        ]}
      />
    </div>
  ),
}

export const FewItems: Story = {
  render: () => (
    <div className="flex justify-center py-16">
      <Dock
        items={[
          { icon: <Home />, label: 'Home', onClick: () => {} },
          { icon: <Search />, label: 'Search', onClick: () => {} },
          { icon: <Settings />, label: 'Settings', onClick: () => {} },
        ]}
      />
    </div>
  ),
}
