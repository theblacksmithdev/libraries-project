import { renderHook, act } from '@testing-library/react';
import { useWebSocket } from './use-web-socket';

describe('useWebSocket', () => {
  let mockWs: {
    onopen: ((e: Event) => void) | null;
    onclose: ((e: CloseEvent) => void) | null;
    onmessage: ((e: MessageEvent) => void) | null;
    onerror: ((e: Event) => void) | null;
    send: ReturnType<typeof vi.fn>;
    close: ReturnType<typeof vi.fn>;
  };

  beforeEach(() => {
    mockWs = {
      onopen: null,
      onclose: null,
      onmessage: null,
      onerror: null,
      send: vi.fn(),
      close: vi.fn(),
    };

    globalThis.WebSocket = vi.fn(() => mockWs) as unknown as typeof WebSocket;
  });

  it('starts as closed when url is null', () => {
    const { result } = renderHook(() => useWebSocket(null));
    expect(result.current.readyState).toBe('closed');
  });

  it('connects to websocket', () => {
    const { result } = renderHook(() => useWebSocket('ws://localhost'));
    expect(result.current.readyState).toBe('connecting');

    act(() => {
      mockWs.onopen?.(new Event('open'));
    });

    expect(result.current.readyState).toBe('open');
  });

  it('receives messages', () => {
    const { result } = renderHook(() => useWebSocket('ws://localhost'));

    act(() => {
      mockWs.onopen?.(new Event('open'));
    });

    act(() => {
      mockWs.onmessage?.(new MessageEvent('message', { data: 'hello' }));
    });

    expect(result.current.lastMessage?.data).toBe('hello');
  });

  it('sends messages', () => {
    const { result } = renderHook(() => useWebSocket('ws://localhost'));

    act(() => {
      mockWs.onopen?.(new Event('open'));
    });

    act(() => {
      result.current.send('test');
    });

    expect(mockWs.send).toHaveBeenCalledWith('test');
  });
});
