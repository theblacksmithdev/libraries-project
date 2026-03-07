import { renderHook, act } from '@testing-library/react';
import { useStopwatch } from './use-stopwatch';

describe('useStopwatch', () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it('starts at 0 and paused', () => {
    const { result } = renderHook(() => useStopwatch());
    expect(result.current.elapsed).toBe(0);
    expect(result.current.isRunning).toBe(false);
  });

  it('counts up when started', () => {
    const { result } = renderHook(() => useStopwatch());
    act(() => result.current.start());
    act(() => vi.advanceTimersByTime(100));
    expect(result.current.elapsed).toBe(100);
  });

  it('pauses', () => {
    const { result } = renderHook(() => useStopwatch());
    act(() => result.current.start());
    act(() => vi.advanceTimersByTime(50));
    act(() => result.current.pause());

    const paused = result.current.elapsed;
    act(() => vi.advanceTimersByTime(100));
    expect(result.current.elapsed).toBe(paused);
  });

  it('resets', () => {
    const { result } = renderHook(() => useStopwatch());
    act(() => result.current.start());
    act(() => vi.advanceTimersByTime(100));
    act(() => result.current.reset());
    expect(result.current.elapsed).toBe(0);
    expect(result.current.isRunning).toBe(false);
  });

  it('records laps', () => {
    const { result } = renderHook(() => useStopwatch());
    act(() => result.current.start());
    act(() => vi.advanceTimersByTime(100));
    act(() => result.current.lap());
    act(() => vi.advanceTimersByTime(50));
    act(() => result.current.lap());

    expect(result.current.laps).toHaveLength(2);
    expect(result.current.laps[0]).toBe(100);
    expect(result.current.laps[1]).toBe(150);
  });
});
