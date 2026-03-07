import { renderHook, act } from '@testing-library/react';
import { useIntersectionObserver } from './use-intersection-observer';

describe('useIntersectionObserver', () => {
  let observeCallback: (entries: Array<{ isIntersecting: boolean }>) => void;
  let observeSpy: ReturnType<typeof vi.fn>;
  let disconnectSpy: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    observeSpy = vi.fn();
    disconnectSpy = vi.fn();

    globalThis.IntersectionObserver = class {
      constructor(cb: (entries: Array<{ isIntersecting: boolean }>) => void) {
        observeCallback = cb;
      }
      observe = observeSpy;
      unobserve = vi.fn();
      disconnect = disconnectSpy;
      root = null;
      rootMargin = '';
      thresholds = [];
      takeRecords = () => [];
    } as unknown as typeof IntersectionObserver;
  });

  it('starts as not intersecting', () => {
    const { result } = renderHook(() => useIntersectionObserver<HTMLDivElement>());
    expect(result.current.isIntersecting).toBe(false);
    expect(result.current.entry).toBeNull();
  });

  it('updates when observer fires intersection callback', () => {
    const el = document.createElement('div');

    const { result } = renderHook(() => {
      const hookResult = useIntersectionObserver<HTMLDivElement>();
      (hookResult.ref as React.MutableRefObject<HTMLDivElement | null>).current = el;
      return hookResult;
    });

    act(() => {
      observeCallback?.([{ isIntersecting: true }]);
    });

    expect(result.current.isIntersecting).toBe(true);
  });

  it('returns a ref object', () => {
    const { result } = renderHook(() => useIntersectionObserver<HTMLDivElement>());
    expect(result.current.ref).toBeDefined();
    expect(result.current.ref.current).toBeNull();
  });

  it('calls observe on the element', () => {
    const el = document.createElement('div');

    renderHook(() => {
      const hookResult = useIntersectionObserver<HTMLDivElement>();
      (hookResult.ref as React.MutableRefObject<HTMLDivElement | null>).current = el;
      return hookResult;
    });

    expect(observeSpy).toHaveBeenCalledWith(el);
  });
});
