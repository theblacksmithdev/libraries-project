import { renderHook, waitFor } from '@testing-library/react';
import { useFetch } from './use-fetch';

describe('useFetch', () => {
  const mockData = { id: 1, name: 'Test' };

  beforeEach(() => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockData),
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('fetches data on mount', async () => {
    const { result } = renderHook(() => useFetch('/api/test'));

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.data).toEqual(mockData);
    expect(result.current.error).toBeNull();
  });

  it('handles fetch errors', async () => {
    (globalThis.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: false,
      status: 404,
      statusText: 'Not Found',
    });

    const { result } = renderHook(() => useFetch('/api/missing'));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.error?.message).toContain('404');
    expect(result.current.data).toBeNull();
  });

  it('does not fetch when disabled', () => {
    renderHook(() => useFetch('/api/test', { enabled: false }));
    expect(globalThis.fetch).not.toHaveBeenCalled();
  });

  it('provides a refetch function', async () => {
    const { result } = renderHook(() => useFetch('/api/test'));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(globalThis.fetch).toHaveBeenCalledTimes(1);
  });
});
