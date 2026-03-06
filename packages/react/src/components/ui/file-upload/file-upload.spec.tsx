import { render, screen } from '@testing-library/react'
import { FileUpload } from '.'

describe('FileUpload', () => {
  it('renders dropzone', () => {
    render(<FileUpload />)
    expect(screen.getByRole('button', { name: 'Upload files' })).toBeInTheDocument()
  })

  it('shows default text', () => {
    render(<FileUpload />)
    expect(screen.getByText(/Drag & drop or click/)).toBeInTheDocument()
  })

  it('shows accepted file types', () => {
    render(<FileUpload accept="image/*" />)
    expect(screen.getByText(/image\/\*/)).toBeInTheDocument()
  })

  it('shows max size hint', () => {
    render(<FileUpload maxSize={1024 * 1024} />)
    expect(screen.getByText(/max 1\.0 MB/)).toBeInTheDocument()
  })

  it('renders file list when value provided', () => {
    const file = new File(['hello'], 'test.txt', { type: 'text/plain' })
    render(<FileUpload value={[file]} onChange={() => {}} />)
    expect(screen.getByText('test.txt')).toBeInTheDocument()
  })

  it('renders remove button for each file', () => {
    const file = new File(['hello'], 'doc.pdf', { type: 'application/pdf' })
    render(<FileUpload value={[file]} onChange={() => {}} />)
    expect(screen.getByRole('button', { name: 'Remove doc.pdf' })).toBeInTheDocument()
  })

  it('is disabled when disabled prop is set', () => {
    render(<FileUpload disabled />)
    expect(screen.getByRole('button', { name: 'Upload files' })).toHaveClass('pointer-events-none')
  })

  it('renders custom children', () => {
    render(<FileUpload><span>Custom content</span></FileUpload>)
    expect(screen.getByText('Custom content')).toBeInTheDocument()
  })
})
