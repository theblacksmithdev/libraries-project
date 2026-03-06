import { render, screen } from '@testing-library/react'
import { Tabs, TabsPrimitives, TabsList, TabsTrigger, TabsContent } from '.'

describe('Tabs', () => {
  it('renders simplified with tabs', () => {
    render(
      <Tabs
        defaultValue="a"
        tabs={[
          { value: 'a', label: 'Tab A', content: 'Content A' },
          { value: 'b', label: 'Tab B', content: 'Content B' },
        ]}
      />
    )
    expect(screen.getByRole('tab', { name: 'Tab A' })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: 'Tab B' })).toBeInTheDocument()
  })

  it('renders compound primitives', () => {
    render(
      <TabsPrimitives.Root defaultValue="a">
        <TabsPrimitives.List>
          <TabsPrimitives.Trigger value="a">A</TabsPrimitives.Trigger>
        </TabsPrimitives.List>
        <TabsPrimitives.Content value="a">Content</TabsPrimitives.Content>
      </TabsPrimitives.Root>
    )
    expect(screen.getByRole('tab', { name: 'A' })).toBeInTheDocument()
  })

  it('exports sub-parts for backward compat', () => {
    render(
      <TabsPrimitives.Root defaultValue="a">
        <TabsList>
          <TabsTrigger value="a">Legacy</TabsTrigger>
        </TabsList>
        <TabsContent value="a">Body</TabsContent>
      </TabsPrimitives.Root>
    )
    expect(screen.getByRole('tab', { name: 'Legacy' })).toBeInTheDocument()
  })
})
