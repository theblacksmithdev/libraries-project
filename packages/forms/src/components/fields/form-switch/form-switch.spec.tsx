import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { z } from 'zod'
import { Form } from '../../form'
import { FormSwitch } from './form-switch'

const schema = z.object({ notifications: z.boolean() })

function renderWithForm(ui: React.ReactElement) {
  return render(
    <Form schema={schema} onSubmit={() => {}} defaultValues={{ notifications: false }}>
      {ui}
    </Form>,
  )
}

describe('FormSwitch', () => {
  it('renders with label', () => {
    renderWithForm(<FormSwitch name="notifications" label="Notifications" />)
    expect(screen.getByText('Notifications')).toBeInTheDocument()
  })

  it('toggles on click', async () => {
    const user = userEvent.setup()
    renderWithForm(<FormSwitch name="notifications" label="Notifications" />)

    const switchEl = screen.getByRole('switch')
    await user.click(switchEl)
    expect(switchEl).toBeChecked()
  })

  it('supports disabled state', () => {
    renderWithForm(<FormSwitch name="notifications" label="Notifications" disabled />)
    expect(screen.getByRole('switch')).toBeDisabled()
  })
})
