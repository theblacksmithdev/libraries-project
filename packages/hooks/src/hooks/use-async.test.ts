import { renderHook, act, waitFor } from '@testing-library/react';
import { useAsync } from './use-async';

describe('useAsync', () => {
  it('starts in idle state', () => {
    const { result } = renderHook(() => useAsync(async () => 42));
    expect(result.current.status).toBe('idle');
    expect(result.current.isLoading).toBe(false);
  });

  it('executes async function and returns data', async () => {
    const fn = vi.fn().mockResolvedValue({ id: 1 });
    const { result } = renderHook(() => useAsync(fn));

    await act(async () => {
      await result.current.execute();
    });

    expect(result.current.status).toBe('success');
    expect(result.current.data).toEqual({ id: 1 });
    expect(result.current.isSuccess).toBe(true);
  });

  it('handles errors', async () => {
    const fn = vi.fn().mockRejectedValue(new Error('fail'));
    const { result } = renderHook(() => useAsync(fn));

    await act(async () => {
      try {
        await result.current.execute();
      } catch {
        // expected
      }
    });

    expect(result.current.status).toBe('error');
    expect(result.current.error?.message).toBe('fail');
    expect(result.current.isError).toBe(true);
  });

  it('passes arguments to the async function', async () => {
    const fn = vi.fn().mockResolvedValue('ok');
    const { result } = renderHook(() => useAsync(fn));

    await act(async () => {
      await result.current.execute('a', 'b');
    });

    expect(fn).toHaveBeenCalledWith('a', 'b');
  });

  it('resets state', async () => {
    const fn = vi.fn().mockResolvedValue(42);
    const { result } = renderHook(() => useAsync(fn));

    await act(async () => {
      await result.current.execute();
    });

    act(() => result.current.reset());
    expect(result.current.status).toBe('idle');
    expect(result.current.data).toBeNull();
  });
});
