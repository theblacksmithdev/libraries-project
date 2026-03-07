import { renderHook, act } from '@testing-library/react';
import { useLongPress } from './use-long-press';

describe('useLongPress', () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it('fires callback after holding for delay', () => {
    const fn = vi.fn();
    const { result } = renderHook(() => useLongPress(fn, 500));

    act(() => result.current.onMouseDown());
    act(() => vi.advanceTimersByTime(500));
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('does not fire if released early', () => {
    const fn = vi.fn();
    const { result } = renderHook(() => useLongPress(fn, 500));

    act(() => result.current.onMouseDown());
    act(() => vi.advanceTimersByTime(200));
    act(() => result.current.onMouseUp());
    act(() => vi.advanceTimersByTime(300));

    expect(fn).not.toHaveBeenCalled();
  });

  it('clears on mouse leave', () => {
    const fn = vi.fn();
    const { result } = renderHook(() => useLongPress(fn, 500));

    act(() => result.current.onMouseDown());
    act(() => result.current.onMouseLeave());
    act(() => vi.advanceTimersByTime(500));

    expect(fn).not.toHaveBeenCalled();
  });
});
