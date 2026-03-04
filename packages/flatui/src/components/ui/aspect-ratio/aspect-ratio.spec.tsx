import { render, screen } from '@testing-library/react'
import { AspectRatio } from '.'

describe('AspectRatio', () => {
  it('renders', () => {
    render(<AspectRatio ratio={16 / 9}><div>Content</div></AspectRatio>)
    expect(screen.getByText('Content')).toBeInTheDocument()
  })
})
