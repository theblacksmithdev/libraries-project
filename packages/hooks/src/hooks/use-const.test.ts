import { renderHook } from '@testing-library/react';
import { useConst } from './use-const';

describe('useConst', () => {
  it('returns the initialized value', () => {
    const { result } = renderHook(() => useConst(() => 42));
    expect(result.current).toBe(42);
  });

  it('only calls initializer once', () => {
    const initializer = vi.fn(() => ({ id: 1 }));
    const { result, rerender } = renderHook(() => useConst(initializer));

    const firstValue = result.current;
    rerender();
    rerender();

    expect(initializer).toHaveBeenCalledTimes(1);
    expect(result.current).toBe(firstValue);
  });

  it('works with objects', () => {
    const { result, rerender } = renderHook(() =>
      useConst(() => ({ count: 0 }))
    );

    const ref = result.current;
    rerender();
    expect(result.current).toBe(ref);
  });
});
