import { renderHook, act } from '@testing-library/react';
import { useCountdown } from './use-countdown';

describe('useCountdown', () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it('starts paused with initial seconds', () => {
    const { result } = renderHook(() => useCountdown(10));
    expect(result.current.seconds).toBe(10);
    expect(result.current.isRunning).toBe(false);
  });

  it('counts down when started', () => {
    const { result } = renderHook(() => useCountdown(3));
    act(() => result.current.start());

    act(() => vi.advanceTimersByTime(1000));
    expect(result.current.seconds).toBe(2);

    act(() => vi.advanceTimersByTime(1000));
    expect(result.current.seconds).toBe(1);
  });

  it('stops at 0 and marks complete', () => {
    const { result } = renderHook(() => useCountdown(2));
    act(() => result.current.start());

    act(() => vi.advanceTimersByTime(2000));
    expect(result.current.seconds).toBe(0);
    expect(result.current.isComplete).toBe(true);
    expect(result.current.isRunning).toBe(false);
  });

  it('pauses the countdown', () => {
    const { result } = renderHook(() => useCountdown(10));
    act(() => result.current.start());
    act(() => vi.advanceTimersByTime(2000));
    act(() => result.current.pause());

    const paused = result.current.seconds;
    act(() => vi.advanceTimersByTime(5000));
    expect(result.current.seconds).toBe(paused);
  });

  it('resets the countdown', () => {
    const { result } = renderHook(() => useCountdown(10));
    act(() => result.current.start());
    act(() => vi.advanceTimersByTime(3000));
    act(() => result.current.reset());

    expect(result.current.seconds).toBe(10);
    expect(result.current.isRunning).toBe(false);
  });
});
