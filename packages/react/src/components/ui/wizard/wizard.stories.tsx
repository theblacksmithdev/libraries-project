import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { User, CreditCard, CheckCircle } from 'lucide-react'
import { Wizard } from '.'

const meta: Meta<typeof Wizard> = {
  title: 'Navigation/Wizard',
  component: Wizard,
  parameters: {
    docs: {
      description: {
        component:
          'Multi-step navigation with content panels, back/next buttons, and step indicators. Supports horizontal and vertical layouts.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Wizard>

const steps = [
  {
    title: 'Account',
    description: 'Create your account',
    content: (
      <div className="rounded-md border p-6">
        <h3 className="font-medium mb-2">Account Details</h3>
        <p className="text-sm text-muted-foreground">Enter your email and password to create an account.</p>
      </div>
    ),
  },
  {
    title: 'Profile',
    description: 'Set up your profile',
    content: (
      <div className="rounded-md border p-6">
        <h3 className="font-medium mb-2">Profile Information</h3>
        <p className="text-sm text-muted-foreground">Add your name, bio, and profile picture.</p>
      </div>
    ),
  },
  {
    title: 'Review',
    description: 'Review and submit',
    content: (
      <div className="rounded-md border p-6">
        <h3 className="font-medium mb-2">Review</h3>
        <p className="text-sm text-muted-foreground">Review your information before submitting.</p>
      </div>
    ),
  },
]

export const Default: Story = {
  render: () => <Wizard steps={steps} />,
  parameters: {
    docs: {
      source: {
        code: `import { Wizard } from '@blacksmith-ui/react'\n\n<Wizard\n  steps={[\n    { title: 'Account', content: <div>Step 1 content</div> },\n    { title: 'Profile', content: <div>Step 2 content</div> },\n    { title: 'Review', content: <div>Step 3 content</div> },\n  ]}\n/>`,
      },
    },
  },
}

export const Controlled: Story = {
  render: () => {
    const [step, setStep] = React.useState(0)
    return (
      <div className="space-y-4">
        <Wizard steps={steps} activeStep={step} onStepChange={setStep} />
        <p className="text-sm text-muted-foreground">Current step: {step + 1}</p>
      </div>
    )
  },
}

export const Vertical: Story = {
  render: () => <Wizard steps={steps} orientation="vertical" />,
}

export const WithIcons: Story = {
  render: () => (
    <Wizard
      steps={[
        { ...steps[0], icon: <User className="size-3.5" /> },
        { ...steps[1], icon: <CreditCard className="size-3.5" /> },
        { ...steps[2], icon: <CheckCircle className="size-3.5" /> },
      ]}
    />
  ),
}

export const WithOptionalStep: Story = {
  render: () => (
    <Wizard
      steps={[
        steps[0],
        { ...steps[1], optional: true },
        steps[2],
      ]}
    />
  ),
}

export const WithComplete: Story = {
  render: () => {
    const [done, setDone] = React.useState(false)
    return done ? (
      <div className="text-center py-8">
        <CheckCircle className="mx-auto h-12 w-12 text-emerald-500 mb-4" />
        <p className="font-medium">All done!</p>
      </div>
    ) : (
      <Wizard steps={steps} onComplete={() => setDone(true)} />
    )
  },
}

export const NoNavigation: Story = {
  render: () => {
    const [step, setStep] = React.useState(1)
    return <Wizard steps={steps} activeStep={step} onStepChange={setStep} showNavigation={false} />
  },
}

export const CustomLabels: Story = {
  render: () => (
    <Wizard
      steps={steps}
      backLabel="Previous"
      nextLabel="Continue"
      completeLabel="Submit"
    />
  ),
}
