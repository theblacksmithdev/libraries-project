import * as React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export interface FormQueryProviderProps {
  children: React.ReactNode
  client?: QueryClient
}

export function FormQueryProvider({ children, client }: FormQueryProviderProps) {
  const queryClient = React.useMemo(
    () =>
      client ??
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 5 * 60 * 1000,
            retry: 1,
          },
        },
      }),
    [client],
  )

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}
