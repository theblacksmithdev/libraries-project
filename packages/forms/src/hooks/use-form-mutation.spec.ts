import { renderHook, waitFor } from '@testing-library/react'
import * as React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useFormMutation } from './use-form-mutation'

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
  })
  return function Wrapper({ children }: { children: React.ReactNode }) {
    return React.createElement(QueryClientProvider, { client: queryClient }, children)
  }
}

describe('useFormMutation', () => {
  it('returns a mutation result', () => {
    const { result } = renderHook(
      () => useFormMutation({ mutationFn: async () => 'ok' }),
      { wrapper: createWrapper() },
    )

    expect(result.current.mutate).toBeDefined()
    expect(result.current.isPending).toBe(false)
  })

  it('executes mutation', async () => {
    const mutationFn = vi.fn().mockResolvedValue('success')
    const { result } = renderHook(
      () => useFormMutation({ mutationFn }),
      { wrapper: createWrapper() },
    )

    result.current.mutate(undefined)

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
    })
    expect(mutationFn).toHaveBeenCalled()
  })
})
