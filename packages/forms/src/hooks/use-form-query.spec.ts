import { renderHook, waitFor } from '@testing-library/react'
import * as React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useFormQuery } from './use-form-query'

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  })
  return function Wrapper({ children }: { children: React.ReactNode }) {
    return React.createElement(QueryClientProvider, { client: queryClient }, children)
  }
}

describe('useFormQuery', () => {
  it('returns query result with defaultValues alias', async () => {
    const data = { name: 'John', email: 'john@test.com' }
    const { result } = renderHook(
      () => useFormQuery({ queryKey: ['test'], queryFn: async () => data }),
      { wrapper: createWrapper() },
    )

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
    })

    expect(result.current.defaultValues).toEqual(data)
    expect(result.current.data).toEqual(data)
  })

  it('has undefined defaultValues while loading', () => {
    const { result } = renderHook(
      () =>
        useFormQuery({
          queryKey: ['loading'],
          queryFn: () => new Promise(() => {}),
        }),
      { wrapper: createWrapper() },
    )

    expect(result.current.defaultValues).toBeUndefined()
  })
})
