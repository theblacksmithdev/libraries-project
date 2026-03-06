import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { SpotlightTour } from '.'
import type { TourStep } from '.'

const meta: Meta<typeof SpotlightTour> = {
  title: 'Overlay/SpotlightTour',
  component: SpotlightTour,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Guided product tour with highlighted elements using a spotlight overlay effect.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof SpotlightTour>

const SampleUI = () => (
  <div className="min-h-screen bg-background p-8">
    <header className="flex items-center justify-between border-b pb-4 mb-8">
      <h1 id="app-logo" className="text-2xl font-bold">
        My App
      </h1>
      <nav className="flex gap-4">
        <button
          id="nav-dashboard"
          className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground"
        >
          Dashboard
        </button>
        <button
          id="nav-settings"
          className="rounded-md border px-4 py-2 text-sm"
        >
          Settings
        </button>
      </nav>
    </header>
    <main>
      <div
        id="main-content"
        className="rounded-lg border p-8 text-center text-muted-foreground"
      >
        <h2 className="text-lg font-medium mb-2">Welcome to the Dashboard</h2>
        <p>This is your main content area.</p>
      </div>
      <div className="mt-6 grid grid-cols-3 gap-4">
        <div
          id="widget-1"
          className="rounded-lg border p-4"
        >
          <h3 className="font-medium">Analytics</h3>
          <p className="text-sm text-muted-foreground">View your metrics</p>
        </div>
        <div id="widget-2" className="rounded-lg border p-4">
          <h3 className="font-medium">Reports</h3>
          <p className="text-sm text-muted-foreground">Generate reports</p>
        </div>
        <div id="widget-3" className="rounded-lg border p-4">
          <h3 className="font-medium">Activity</h3>
          <p className="text-sm text-muted-foreground">Recent events</p>
        </div>
      </div>
    </main>
  </div>
)

const defaultSteps: TourStep[] = [
  {
    target: '#app-logo',
    title: 'Welcome!',
    description: 'This is your application logo and brand area.',
    placement: 'bottom',
  },
  {
    target: '#nav-dashboard',
    title: 'Dashboard',
    description: 'Click here to access your main dashboard with all your data.',
    placement: 'bottom',
  },
  {
    target: '#main-content',
    title: 'Content Area',
    description: 'This is where your main content will be displayed.',
    placement: 'bottom',
  },
]

export const Default: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false)

    return (
      <div>
        <SampleUI />
        <div className="fixed bottom-4 right-4 z-50">
          <button
            onClick={() => setOpen(true)}
            className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground shadow-lg"
          >
            Start Tour
          </button>
        </div>
        <SpotlightTour
          steps={defaultSteps}
          open={open}
          onOpenChange={setOpen}
          onComplete={() => console.log('Tour completed!')}
          onSkip={() => console.log('Tour skipped')}
        />
      </div>
    )
  },
  parameters: {
    docs: {
      source: {
        code: `import { SpotlightTour } from '@blacksmith-ui/react'

const steps = [
  { target: '#logo', title: 'Welcome!', description: 'Your brand area.' },
  { target: '#dashboard', title: 'Dashboard', description: 'Your data.' },
]

<SpotlightTour
  steps={steps}
  open={open}
  onOpenChange={setOpen}
  onComplete={() => console.log('Done!')}
/>`,
      },
    },
  },
}

export const SingleStep: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false)

    return (
      <div>
        <SampleUI />
        <div className="fixed bottom-4 right-4 z-50">
          <button
            onClick={() => setOpen(true)}
            className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground shadow-lg"
          >
            Show Tip
          </button>
        </div>
        <SpotlightTour
          steps={[
            {
              target: '#nav-settings',
              title: 'Settings',
              description: 'Configure your app preferences here.',
              placement: 'bottom',
            },
          ]}
          open={open}
          onOpenChange={setOpen}
        />
      </div>
    )
  },
}

export const CustomPlacement: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false)

    const steps: TourStep[] = [
      {
        target: '#widget-1',
        title: 'Analytics',
        description: 'View detailed analytics here.',
        placement: 'right',
      },
      {
        target: '#widget-2',
        title: 'Reports',
        description: 'Generate and download reports.',
        placement: 'top',
      },
      {
        target: '#widget-3',
        title: 'Activity',
        description: 'See recent activity and events.',
        placement: 'left',
      },
    ]

    return (
      <div>
        <SampleUI />
        <div className="fixed bottom-4 right-4 z-50">
          <button
            onClick={() => setOpen(true)}
            className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground shadow-lg"
          >
            Start Tour
          </button>
        </div>
        <SpotlightTour
          steps={steps}
          open={open}
          onOpenChange={setOpen}
        />
      </div>
    )
  },
}

export const NoSkip: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false)

    return (
      <div>
        <SampleUI />
        <div className="fixed bottom-4 right-4 z-50">
          <button
            onClick={() => setOpen(true)}
            className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground shadow-lg"
          >
            Start Tour
          </button>
        </div>
        <SpotlightTour
          steps={defaultSteps}
          open={open}
          onOpenChange={setOpen}
          showSkip={false}
        />
      </div>
    )
  },
}

export const CustomLabels: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false)

    return (
      <div>
        <SampleUI />
        <div className="fixed bottom-4 right-4 z-50">
          <button
            onClick={() => setOpen(true)}
            className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground shadow-lg"
          >
            Start Tour
          </button>
        </div>
        <SpotlightTour
          steps={defaultSteps}
          open={open}
          onOpenChange={setOpen}
          labels={{
            next: 'Continue',
            back: 'Previous',
            skip: 'Exit tour',
            finish: 'Complete',
          }}
        />
      </div>
    )
  },
}
