import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { z } from 'zod'
import { Form } from '../../form'
import { FormCheckbox } from './form-checkbox'

const schema = z.object({ terms: z.boolean() })

function renderWithForm(ui: React.ReactElement) {
  return render(
    <Form schema={schema} onSubmit={() => {}} defaultValues={{ terms: false }}>
      {ui}
    </Form>,
  )
}

describe('FormCheckbox', () => {
  it('renders with label', () => {
    renderWithForm(<FormCheckbox name="terms" label="Accept terms" />)
    expect(screen.getByText('Accept terms')).toBeInTheDocument()
  })

  it('toggles on click', async () => {
    const user = userEvent.setup()
    renderWithForm(<FormCheckbox name="terms" label="Accept terms" />)

    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).not.toBeChecked()

    await user.click(checkbox)
    expect(checkbox).toBeChecked()
  })

  it('supports disabled state', () => {
    renderWithForm(<FormCheckbox name="terms" label="Accept terms" disabled />)
    expect(screen.getByRole('checkbox')).toBeDisabled()
  })
})
