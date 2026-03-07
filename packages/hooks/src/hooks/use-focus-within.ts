import { useCallback, useRef, useState } from 'react';

export function useFocusWithin<T extends HTMLElement>() {
  const [isFocusWithin, setIsFocusWithin] = useState(false);
  const nodeRef = useRef<T | null>(null);

  const ref = useCallback((node: T | null) => {
    if (nodeRef.current) {
      nodeRef.current.removeEventListener('focusin', handleFocusIn);
      nodeRef.current.removeEventListener('focusout', handleFocusOut);
    }

    nodeRef.current = node;

    if (node) {
      node.addEventListener('focusin', handleFocusIn);
      node.addEventListener('focusout', handleFocusOut);
    }
  }, []);

  function handleFocusIn() {
    setIsFocusWithin(true);
  }

  function handleFocusOut(e: Event) {
    const focusEvent = e as FocusEvent;
    if (
      nodeRef.current &&
      !nodeRef.current.contains(focusEvent.relatedTarget as Node)
    ) {
      setIsFocusWithin(false);
    }
  }

  return { ref, isFocusWithin };
}
