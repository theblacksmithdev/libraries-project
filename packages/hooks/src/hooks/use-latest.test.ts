import { renderHook } from '@testing-library/react';
import { useLatest } from './use-latest';

describe('useLatest', () => {
  it('returns a ref with the current value', () => {
    const { result } = renderHook(() => useLatest(42));
    expect(result.current.current).toBe(42);
  });

  it('always has the latest value', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useLatest(value),
      { initialProps: { value: 'a' } }
    );

    expect(result.current.current).toBe('a');
    rerender({ value: 'b' });
    expect(result.current.current).toBe('b');
  });

  it('returns a stable ref object', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useLatest(value),
      { initialProps: { value: 1 } }
    );

    const ref = result.current;
    rerender({ value: 2 });
    expect(result.current).toBe(ref);
  });
});
