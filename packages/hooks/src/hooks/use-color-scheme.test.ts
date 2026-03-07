import { renderHook, act } from '@testing-library/react';
import { useColorScheme } from './use-color-scheme';

describe('useColorScheme', () => {
  let listeners: Map<string, (e: MediaQueryListEvent) => void>;

  beforeEach(() => {
    listeners = new Map();
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: (query: string) => ({
        matches: false,
        media: query,
        addEventListener: (_: string, handler: (e: MediaQueryListEvent) => void) => {
          listeners.set(query, handler);
        },
        removeEventListener: () => {
          listeners.delete(query);
        },
      }),
    });
  });

  it('returns light by default', () => {
    const { result } = renderHook(() => useColorScheme());
    expect(result.current).toBe('light');
  });

  it('updates when preference changes to dark', () => {
    const { result } = renderHook(() => useColorScheme());

    act(() => {
      const handler = listeners.get('(prefers-color-scheme: dark)');
      handler?.({ matches: true } as MediaQueryListEvent);
    });

    expect(result.current).toBe('dark');
  });
});
