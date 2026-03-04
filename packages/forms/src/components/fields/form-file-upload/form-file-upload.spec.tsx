import { render, screen } from '@testing-library/react'
import { z } from 'zod'
import { Form } from '../../form'
import { FormFileUpload } from './form-file-upload'

const schema = z.object({ files: z.any() })

function renderWithForm(ui: React.ReactElement) {
  return render(
    <Form schema={schema} onSubmit={() => {}} defaultValues={{ files: [] }}>
      {ui}
    </Form>,
  )
}

describe('FormFileUpload', () => {
  it('renders with label', () => {
    renderWithForm(<FormFileUpload name="files" label="Upload" />)
    expect(screen.getByText('Upload')).toBeInTheDocument()
  })
})
