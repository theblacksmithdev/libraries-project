import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { z } from 'zod'
import { Form } from '../../form'
import { FormSearchInput } from './form-search-input'

const schema = z.object({ query: z.string() })

function renderWithForm(ui: React.ReactElement) {
  return render(
    <Form schema={schema} onSubmit={() => {}} defaultValues={{ query: '' }}>
      {ui}
    </Form>,
  )
}

describe('FormSearchInput', () => {
  it('renders with label', () => {
    renderWithForm(<FormSearchInput name="query" label="Search" />)
    expect(screen.getByLabelText('Search')).toBeInTheDocument()
  })

  it('accepts user input', async () => {
    const user = userEvent.setup()
    renderWithForm(<FormSearchInput name="query" label="Search" placeholder="Search..." />)

    const input = screen.getByPlaceholderText('Search...')
    await user.type(input, 'test')
    expect(input).toHaveValue('test')
  })
})
