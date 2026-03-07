import { renderHook, act } from '@testing-library/react';
import { useElementSize } from './use-element-size';

describe('useElementSize', () => {
  let observeCallback: (entries: Array<{ contentRect: { width: number; height: number } }>) => void;

  beforeEach(() => {
    globalThis.ResizeObserver = class {
      constructor(cb: (entries: Array<{ contentRect: { width: number; height: number } }>) => void) {
        observeCallback = cb;
      }
      observe() {}
      unobserve() {}
      disconnect() {}
    } as unknown as typeof ResizeObserver;
  });

  it('starts with zero dimensions', () => {
    const { result } = renderHook(() => useElementSize<HTMLDivElement>());
    expect(result.current.width).toBe(0);
    expect(result.current.height).toBe(0);
  });

  it('updates size when ResizeObserver fires', () => {
    const { result } = renderHook(() => useElementSize<HTMLDivElement>());

    const el = document.createElement('div');
    act(() => {
      result.current.ref(el);
    });

    act(() => {
      observeCallback([{ contentRect: { width: 200, height: 100 } }]);
    });

    expect(result.current.width).toBe(200);
    expect(result.current.height).toBe(100);
  });

  it('returns a callback ref', () => {
    const { result } = renderHook(() => useElementSize<HTMLDivElement>());
    expect(typeof result.current.ref).toBe('function');
  });
});
