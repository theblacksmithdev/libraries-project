import { render, screen } from '@testing-library/react'
import { QueryClient } from '@tanstack/react-query'
import { FormQueryProvider } from './form-query-provider'

describe('FormQueryProvider', () => {
  it('renders children', () => {
    render(
      <FormQueryProvider>
        <div>Test content</div>
      </FormQueryProvider>,
    )

    expect(screen.getByText('Test content')).toBeInTheDocument()
  })

  it('accepts a custom QueryClient', () => {
    const client = new QueryClient()

    render(
      <FormQueryProvider client={client}>
        <div>Custom client</div>
      </FormQueryProvider>,
    )

    expect(screen.getByText('Custom client')).toBeInTheDocument()
  })
})
