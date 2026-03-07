import { renderHook, act } from '@testing-library/react';
import { useElementVisibility } from './use-element-visibility';

describe('useElementVisibility', () => {
  let observeCallback: (entries: Array<{ isIntersecting: boolean }>) => void;

  beforeEach(() => {
    globalThis.IntersectionObserver = class {
      constructor(cb: (entries: Array<{ isIntersecting: boolean }>) => void) {
        observeCallback = cb;
      }
      observe = vi.fn();
      unobserve = vi.fn();
      disconnect = vi.fn();
      root = null;
      rootMargin = '';
      thresholds = [];
      takeRecords = () => [];
    } as unknown as typeof IntersectionObserver;
  });

  it('starts as not visible', () => {
    const { result } = renderHook(() => useElementVisibility<HTMLDivElement>());
    expect(result.current.isVisible).toBe(false);
  });

  it('returns a ref', () => {
    const { result } = renderHook(() => useElementVisibility<HTMLDivElement>());
    expect(result.current.ref).toBeDefined();
  });

  it('updates when element becomes visible', () => {
    const el = document.createElement('div');

    const { result } = renderHook(() => {
      const hookResult = useElementVisibility<HTMLDivElement>();
      (hookResult.ref as React.MutableRefObject<HTMLDivElement | null>).current = el;
      return hookResult;
    });

    act(() => {
      observeCallback([{ isIntersecting: true }]);
    });

    expect(result.current.isVisible).toBe(true);
  });
});
