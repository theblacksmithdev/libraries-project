import { renderHook } from '@testing-library/react';
import { useInterval } from './use-interval';

describe('useInterval', () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it('calls callback at intervals', () => {
    const fn = vi.fn();
    renderHook(() => useInterval(fn, 100));

    vi.advanceTimersByTime(350);
    expect(fn).toHaveBeenCalledTimes(3);
  });

  it('does not run when delay is null', () => {
    const fn = vi.fn();
    renderHook(() => useInterval(fn, null));

    vi.advanceTimersByTime(1000);
    expect(fn).not.toHaveBeenCalled();
  });

  it('cleans up on unmount', () => {
    const fn = vi.fn();
    const { unmount } = renderHook(() => useInterval(fn, 100));

    vi.advanceTimersByTime(250);
    unmount();
    vi.advanceTimersByTime(500);
    expect(fn).toHaveBeenCalledTimes(2);
  });

  it('uses the latest callback', () => {
    const fn1 = vi.fn();
    const fn2 = vi.fn();
    const { rerender } = renderHook(
      ({ cb }) => useInterval(cb, 100),
      { initialProps: { cb: fn1 } }
    );

    vi.advanceTimersByTime(100);
    expect(fn1).toHaveBeenCalledTimes(1);

    rerender({ cb: fn2 });
    vi.advanceTimersByTime(100);
    expect(fn2).toHaveBeenCalledTimes(1);
  });
});
