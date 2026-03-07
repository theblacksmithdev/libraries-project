import { renderHook } from '@testing-library/react';
import { useIsMounted } from './use-is-mounted';

describe('useIsMounted', () => {
  it('returns true when mounted', () => {
    const { result } = renderHook(() => useIsMounted());
    expect(result.current()).toBe(true);
  });

  it('returns false after unmount', () => {
    const { result, unmount } = renderHook(() => useIsMounted());
    const isMounted = result.current;
    unmount();
    expect(isMounted()).toBe(false);
  });

  it('returns a stable function reference', () => {
    const { result, rerender } = renderHook(() => useIsMounted());
    const first = result.current;
    rerender();
    expect(result.current).toBe(first);
  });
});
