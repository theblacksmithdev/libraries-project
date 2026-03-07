import { renderHook, act } from '@testing-library/react';
import { useSSE } from './use-sse';

describe('useSSE', () => {
  let mockSource: {
    onopen: ((e: Event) => void) | null;
    onmessage: ((e: MessageEvent) => void) | null;
    onerror: ((e: Event) => void) | null;
    close: ReturnType<typeof vi.fn>;
  };

  beforeEach(() => {
    mockSource = {
      onopen: null,
      onmessage: null,
      onerror: null,
      close: vi.fn(),
    };

    globalThis.EventSource = vi.fn(() => mockSource) as unknown as typeof EventSource;
  });

  it('starts disconnected when url is null', () => {
    const { result } = renderHook(() => useSSE(null));
    expect(result.current.isConnected).toBe(false);
  });

  it('connects to event source', () => {
    const { result } = renderHook(() => useSSE('http://localhost/events'));

    act(() => {
      mockSource.onopen?.(new Event('open'));
    });

    expect(result.current.isConnected).toBe(true);
  });

  it('receives events', () => {
    const { result } = renderHook(() => useSSE('http://localhost/events'));

    act(() => {
      mockSource.onopen?.(new Event('open'));
    });

    act(() => {
      mockSource.onmessage?.(new MessageEvent('message', { data: 'hello' }));
    });

    expect(result.current.lastEvent?.data).toBe('hello');
  });

  it('closes on unmount', () => {
    const { unmount } = renderHook(() => useSSE('http://localhost/events'));
    unmount();
    expect(mockSource.close).toHaveBeenCalled();
  });
});
