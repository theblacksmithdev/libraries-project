import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Wizard } from '.'

const steps = [
  { title: 'Step 1', content: <div>Content 1</div> },
  { title: 'Step 2', content: <div>Content 2</div> },
  { title: 'Step 3', content: <div>Content 3</div> },
]

describe('Wizard', () => {
  it('renders step titles', () => {
    render(<Wizard steps={steps} />)
    expect(screen.getByText('Step 1')).toBeInTheDocument()
    expect(screen.getByText('Step 2')).toBeInTheDocument()
    expect(screen.getByText('Step 3')).toBeInTheDocument()
  })

  it('shows first step content by default', () => {
    render(<Wizard steps={steps} />)
    expect(screen.getByText('Content 1')).toBeInTheDocument()
    expect(screen.queryByText('Content 2')).not.toBeInTheDocument()
  })

  it('shows correct content for controlled activeStep', () => {
    render(<Wizard steps={steps} activeStep={1} />)
    expect(screen.getByText('Content 2')).toBeInTheDocument()
  })

  it('navigates to next step on Next click', async () => {
    render(<Wizard steps={steps} />)
    await userEvent.click(screen.getByRole('button', { name: 'Next' }))
    expect(screen.getByText('Content 2')).toBeInTheDocument()
  })

  it('navigates back on Back click', async () => {
    render(<Wizard steps={steps} />)
    await userEvent.click(screen.getByRole('button', { name: 'Next' }))
    expect(screen.getByText('Content 2')).toBeInTheDocument()
    await userEvent.click(screen.getByRole('button', { name: 'Back' }))
    expect(screen.getByText('Content 1')).toBeInTheDocument()
  })

  it('disables Back button on first step', () => {
    render(<Wizard steps={steps} />)
    expect(screen.getByRole('button', { name: 'Back' })).toBeDisabled()
  })

  it('shows Complete label on last step', () => {
    render(<Wizard steps={steps} activeStep={2} />)
    expect(screen.getByRole('button', { name: 'Complete' })).toBeInTheDocument()
  })

  it('calls onComplete on last step Next click', async () => {
    const onComplete = vi.fn()
    render(<Wizard steps={steps} activeStep={2} onComplete={onComplete} />)
    await userEvent.click(screen.getByRole('button', { name: 'Complete' }))
    expect(onComplete).toHaveBeenCalledOnce()
  })

  it('calls onStepChange when navigating', async () => {
    const onStepChange = vi.fn()
    render(<Wizard steps={steps} activeStep={0} onStepChange={onStepChange} />)
    await userEvent.click(screen.getByRole('button', { name: 'Next' }))
    expect(onStepChange).toHaveBeenCalledWith(1)
  })

  it('hides navigation when showNavigation is false', () => {
    render(<Wizard steps={steps} showNavigation={false} />)
    expect(screen.queryByRole('button', { name: 'Next' })).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Back' })).not.toBeInTheDocument()
  })

  it('renders vertical orientation', () => {
    render(<Wizard steps={steps} orientation="vertical" />)
    expect(screen.getByText('Step 1')).toBeInTheDocument()
    expect(screen.getByText('Content 1')).toBeInTheDocument()
  })

  it('marks active step with aria-current', () => {
    render(<Wizard steps={steps} activeStep={1} />)
    const activeButton = screen.getByText('Step 2').closest('button')
    expect(activeButton).toHaveAttribute('aria-current', 'step')
  })

  it('shows custom button labels', () => {
    render(<Wizard steps={steps} backLabel="Previous" nextLabel="Continue" />)
    expect(screen.getByRole('button', { name: 'Previous' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Continue' })).toBeInTheDocument()
  })

  it('shows step descriptions', () => {
    render(
      <Wizard steps={[{ title: 'A', description: 'Desc A', content: <div /> }]} />
    )
    expect(screen.getByText('Desc A')).toBeInTheDocument()
  })
})
