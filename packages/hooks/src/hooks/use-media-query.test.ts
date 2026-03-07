import { renderHook, act } from '@testing-library/react';
import { useMediaQuery } from './use-media-query';

describe('useMediaQuery', () => {
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
    const { result } = renderHook(() =>
      useMediaQuery('(min-width: 768px)')
    );
    expect(result.current).toBe(false);
  });

  it('updates when the media query changes', () => {
    const { result } = renderHook(() =>
      useMediaQuery('(min-width: 768px)')
    );

    act(() => {
      const handler = listeners.get('(min-width: 768px)');
      handler?.({ matches: true } as MediaQueryListEvent);
    });

    expect(result.current).toBe(true);
  });

  it('cleans up listener on unmount', () => {
    const { unmount } = renderHook(() =>
      useMediaQuery('(min-width: 768px)')
    );
    unmount();
    expect(listeners.has('(min-width: 768px)')).toBe(false);
  });
});
