import { useEffect, useRef, useState } from 'react';

interface UseSSEOptions {
  onMessage?: (event: MessageEvent) => void;
  onError?: (event: Event) => void;
  withCredentials?: boolean;
}

export function useSSE(url: string | null, options: UseSSEOptions = {}) {
  const { onMessage, onError, withCredentials = false } = options;
  const [lastEvent, setLastEvent] = useState<MessageEvent | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const sourceRef = useRef<EventSource | null>(null);
  const optionsRef = useRef({ onMessage, onError });
  optionsRef.current = { onMessage, onError };

  useEffect(() => {
    if (!url) return;

    const source = new EventSource(url, { withCredentials });
    sourceRef.current = source;

    source.onopen = () => setIsConnected(true);

    source.onmessage = (e) => {
      setLastEvent(e);
      optionsRef.current.onMessage?.(e);
    };

    source.onerror = (e) => {
      setIsConnected(false);
      optionsRef.current.onError?.(e);
    };

    return () => {
      source.close();
      setIsConnected(false);
    };
  }, [url, withCredentials]);

  const close = () => {
    sourceRef.current?.close();
    setIsConnected(false);
  };

  return { lastEvent, isConnected, close };
}
