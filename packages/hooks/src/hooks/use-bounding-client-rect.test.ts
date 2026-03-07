import { renderHook, act } from '@testing-library/react';
import { useBoundingClientRect } from './use-bounding-client-rect';

describe('useBoundingClientRect', () => {
  beforeEach(() => {
    globalThis.ResizeObserver = class {
      constructor(public cb: () => void) {}
      observe() {}
      unobserve() {}
      disconnect() {}
    } as unknown as typeof ResizeObserver;
  });

  it('starts with zero rect', () => {
    const { result } = renderHook(() => useBoundingClientRect<HTMLDivElement>());
    expect(result.current.rect.width).toBe(0);
    expect(result.current.rect.height).toBe(0);
  });

  it('returns a callback ref', () => {
    const { result } = renderHook(() => useBoundingClientRect<HTMLDivElement>());
    expect(typeof result.current.ref).toBe('function');
  });

  it('measures element on ref assignment', () => {
    const { result } = renderHook(() => useBoundingClientRect<HTMLDivElement>());

    const el = document.createElement('div');
    vi.spyOn(el, 'getBoundingClientRect').mockReturnValue({
      x: 10, y: 20, width: 100, height: 50,
      top: 20, right: 110, bottom: 70, left: 10,
      toJSON: () => {},
    });

    act(() => result.current.ref(el));

    expect(result.current.rect.width).toBe(100);
    expect(result.current.rect.height).toBe(50);
    expect(result.current.rect.top).toBe(20);
  });
});
