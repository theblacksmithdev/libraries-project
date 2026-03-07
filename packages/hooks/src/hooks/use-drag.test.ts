import { renderHook, act } from '@testing-library/react';
import { useDrag } from './use-drag';

describe('useDrag', () => {
  it('starts as not dragging', () => {
    const { result } = renderHook(() => useDrag());
    expect(result.current.isDragging).toBe(false);
  });

  it('starts dragging on mousedown', () => {
    const { result } = renderHook(() => useDrag());

    act(() => {
      result.current.onMouseDown(
        new MouseEvent('mousedown', { clientX: 100, clientY: 100 }) as unknown as React.MouseEvent
      );
    });

    expect(result.current.isDragging).toBe(true);
    expect(result.current.x).toBe(100);
    expect(result.current.y).toBe(100);
  });

  it('tracks movement during drag', () => {
    const { result } = renderHook(() => useDrag());

    act(() => {
      result.current.onMouseDown(
        new MouseEvent('mousedown', { clientX: 50, clientY: 50 }) as unknown as React.MouseEvent
      );
    });

    act(() => {
      document.dispatchEvent(new MouseEvent('mousemove', { clientX: 150, clientY: 75 }));
    });

    expect(result.current.deltaX).toBe(100);
    expect(result.current.deltaY).toBe(25);
  });

  it('stops dragging on mouseup', () => {
    const { result } = renderHook(() => useDrag());

    act(() => {
      result.current.onMouseDown(
        new MouseEvent('mousedown', { clientX: 0, clientY: 0 }) as unknown as React.MouseEvent
      );
    });

    act(() => {
      document.dispatchEvent(new MouseEvent('mouseup'));
    });

    expect(result.current.isDragging).toBe(false);
  });
});
