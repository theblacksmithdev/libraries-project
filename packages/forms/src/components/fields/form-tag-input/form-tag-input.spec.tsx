import { render, screen } from '@testing-library/react'
import { z } from 'zod'
import { Form } from '../../form'
import { FormTagInput } from './form-tag-input'

const schema = z.object({ tags: z.array(z.string()) })

function renderWithForm(ui: React.ReactElement) {
  return render(
    <Form schema={schema} onSubmit={() => {}} defaultValues={{ tags: [] }}>
      {ui}
    </Form>,
  )
}

describe('FormTagInput', () => {
  it('renders with label', () => {
    renderWithForm(<FormTagInput name="tags" label="Tags" />)
    expect(screen.getByText('Tags')).toBeInTheDocument()
  })

  it('renders the input', () => {
    renderWithForm(<FormTagInput name="tags" label="Tags" placeholder="Add tag..." />)
    expect(screen.getByPlaceholderText('Add tag...')).toBeInTheDocument()
  })
})
