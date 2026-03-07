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

  it('updates when element becomes visible', () => {
    const { result } = renderHook(() => useIntersectionObserver<HTMLDivElement>());

    const el = document.createElement('div');
    Object.defineProperty(result.current.ref, 'current', { value: el, writable: true });

    // Force re-render to trigger useEffect with ref set
    const { result: result2 } = renderHook(() => useIntersectionObserver<HTMLDivElement>());
    Object.defineProperty(result2.current.ref, 'current', { value: el, writable: true });

    // Simulate intersection
    act(() => {
      observeCallback?.([{ isIntersecting: true }]);
    });

    expect(result2.current.isIntersecting).toBe(true);
  });

  it('returns a ref object', () => {
    const { result } = renderHook(() => useIntersectionObserver<HTMLDivElement>());
    expect(result.current.ref).toBeDefined();
    expect(result.current.ref.current).toBeNull();
  });
});
