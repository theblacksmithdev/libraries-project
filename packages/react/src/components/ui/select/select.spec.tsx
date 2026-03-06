import { render, screen } from '@testing-library/react'
import { Select, SelectPrimitives, SelectTrigger, SelectValue, SelectContent, SelectItem } from '.'

describe('Select', () => {
  it('renders simplified with options', () => {
    render(
      <Select
        placeholder="Pick"
        options={[
          { value: 'a', label: 'A' },
          { value: 'b', label: 'B' },
        ]}
      />
    )
    expect(screen.getByRole('combobox')).toBeInTheDocument()
  })

  it('renders compound primitives', () => {
    render(
      <SelectPrimitives.Root>
        <SelectPrimitives.Trigger>
          <SelectPrimitives.Value placeholder="Pick" />
        </SelectPrimitives.Trigger>
        <SelectPrimitives.Content>
          <SelectPrimitives.Item value="a">A</SelectPrimitives.Item>
        </SelectPrimitives.Content>
      </SelectPrimitives.Root>
    )
    expect(screen.getByRole('combobox')).toBeInTheDocument()
  })

  it('exports sub-parts for backward compat', () => {
    render(
      <SelectPrimitives.Root>
        <SelectTrigger><SelectValue placeholder="Pick" /></SelectTrigger>
        <SelectContent><SelectItem value="a">A</SelectItem></SelectContent>
      </SelectPrimitives.Root>
    )
    expect(screen.getByRole('combobox')).toBeInTheDocument()
  })
})
