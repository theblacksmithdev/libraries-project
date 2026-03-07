import { renderHook, act } from '@testing-library/react';
import { useScrollPosition } from './use-scroll-position';

describe('useScrollPosition', () => {
  it('returns initial scroll position', () => {
    Object.defineProperty(window, 'scrollX', { value: 0, writable: true });
    Object.defineProperty(window, 'scrollY', { value: 0, writable: true });

    const { result } = renderHook(() => useScrollPosition());
    expect(result.current.x).toBe(0);
    expect(result.current.y).toBe(0);
  });

  it('updates on scroll', () => {
    const { result } = renderHook(() => useScrollPosition());

    act(() => {
      Object.defineProperty(window, 'scrollX', { value: 100, writable: true });
      Object.defineProperty(window, 'scrollY', { value: 200, writable: true });
      window.dispatchEvent(new Event('scroll'));
    });

    expect(result.current.x).toBe(100);
    expect(result.current.y).toBe(200);
  });
});
