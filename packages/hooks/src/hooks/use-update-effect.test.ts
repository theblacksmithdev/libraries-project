import { renderHook } from '@testing-library/react';
import { useUpdateEffect } from './use-update-effect';

describe('useUpdateEffect', () => {
  it('does not run on first render', () => {
    const fn = vi.fn();
    renderHook(() => useUpdateEffect(fn));
    expect(fn).not.toHaveBeenCalled();
  });

  it('runs on subsequent renders', () => {
    const fn = vi.fn();
    const { rerender } = renderHook(
      ({ value }) => useUpdateEffect(fn, [value]),
      { initialProps: { value: 1 } }
    );

    expect(fn).not.toHaveBeenCalled();
    rerender({ value: 2 });
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('calls cleanup function', () => {
    const cleanup = vi.fn();
    const fn = vi.fn(() => cleanup);
    const { rerender } = renderHook(
      ({ value }) => useUpdateEffect(fn, [value]),
      { initialProps: { value: 1 } }
    );

    rerender({ value: 2 });
    rerender({ value: 3 });
    expect(cleanup).toHaveBeenCalledTimes(1);
  });
});
