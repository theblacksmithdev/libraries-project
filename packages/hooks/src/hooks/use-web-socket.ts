import { useCallback, useEffect, useRef, useState } from 'react';

type ReadyState = 'connecting' | 'open' | 'closing' | 'closed';

interface UseWebSocketOptions {
  onOpen?: (event: Event) => void;
  onMessage?: (event: MessageEvent) => void;
  onClose?: (event: CloseEvent) => void;
  onError?: (event: Event) => void;
  reconnect?: boolean;
  reconnectInterval?: number;
  reconnectAttempts?: number;
}

export function useWebSocket(url: string | null, options: UseWebSocketOptions = {}) {
  const {
    onOpen,
    onMessage,
    onClose,
    onError,
    reconnect = false,
    reconnectInterval = 3000,
    reconnectAttempts = 5,
  } = options;

  const [readyState, setReadyState] = useState<ReadyState>('closed');
  const [lastMessage, setLastMessage] = useState<MessageEvent | null>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const attemptsRef = useRef(0);
  const optionsRef = useRef({ onOpen, onMessage, onClose, onError });
  optionsRef.current = { onOpen, onMessage, onClose, onError };

  const connect = useCallback(() => {
    if (!url) return;

    const ws = new WebSocket(url);
    wsRef.current = ws;
    setReadyState('connecting');

    ws.onopen = (e) => {
      setReadyState('open');
      attemptsRef.current = 0;
      optionsRef.current.onOpen?.(e);
    };

    ws.onmessage = (e) => {
      setLastMessage(e);
      optionsRef.current.onMessage?.(e);
    };

    ws.onclose = (e) => {
      setReadyState('closed');
      optionsRef.current.onClose?.(e);

      if (reconnect && attemptsRef.current < reconnectAttempts) {
        attemptsRef.current += 1;
        setTimeout(connect, reconnectInterval);
      }
    };

    ws.onerror = (e) => {
      optionsRef.current.onError?.(e);
    };
  }, [url, reconnect, reconnectInterval, reconnectAttempts]);

  const send = useCallback((data: string | ArrayBufferLike | Blob) => {
    wsRef.current?.send(data);
  }, []);

  const disconnect = useCallback(() => {
    wsRef.current?.close();
  }, []);

  useEffect(() => {
    connect();
    return () => {
      wsRef.current?.close();
    };
  }, [connect]);

  return { readyState, lastMessage, send, disconnect };
}
