import { renderHook } from '@testing-library/react';
import { useSyncedRef } from './use-synced-ref';

describe('useSyncedRef', () => {
  it('returns a ref with the current value', () => {
    const { result } = renderHook(() => useSyncedRef(42));
    expect(result.current.current).toBe(42);
  });

  it('stays in sync with value changes', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useSyncedRef(value),
      { initialProps: { value: 'a' } }
    );

    rerender({ value: 'b' });
    expect(result.current.current).toBe('b');
  });

  it('returns a stable ref object', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useSyncedRef(value),
      { initialProps: { value: 1 } }
    );

    const ref = result.current;
    rerender({ value: 2 });
    expect(result.current).toBe(ref);
  });
});
