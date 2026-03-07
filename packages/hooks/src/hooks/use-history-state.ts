import { useCallback, useRef, useState } from 'react';

export function useHistoryState<T>(initialValue: T) {
  const [state, setState] = useState(initialValue);
  const historyRef = useRef<T[]>([initialValue]);
  const pointerRef = useRef(0);

  const set = useCallback((value: T) => {
    const pointer = pointerRef.current + 1;
    historyRef.current = historyRef.current.slice(0, pointer);
    historyRef.current.push(value);
    pointerRef.current = pointer;
    setState(value);
  }, []);

  const undo = useCallback(() => {
    if (pointerRef.current > 0) {
      pointerRef.current -= 1;
      setState(historyRef.current[pointerRef.current]);
    }
  }, []);

  const redo = useCallback(() => {
    if (pointerRef.current < historyRef.current.length - 1) {
      pointerRef.current += 1;
      setState(historyRef.current[pointerRef.current]);
    }
  }, []);

  const clear = useCallback(() => {
    historyRef.current = [initialValue];
    pointerRef.current = 0;
    setState(initialValue);
  }, [initialValue]);

  return {
    state,
    set,
    undo,
    redo,
    clear,
    canUndo: pointerRef.current > 0,
    canRedo: pointerRef.current < historyRef.current.length - 1,
  };
}
