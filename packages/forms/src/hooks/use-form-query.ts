import { useQuery, type UseQueryOptions, type UseQueryResult } from '@tanstack/react-query'

export type UseFormQueryOptions<TData = unknown> = UseQueryOptions<TData>

export type UseFormQueryResult<TData = unknown> = UseQueryResult<TData> & {
  defaultValues: TData | undefined
}

export function useFormQuery<TData = unknown>(
  options: UseFormQueryOptions<TData>,
): UseFormQueryResult<TData> {
  const query = useQuery(options)

  return {
    ...query,
    defaultValues: query.data,
  }
}
