import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { z } from 'zod'
import { Form } from '../../form'
import { FormTextarea } from './form-textarea'

const schema = z.object({ bio: z.string() })

function renderWithForm(ui: React.ReactElement) {
  return render(
    <Form schema={schema} onSubmit={() => {}} defaultValues={{ bio: '' }}>
      {ui}
    </Form>,
  )
}

describe('FormTextarea', () => {
  it('renders with label', () => {
    renderWithForm(<FormTextarea name="bio" label="Bio" />)
    expect(screen.getByLabelText('Bio')).toBeInTheDocument()
  })

  it('accepts user input', async () => {
    const user = userEvent.setup()
    renderWithForm(<FormTextarea name="bio" label="Bio" />)

    const textarea = screen.getByLabelText('Bio')
    await user.type(textarea, 'Hello world')
    expect(textarea).toHaveValue('Hello world')
  })

  it('supports disabled state', () => {
    renderWithForm(<FormTextarea name="bio" label="Bio" disabled />)
    expect(screen.getByLabelText('Bio')).toBeDisabled()
  })
})
