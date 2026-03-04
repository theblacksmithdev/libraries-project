import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {
  Stepper,
  StepperPrimitives,
  StepperItem,
  StepperIndicator,
  StepperTitle,
} from '.'

const steps = [
  { title: 'Step 1', description: 'First' },
  { title: 'Step 2', description: 'Second' },
  { title: 'Step 3', description: 'Third' },
]

describe('Stepper', () => {
  it('renders all steps', () => {
    render(<Stepper steps={steps} activeStep={0} />)
    expect(screen.getByText('Step 1')).toBeInTheDocument()
    expect(screen.getByText('Step 2')).toBeInTheDocument()
    expect(screen.getByText('Step 3')).toBeInTheDocument()
  })

  it('renders descriptions', () => {
    render(<Stepper steps={steps} activeStep={0} />)
    expect(screen.getByText('First')).toBeInTheDocument()
  })

  it('marks active step with aria-current', () => {
    render(<Stepper steps={steps} activeStep={1} />)
    const items = screen.getByText('Step 2').closest('[data-status]')
    expect(items).toHaveAttribute('aria-current', 'step')
  })

  it('shows correct statuses based on activeStep', () => {
    const { container } = render(<Stepper steps={steps} activeStep={1} />)
    const items = container.querySelectorAll('[data-status]')
    expect(items[0]).toHaveAttribute('data-status', 'completed')
    expect(items[1]).toHaveAttribute('data-status', 'active')
    expect(items[2]).toHaveAttribute('data-status', 'upcoming')
  })

  it('calls onStepClick for completed steps', async () => {
    const onClick = vi.fn()
    render(<Stepper steps={steps} activeStep={2} onStepClick={onClick} />)
    await userEvent.click(screen.getByText('Step 1'))
    expect(onClick).toHaveBeenCalledWith(0)
  })

  it('does not render buttons when onStepClick is not provided', () => {
    render(<Stepper steps={steps} activeStep={1} />)
    expect(screen.queryAllByRole('button')).toHaveLength(0)
  })

  it('renders vertical orientation', () => {
    render(<Stepper steps={steps} activeStep={0} orientation="vertical" />)
    expect(screen.getByRole('list')).toHaveClass('flex-col')
  })

  it('shows optional label', () => {
    render(
      <Stepper
        steps={[{ title: 'Opt', optional: true }]}
        activeStep={0}
      />
    )
    expect(screen.getByText('Optional')).toBeInTheDocument()
  })

  it('renders compound primitives', () => {
    render(
      <StepperPrimitives.Root>
        <StepperPrimitives.Item status="active">
          <StepperPrimitives.Indicator status="active">1</StepperPrimitives.Indicator>
          <StepperPrimitives.Title>Custom</StepperPrimitives.Title>
        </StepperPrimitives.Item>
      </StepperPrimitives.Root>
    )
    expect(screen.getByText('Custom')).toBeInTheDocument()
  })

  it('exports sub-parts for backward compat', () => {
    render(
      <StepperPrimitives.Root>
        <StepperItem status="completed">
          <StepperIndicator status="completed" />
          <StepperTitle>Legacy</StepperTitle>
        </StepperItem>
      </StepperPrimitives.Root>
    )
    expect(screen.getByText('Legacy')).toBeInTheDocument()
  })
})
