import { renderHook, act } from '@testing-library/react';
import { useDebouncedCallback } from './use-debounced-callback';

describe('useDebouncedCallback', () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it('debounces the callback', () => {
    const fn = vi.fn();
    const { result } = renderHook(() => useDebouncedCallback(fn, 300));

    act(() => result.current.debouncedFn());
    act(() => result.current.debouncedFn());
    act(() => result.current.debouncedFn());

    expect(fn).not.toHaveBeenCalled();

    act(() => vi.advanceTimersByTime(300));
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('passes arguments to the callback', () => {
    const fn = vi.fn();
    const { result } = renderHook(() => useDebouncedCallback(fn, 100));

    act(() => result.current.debouncedFn('hello', 42));
    act(() => vi.advanceTimersByTime(100));

    expect(fn).toHaveBeenCalledWith('hello', 42);
  });

  it('can be cancelled', () => {
    const fn = vi.fn();
    const { result } = renderHook(() => useDebouncedCallback(fn, 300));

    act(() => result.current.debouncedFn());
    act(() => result.current.cancel());
    act(() => vi.advanceTimersByTime(300));

    expect(fn).not.toHaveBeenCalled();
  });

  it('cleans up on unmount', () => {
    const fn = vi.fn();
    const { result, unmount } = renderHook(() => useDebouncedCallback(fn, 300));

    act(() => result.current.debouncedFn());
    unmount();
    act(() => vi.advanceTimersByTime(300));

    expect(fn).not.toHaveBeenCalled();
  });
});
