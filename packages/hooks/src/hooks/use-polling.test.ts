import { renderHook, act, waitFor } from '@testing-library/react';
import { usePolling } from './use-polling';

describe('usePolling', () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it('polls at interval', async () => {
    const fn = vi.fn().mockResolvedValue('data');
    renderHook(() => usePolling(fn, 1000));

    await act(async () => {
      await Promise.resolve();
    });
    expect(fn).toHaveBeenCalledTimes(1);

    await act(async () => {
      vi.advanceTimersByTime(1000);
      await Promise.resolve();
    });
    expect(fn).toHaveBeenCalledTimes(2);
  });

  it('does not poll when disabled', () => {
    const fn = vi.fn().mockResolvedValue('data');
    renderHook(() => usePolling(fn, 1000, { enabled: false }));

    vi.advanceTimersByTime(3000);
    expect(fn).not.toHaveBeenCalled();
  });

  it('can be stopped and started', async () => {
    const fn = vi.fn().mockResolvedValue('data');
    const { result } = renderHook(() => usePolling(fn, 1000));

    await act(async () => {
      await Promise.resolve();
    });

    act(() => result.current.stop());
    vi.advanceTimersByTime(3000);
    const callCount = fn.mock.calls.length;

    act(() => result.current.start());
    await act(async () => {
      await Promise.resolve();
    });
    expect(fn.mock.calls.length).toBeGreaterThan(callCount);
  });
});
