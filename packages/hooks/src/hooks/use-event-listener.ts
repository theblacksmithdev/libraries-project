import { useEffect, useRef } from 'react';

export function useEventListener<K extends keyof WindowEventMap>(
  eventName: K,
  handler: (event: WindowEventMap[K]) => void,
  element?: undefined,
  options?: boolean | AddEventListenerOptions
): void;
export function useEventListener<
  K extends keyof HTMLElementEventMap,
  T extends HTMLElement,
>(
  eventName: K,
  handler: (event: HTMLElementEventMap[K]) => void,
  element: React.RefObject<T | null>,
  options?: boolean | AddEventListenerOptions
): void;
export function useEventListener(
  eventName: string,
  handler: (event: Event) => void,
  element?: React.RefObject<HTMLElement | null>,
  options?: boolean | AddEventListenerOptions
) {
  const handlerRef = useRef(handler);
  handlerRef.current = handler;

  useEffect(() => {
    const target = element?.current ?? window;

    const listener = (event: Event) => handlerRef.current(event);
    target.addEventListener(eventName, listener, options);
    return () => target.removeEventListener(eventName, listener, options);
  }, [eventName, element, options]);
}
