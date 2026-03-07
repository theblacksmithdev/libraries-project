import { renderHook, act } from '@testing-library/react';
import { useIdleTimer } from './use-idle-timer';

describe('useIdleTimer', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('starts as not idle', () => {
    const { result } = renderHook(() => useIdleTimer(5000));
    expect(result.current.isIdle).toBe(false);
  });

  it('becomes idle after timeout', () => {
    const { result } = renderHook(() => useIdleTimer(5000));

    act(() => {
      vi.advanceTimersByTime(5000);
    });

    expect(result.current.isIdle).toBe(true);
  });

  it('resets on activity', () => {
    const { result } = renderHook(() => useIdleTimer(5000));

    act(() => {
      vi.advanceTimersByTime(3000);
    });
    expect(result.current.isIdle).toBe(false);

    act(() => {
      window.dispatchEvent(new MouseEvent('mousemove'));
    });

    act(() => {
      vi.advanceTimersByTime(3000);
    });
    expect(result.current.isIdle).toBe(false);

    act(() => {
      vi.advanceTimersByTime(2000);
    });
    expect(result.current.isIdle).toBe(true);
  });

  it('can be manually reset', () => {
    const { result } = renderHook(() => useIdleTimer(5000));

    act(() => {
      vi.advanceTimersByTime(5000);
    });
    expect(result.current.isIdle).toBe(true);

    act(() => {
      result.current.reset();
    });
    expect(result.current.isIdle).toBe(false);
  });
});
