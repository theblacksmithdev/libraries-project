import { renderHook, act } from '@testing-library/react';
import { useSwipe } from './use-swipe';

function createTouch(x: number, y: number) {
  return { touches: [{ clientX: x, clientY: y }] } as unknown as TouchEvent;
}

describe('useSwipe', () => {
  it('starts with no swipe', () => {
    const { result } = renderHook(() => useSwipe());
    expect(result.current.direction).toBeNull();
    expect(result.current.isSwiping).toBe(false);
  });

  it('detects a right swipe', () => {
    const { result } = renderHook(() => useSwipe(50));

    act(() => result.current.handlers.onTouchStart(createTouch(0, 0)));
    act(() => result.current.handlers.onTouchMove(createTouch(100, 0)));
    act(() => result.current.handlers.onTouchEnd());

    expect(result.current.direction).toBe('right');
  });

  it('detects a left swipe', () => {
    const { result } = renderHook(() => useSwipe(50));

    act(() => result.current.handlers.onTouchStart(createTouch(100, 0)));
    act(() => result.current.handlers.onTouchMove(createTouch(0, 0)));
    act(() => result.current.handlers.onTouchEnd());

    expect(result.current.direction).toBe('left');
  });

  it('detects a down swipe', () => {
    const { result } = renderHook(() => useSwipe(50));

    act(() => result.current.handlers.onTouchStart(createTouch(0, 0)));
    act(() => result.current.handlers.onTouchMove(createTouch(0, 100)));
    act(() => result.current.handlers.onTouchEnd());

    expect(result.current.direction).toBe('down');
  });

  it('ignores swipes below threshold', () => {
    const { result } = renderHook(() => useSwipe(50));

    act(() => result.current.handlers.onTouchStart(createTouch(0, 0)));
    act(() => result.current.handlers.onTouchMove(createTouch(10, 10)));
    act(() => result.current.handlers.onTouchEnd());

    expect(result.current.direction).toBeNull();
  });
});
