import { render, screen } from '@testing-library/react'
import { Accordion, AccordionPrimitives, AccordionItem, AccordionTrigger, AccordionContent } from '.'

describe('Accordion', () => {
  it('renders simplified with items', () => {
    render(
      <Accordion
        type="single"
        collapsible
        items={[
          { value: 'item-1', trigger: 'Section 1', content: 'Content 1' },
          { value: 'item-2', trigger: 'Section 2', content: 'Content 2' },
        ]}
      />
    )
    expect(screen.getByText('Section 1')).toBeInTheDocument()
    expect(screen.getByText('Section 2')).toBeInTheDocument()
  })

  it('renders compound primitives', () => {
    render(
      <AccordionPrimitives.Root type="single" collapsible>
        <AccordionPrimitives.Item value="item-1">
          <AccordionPrimitives.Trigger>Test</AccordionPrimitives.Trigger>
          <AccordionPrimitives.Content>Content</AccordionPrimitives.Content>
        </AccordionPrimitives.Item>
      </AccordionPrimitives.Root>
    )
    expect(screen.getByText('Test')).toBeInTheDocument()
  })

  it('exports sub-parts for backward compat', () => {
    render(
      <AccordionPrimitives.Root type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Legacy</AccordionTrigger>
          <AccordionContent>Body</AccordionContent>
        </AccordionItem>
      </AccordionPrimitives.Root>
    )
    expect(screen.getByText('Legacy')).toBeInTheDocument()
  })
})
