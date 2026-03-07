import { renderHook, act } from '@testing-library/react';
import { useRetry } from './use-retry';

describe('useRetry', () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it('succeeds on first attempt', async () => {
    const fn = vi.fn().mockResolvedValue('ok');
    const { result } = renderHook(() => useRetry(fn, { maxAttempts: 3 }));

    await act(async () => {
      await result.current.execute();
    });

    expect(result.current.data).toBe('ok');
    expect(result.current.attempts).toBe(1);
    expect(result.current.isRetrying).toBe(false);
  });

  it('retries on failure', async () => {
    const fn = vi.fn()
      .mockRejectedValueOnce(new Error('fail'))
      .mockResolvedValue('ok');

    const { result } = renderHook(() =>
      useRetry(fn, { maxAttempts: 3, delay: 100, backoff: false })
    );

    await act(async () => {
      const promise = result.current.execute();
      await vi.advanceTimersByTimeAsync(100);
      await promise;
    });

    expect(fn).toHaveBeenCalledTimes(2);
    expect(result.current.data).toBe('ok');
  });

  it('throws after max attempts', async () => {
    const fn = vi.fn().mockRejectedValue(new Error('always fail'));
    const { result } = renderHook(() =>
      useRetry(fn, { maxAttempts: 2, delay: 50, backoff: false })
    );

    await act(async () => {
      const promise = result.current.execute();
      await vi.advanceTimersByTimeAsync(50);
      await promise;
    });

    expect(fn).toHaveBeenCalledTimes(2);
    expect(result.current.error?.message).toBe('always fail');
  });

  it('resets state', async () => {
    const fn = vi.fn().mockResolvedValue('ok');
    const { result } = renderHook(() => useRetry(fn));

    await act(async () => {
      await result.current.execute();
    });

    act(() => result.current.reset());
    expect(result.current.data).toBeNull();
    expect(result.current.attempts).toBe(0);
  });
});
