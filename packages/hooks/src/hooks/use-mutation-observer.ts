import { useEffect, useRef } from 'react';

export function useMutationObserver<T extends HTMLElement>(
  callback: MutationCallback,
  options: MutationObserverInit = { childList: true, subtree: true }
) {
  const ref = useRef<T | null>(null);
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new MutationObserver((...args) => callbackRef.current(...args));
    observer.observe(node, options);
    return () => observer.disconnect();
  }, [options.childList, options.subtree, options.attributes, options.characterData]);

  return ref;
}
