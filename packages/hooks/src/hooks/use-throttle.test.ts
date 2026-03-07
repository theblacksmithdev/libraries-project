import { renderHook, act } from '@testing-library/react';
import { useThrottle } from './use-throttle';

describe('useThrottle', () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it('returns the initial value immediately', () => {
    const { result } = renderHook(() => useThrottle('hello', 500));
    expect(result.current).toBe('hello');
  });

  it('throttles value updates', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useThrottle(value, 500),
      { initialProps: { value: 'a' } }
    );

    rerender({ value: 'b' });
    expect(result.current).toBe('a');

    act(() => vi.advanceTimersByTime(500));
    expect(result.current).toBe('b');
  });

  it('eventually updates to the latest value', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useThrottle(value, 200),
      { initialProps: { value: 'a' } }
    );

    rerender({ value: 'b' });
    rerender({ value: 'c' });

    act(() => vi.advanceTimersByTime(200));
    expect(result.current).toBe('c');
  });
});
