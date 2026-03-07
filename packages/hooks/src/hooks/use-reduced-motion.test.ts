import { renderHook, act } from '@testing-library/react';
import { useReducedMotion } from './use-reduced-motion';

describe('useReducedMotion', () => {
  let listeners: Map<string, (e: MediaQueryListEvent) => void>;

  beforeEach(() => {
    listeners = new Map();

    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: (query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: () => {},
        removeListener: () => {},
        addEventListener: (_: string, handler: (e: MediaQueryListEvent) => void) => {
          listeners.set(query, handler);
        },
        removeEventListener: () => {
          listeners.delete(query);
        },
        dispatchEvent: () => false,
      }),
    });
  });

  it('returns false by default', () => {
    const { result } = renderHook(() => useReducedMotion());
    expect(result.current).toBe(false);
  });

  it('updates when preference changes', () => {
    const { result } = renderHook(() => useReducedMotion());

    act(() => {
      const handler = listeners.get('(prefers-reduced-motion: reduce)');
      handler?.({ matches: true } as MediaQueryListEvent);
    });

    expect(result.current).toBe(true);
  });

  it('cleans up on unmount', () => {
    const { unmount } = renderHook(() => useReducedMotion());
    unmount();
    expect(listeners.has('(prefers-reduced-motion: reduce)')).toBe(false);
  });
});
