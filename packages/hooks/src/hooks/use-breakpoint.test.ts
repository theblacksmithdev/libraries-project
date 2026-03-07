import { renderHook, act } from '@testing-library/react';
import { useBreakpoint } from './use-breakpoint';

describe('useBreakpoint', () => {
  it('returns current breakpoint based on window width', () => {
    Object.defineProperty(window, 'innerWidth', { value: 1024, writable: true });
    const { result } = renderHook(() => useBreakpoint());
    expect(result.current).toBe('lg');
  });

  it('returns xs for small widths', () => {
    Object.defineProperty(window, 'innerWidth', { value: 320, writable: true });
    const { result } = renderHook(() => useBreakpoint());
    expect(result.current).toBe('xs');
  });

  it('updates on resize', () => {
    Object.defineProperty(window, 'innerWidth', { value: 1024, writable: true });
    const { result } = renderHook(() => useBreakpoint());

    act(() => {
      Object.defineProperty(window, 'innerWidth', { value: 500, writable: true });
      window.dispatchEvent(new Event('resize'));
    });

    expect(result.current).toBe('xs');
  });

  it('supports custom breakpoints', () => {
    Object.defineProperty(window, 'innerWidth', { value: 800, writable: true });
    const { result } = renderHook(() =>
      useBreakpoint({ mobile: 0, tablet: 600, desktop: 1024 })
    );
    expect(result.current).toBe('tablet');
  });
});
