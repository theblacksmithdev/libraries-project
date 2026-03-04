import { render, screen } from '@testing-library/react'
import { ToggleGroup, ToggleGroupPrimitives, ToggleGroupItem } from '.'

describe('ToggleGroup', () => {
  it('renders simplified with items', () => {
    render(
      <ToggleGroup
        type="single"
        items={[
          { value: 'a', label: 'A' },
          { value: 'b', label: 'B' },
        ]}
      />
    )
    expect(screen.getByText('A')).toBeInTheDocument()
    expect(screen.getByText('B')).toBeInTheDocument()
  })

  it('renders compound primitives', () => {
    render(
      <ToggleGroupPrimitives.Root type="single">
        <ToggleGroupPrimitives.Item value="a">A</ToggleGroupPrimitives.Item>
      </ToggleGroupPrimitives.Root>
    )
    expect(screen.getByText('A')).toBeInTheDocument()
  })

  it('exports sub-parts for backward compat', () => {
    render(
      <ToggleGroupPrimitives.Root type="single">
        <ToggleGroupItem value="a">Legacy</ToggleGroupItem>
      </ToggleGroupPrimitives.Root>
    )
    expect(screen.getByText('Legacy')).toBeInTheDocument()
  })
})
