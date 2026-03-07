import { renderHook, act } from '@testing-library/react';
import { useTimeout } from './use-timeout';

describe('useTimeout', () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it('calls callback after delay', () => {
    const fn = vi.fn();
    renderHook(() => useTimeout(fn, 500));

    act(() => vi.advanceTimersByTime(500));
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('does not run when delay is null', () => {
    const fn = vi.fn();
    renderHook(() => useTimeout(fn, null));

    act(() => vi.advanceTimersByTime(5000));
    expect(fn).not.toHaveBeenCalled();
  });

  it('can be cleared', () => {
    const fn = vi.fn();
    const { result } = renderHook(() => useTimeout(fn, 500));

    act(() => result.current.clear());
    act(() => vi.advanceTimersByTime(500));
    expect(fn).not.toHaveBeenCalled();
  });

  it('cleans up on unmount', () => {
    const fn = vi.fn();
    const { unmount } = renderHook(() => useTimeout(fn, 500));

    unmount();
    act(() => vi.advanceTimersByTime(500));
    expect(fn).not.toHaveBeenCalled();
  });
});
