import { renderHook, act } from '@testing-library/react';
import { useWindowSize } from './use-window-size';

describe('useWindowSize', () => {
  it('returns the current window size', () => {
    Object.defineProperty(window, 'innerWidth', { value: 1024, writable: true });
    Object.defineProperty(window, 'innerHeight', { value: 768, writable: true });

    const { result } = renderHook(() => useWindowSize());
    expect(result.current.width).toBe(1024);
    expect(result.current.height).toBe(768);
  });

  it('updates on resize', () => {
    const { result } = renderHook(() => useWindowSize());

    act(() => {
      Object.defineProperty(window, 'innerWidth', { value: 500, writable: true });
      Object.defineProperty(window, 'innerHeight', { value: 400, writable: true });
      window.dispatchEvent(new Event('resize'));
    });

    expect(result.current.width).toBe(500);
    expect(result.current.height).toBe(400);
  });
});
