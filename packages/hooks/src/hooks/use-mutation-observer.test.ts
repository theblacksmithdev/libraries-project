import { renderHook } from '@testing-library/react';
import { useMutationObserver } from './use-mutation-observer';

describe('useMutationObserver', () => {
  let observeSpy: ReturnType<typeof vi.fn>;
  let disconnectSpy: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    observeSpy = vi.fn();
    disconnectSpy = vi.fn();

    globalThis.MutationObserver = class {
      constructor(public cb: MutationCallback) {}
      observe = observeSpy;
      disconnect = disconnectSpy;
      takeRecords = () => [];
    } as unknown as typeof MutationObserver;
  });

  it('returns a ref', () => {
    const { result } = renderHook(() =>
      useMutationObserver<HTMLDivElement>(vi.fn())
    );
    expect(result.current).toBeDefined();
    expect(result.current.current).toBeNull();
  });

  it('observes when ref has an element', () => {
    const el = document.createElement('div');
    const { result } = renderHook(() => {
      const ref = useMutationObserver<HTMLDivElement>(vi.fn());
      (ref as React.MutableRefObject<HTMLDivElement | null>).current = el;
      return ref;
    });

    expect(observeSpy).toHaveBeenCalledWith(el, expect.any(Object));
  });

  it('disconnects on unmount', () => {
    const el = document.createElement('div');
    const { unmount } = renderHook(() => {
      const ref = useMutationObserver<HTMLDivElement>(vi.fn());
      (ref as React.MutableRefObject<HTMLDivElement | null>).current = el;
      return ref;
    });

    unmount();
    expect(disconnectSpy).toHaveBeenCalled();
  });
});
