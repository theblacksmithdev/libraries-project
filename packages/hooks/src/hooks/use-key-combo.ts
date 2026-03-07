import { useEffect, useRef } from 'react';

interface KeyComboOptions {
  ctrl?: boolean;
  shift?: boolean;
  alt?: boolean;
  meta?: boolean;
}

export function useKeyCombo(
  key: string,
  handler: (event: KeyboardEvent) => void,
  modifiers: KeyComboOptions = {},
  enabled = true
) {
  const handlerRef = useRef(handler);
  handlerRef.current = handler;

  useEffect(() => {
    if (!enabled) return;

    const listener = (e: KeyboardEvent) => {
      const matchCtrl = modifiers.ctrl ? e.ctrlKey : !e.ctrlKey;
      const matchShift = modifiers.shift ? e.shiftKey : !e.shiftKey;
      const matchAlt = modifiers.alt ? e.altKey : !e.altKey;
      const matchMeta = modifiers.meta ? e.metaKey : !e.metaKey;

      if (e.key === key && matchCtrl && matchShift && matchAlt && matchMeta) {
        handlerRef.current(e);
      }
    };

    window.addEventListener('keydown', listener);
    return () => window.removeEventListener('keydown', listener);
  }, [key, modifiers.ctrl, modifiers.shift, modifiers.alt, modifiers.meta, enabled]);
}
