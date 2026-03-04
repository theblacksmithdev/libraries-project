import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { z } from 'zod'
import { Form } from '../../form'
import { FormRadioGroup } from './form-radio-group'

const schema = z.object({ color: z.string() })

const options = [
  { value: 'red', label: 'Red' },
  { value: 'blue', label: 'Blue' },
  { value: 'green', label: 'Green' },
]

function renderWithForm(ui: React.ReactElement) {
  return render(
    <Form schema={schema} onSubmit={() => {}} defaultValues={{ color: '' }}>
      {ui}
    </Form>,
  )
}

describe('FormRadioGroup', () => {
  it('renders all options', () => {
    renderWithForm(<FormRadioGroup name="color" label="Color" options={options} />)
    expect(screen.getByText('Red')).toBeInTheDocument()
    expect(screen.getByText('Blue')).toBeInTheDocument()
    expect(screen.getByText('Green')).toBeInTheDocument()
  })

  it('renders with label', () => {
    renderWithForm(<FormRadioGroup name="color" label="Color" options={options} />)
    expect(screen.getByText('Color')).toBeInTheDocument()
  })

  it('allows selection', async () => {
    const user = userEvent.setup()
    renderWithForm(<FormRadioGroup name="color" label="Color" options={options} />)

    const radios = screen.getAllByRole('radio')
    await user.click(radios[1])
    expect(radios[1]).toBeChecked()
  })
})
