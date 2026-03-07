import { renderHook, act } from '@testing-library/react';
import { useStickyHeader } from './use-sticky-header';

describe('useStickyHeader', () => {
  it('returns false when at top', () => {
    Object.defineProperty(window, 'scrollY', { value: 0, writable: true });
    const { result } = renderHook(() => useStickyHeader(100));
    expect(result.current).toBe(false);
  });

  it('returns true when scrolled past threshold', () => {
    Object.defineProperty(window, 'scrollY', { value: 0, writable: true });
    const { result } = renderHook(() => useStickyHeader(100));

    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 150, writable: true });
      window.dispatchEvent(new Event('scroll'));
    });

    expect(result.current).toBe(true);
  });

  it('returns false when scrolled back above threshold', () => {
    Object.defineProperty(window, 'scrollY', { value: 150, writable: true });
    const { result } = renderHook(() => useStickyHeader(100));

    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 50, writable: true });
      window.dispatchEvent(new Event('scroll'));
    });

    expect(result.current).toBe(false);
  });
});
