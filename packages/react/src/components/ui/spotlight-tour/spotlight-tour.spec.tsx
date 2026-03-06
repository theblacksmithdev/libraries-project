import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { vi } from 'vitest'
import { SpotlightTour } from '.'
import type { TourStep } from '.'

// Mock getBoundingClientRect since jsdom has no layout
const mockRect: DOMRect = {
  top: 100,
  left: 200,
  bottom: 150,
  right: 400,
  width: 200,
  height: 50,
  x: 200,
  y: 100,
  toJSON: () => {},
}

const steps: TourStep[] = [
  { target: '#step-1', title: 'Step 1', description: 'First step description' },
  { target: '#step-2', title: 'Step 2', description: 'Second step description' },
  { target: '#step-3', title: 'Step 3', description: 'Final step' },
]

function createTargetElements() {
  const elements: HTMLDivElement[] = []

  for (let i = 1; i <= 3; i++) {
    const div = document.createElement('div')
    div.id = `step-${i}`
    div.getBoundingClientRect = () => mockRect
    div.scrollIntoView = vi.fn()
    document.body.appendChild(div)
    elements.push(div)
  }

  return () => elements.forEach((el) => el.remove())
}

afterEach(() => {
  document.body.querySelectorAll('#step-1, #step-2, #step-3').forEach((el) => el.remove())
  document.body.querySelectorAll('[data-spotlight-tour-portal]').forEach((el) => el.remove())
})

describe('SpotlightTour', () => {
  it('renders nothing when closed', () => {
    render(<SpotlightTour steps={steps} open={false} />)
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('renders overlay and tooltip when open', async () => {
    const removeTargets = createTargetElements()
    render(<SpotlightTour steps={steps} open />)
    expect(await screen.findByRole('dialog')).toBeInTheDocument()
    removeTargets()
  })

  it('displays step title and description', async () => {
    const removeTargets = createTargetElements()
    render(<SpotlightTour steps={steps} open />)
    expect(await screen.findByText('Step 1')).toBeInTheDocument()
    expect(screen.getByText('First step description')).toBeInTheDocument()
    removeTargets()
  })

  it('navigates to next step', async () => {
    const removeTargets = createTargetElements()
    render(<SpotlightTour steps={steps} open />)
    expect(await screen.findByText('Step 1')).toBeInTheDocument()

    fireEvent.click(screen.getByText('Next'))
    expect(screen.getByText('Step 2')).toBeInTheDocument()
    removeTargets()
  })

  it('navigates back', async () => {
    const removeTargets = createTargetElements()
    render(<SpotlightTour steps={steps} open startStep={1} />)
    expect(await screen.findByText('Step 2')).toBeInTheDocument()

    fireEvent.click(screen.getByText('Back'))
    expect(screen.getByText('Step 1')).toBeInTheDocument()
    removeTargets()
  })

  it('hides Back button on first step', async () => {
    const removeTargets = createTargetElements()
    render(<SpotlightTour steps={steps} open />)
    await screen.findByText('Step 1')
    expect(screen.queryByText('Back')).not.toBeInTheDocument()
    removeTargets()
  })

  it('shows Finish on last step and calls onComplete', async () => {
    const onComplete = vi.fn()
    const onOpenChange = vi.fn()
    const removeTargets = createTargetElements()
    render(
      <SpotlightTour
        steps={steps}
        open
        startStep={2}
        onComplete={onComplete}
        onOpenChange={onOpenChange}
      />
    )
    expect(await screen.findByText('Finish')).toBeInTheDocument()

    fireEvent.click(screen.getByText('Finish'))
    expect(onComplete).toHaveBeenCalled()
    expect(onOpenChange).toHaveBeenCalledWith(false)
    removeTargets()
  })

  it('calls onSkip when Skip is clicked', async () => {
    const onSkip = vi.fn()
    const onOpenChange = vi.fn()
    const removeTargets = createTargetElements()
    render(
      <SpotlightTour
        steps={steps}
        open
        onSkip={onSkip}
        onOpenChange={onOpenChange}
      />
    )
    await screen.findByText('Skip')

    fireEvent.click(screen.getByText('Skip'))
    expect(onSkip).toHaveBeenCalled()
    expect(onOpenChange).toHaveBeenCalledWith(false)
    removeTargets()
  })

  it('closes on Escape key', async () => {
    const onSkip = vi.fn()
    const onOpenChange = vi.fn()
    const removeTargets = createTargetElements()
    render(
      <SpotlightTour
        steps={steps}
        open
        onSkip={onSkip}
        onOpenChange={onOpenChange}
      />
    )
    const dialog = await screen.findByRole('dialog')

    fireEvent.keyDown(dialog, { key: 'Escape' })
    expect(onOpenChange).toHaveBeenCalledWith(false)
    removeTargets()
  })

  it('calls onStepChange when navigating', async () => {
    const onStepChange = vi.fn()
    const removeTargets = createTargetElements()
    render(
      <SpotlightTour steps={steps} open onStepChange={onStepChange} />
    )
    await screen.findByText('Next')

    fireEvent.click(screen.getByText('Next'))
    expect(onStepChange).toHaveBeenCalledWith(1)
    removeTargets()
  })

  it('shows step counter', async () => {
    const removeTargets = createTargetElements()
    render(
      <SpotlightTour steps={steps} open showStepCounter />
    )
    expect(await screen.findByText('1 of 3')).toBeInTheDocument()
    removeTargets()
  })

  it('supports custom labels', async () => {
    const removeTargets = createTargetElements()
    render(
      <SpotlightTour
        steps={steps}
        open
        startStep={1}
        labels={{ next: 'Continue', back: 'Previous', skip: 'Exit' }}
      />
    )
    expect(await screen.findByText('Continue')).toBeInTheDocument()
    expect(screen.getByText('Previous')).toBeInTheDocument()
    expect(screen.getByText('Exit')).toBeInTheDocument()
    removeTargets()
  })

  it('handles missing target gracefully', async () => {
    const missingSteps: TourStep[] = [
      { target: '#nonexistent', title: 'Missing Target', description: 'This target does not exist' },
    ]

    render(<SpotlightTour steps={missingSteps} open />)
    expect(await screen.findByText('Missing Target')).toBeInTheDocument()
  })

  it('hides skip button when showSkip is false', async () => {
    const removeTargets = createTargetElements()
    render(
      <SpotlightTour steps={steps} open showSkip={false} />
    )
    await screen.findByText('Step 1')
    expect(screen.queryByText('Skip')).not.toBeInTheDocument()
    removeTargets()
  })
})
