import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { User, CreditCard, CheckCircle } from 'lucide-react'
import { Stepper, StepperPrimitives } from '.'

const meta: Meta<typeof Stepper> = {
  title: 'Navigation/Stepper',
  component: Stepper,
  parameters: {
    docs: {
      description: {
        component:
          'Multi-step progress indicator for wizard flows and multi-step forms.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Stepper>

const steps = [
  { title: 'Account', description: 'Create your account' },
  { title: 'Profile', description: 'Set up your profile' },
  { title: 'Review', description: 'Review and submit' },
]

export const Default: Story = {
  render: () => <Stepper steps={steps} activeStep={1} />,
  parameters: {
    docs: {
      source: {
        code: `import { Stepper } from '@blacksmith-ui/react'\n\n<Stepper\n  steps={[\n    { title: 'Account', description: 'Create your account' },\n    { title: 'Profile', description: 'Set up your profile' },\n    { title: 'Review', description: 'Review and submit' },\n  ]}\n  activeStep={1}\n/>`,
      },
    },
  },
}

export const AllCompleted: Story = {
  render: () => <Stepper steps={steps} activeStep={3} />,
}

export const FirstStep: Story = {
  render: () => <Stepper steps={steps} activeStep={0} />,
}

export const Vertical: Story = {
  render: () => <Stepper steps={steps} activeStep={1} orientation="vertical" />,
}

export const WithIcons: Story = {
  render: () => (
    <Stepper
      steps={[
        { title: 'Account', description: 'Create your account', icon: <User className="size-4" /> },
        { title: 'Payment', description: 'Add payment info', icon: <CreditCard className="size-4" /> },
        { title: 'Complete', description: 'All done', icon: <CheckCircle className="size-4" /> },
      ]}
      activeStep={1}
    />
  ),
}

export const Clickable: Story = {
  render: () => {
    const [active, setActive] = React.useState(1)
    return (
      <div className="flex flex-col gap-4">
        <Stepper steps={steps} activeStep={active} onStepClick={setActive} />
        <p className="text-sm text-muted-foreground text-center">
          Active step: {active + 1}
        </p>
      </div>
    )
  },
}

export const WithOptionalStep: Story = {
  render: () => (
    <Stepper
      steps={[
        { title: 'Account' },
        { title: 'Extras', optional: true },
        { title: 'Review' },
      ]}
      activeStep={0}
    />
  ),
}

export const Primitives: Story = {
  name: 'Compound / Primitives',
  render: () => (
    <StepperPrimitives.Root>
      <StepperPrimitives.Item status="completed">
        <StepperPrimitives.Indicator status="completed" />
        <div className="text-center">
          <StepperPrimitives.Title>Step 1</StepperPrimitives.Title>
        </div>
      </StepperPrimitives.Item>
      <StepperPrimitives.Separator completed />
      <StepperPrimitives.Item status="active">
        <StepperPrimitives.Indicator status="active">2</StepperPrimitives.Indicator>
        <div className="text-center">
          <StepperPrimitives.Title>Step 2</StepperPrimitives.Title>
        </div>
      </StepperPrimitives.Item>
      <StepperPrimitives.Separator />
      <StepperPrimitives.Item status="upcoming">
        <StepperPrimitives.Indicator status="upcoming">3</StepperPrimitives.Indicator>
        <div className="text-center">
          <StepperPrimitives.Title>Step 3</StepperPrimitives.Title>
        </div>
      </StepperPrimitives.Item>
    </StepperPrimitives.Root>
  ),
}
