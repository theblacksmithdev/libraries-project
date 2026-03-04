import { useMutation, type UseMutationOptions, type UseMutationResult } from '@tanstack/react-query'

export type UseFormMutationOptions<
  TData = unknown,
  TError = Error,
  TVariables = void,
  TContext = unknown,
> = UseMutationOptions<TData, TError, TVariables, TContext>

export type UseFormMutationResult<
  TData = unknown,
  TError = Error,
  TVariables = void,
  TContext = unknown,
> = UseMutationResult<TData, TError, TVariables, TContext>

export function useFormMutation<
  TData = unknown,
  TError = Error,
  TVariables = void,
  TContext = unknown,
>(
  options: UseFormMutationOptions<TData, TError, TVariables, TContext>,
): UseFormMutationResult<TData, TError, TVariables, TContext> {
  return useMutation(options)
}
