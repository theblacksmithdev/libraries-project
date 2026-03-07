import { renderHook, act } from '@testing-library/react';
import { useThrottledCallback } from './use-throttled-callback';

describe('useThrottledCallback', () => {
  beforeEach(() => vi.useFakeTimers({ shouldAdvanceTime: true }));
  afterEach(() => vi.useRealTimers());

  it('calls immediately on first invocation', () => {
    const fn = vi.fn();
    const { result } = renderHook(() => useThrottledCallback(fn, 300));

    act(() => result.current.throttledFn());
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('throttles subsequent calls', () => {
    const fn = vi.fn();
    const { result } = renderHook(() => useThrottledCallback(fn, 300));

    act(() => result.current.throttledFn());
    act(() => result.current.throttledFn());
    act(() => result.current.throttledFn());

    expect(fn).toHaveBeenCalledTimes(1);

    act(() => vi.advanceTimersByTime(300));
    expect(fn).toHaveBeenCalledTimes(2);
  });

  it('can be cancelled', () => {
    const fn = vi.fn();
    const { result } = renderHook(() => useThrottledCallback(fn, 300));

    act(() => result.current.throttledFn());
    act(() => result.current.throttledFn());
    act(() => result.current.cancel());
    act(() => vi.advanceTimersByTime(300));

    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('cleans up on unmount', () => {
    const fn = vi.fn();
    const { result, unmount } = renderHook(() => useThrottledCallback(fn, 300));

    act(() => result.current.throttledFn());
    act(() => result.current.throttledFn());
    unmount();
    act(() => vi.advanceTimersByTime(300));

    expect(fn).toHaveBeenCalledTimes(1);
  });
});
