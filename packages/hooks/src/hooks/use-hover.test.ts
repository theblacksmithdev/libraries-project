import { renderHook, act } from '@testing-library/react';
import { useHover } from './use-hover';

describe('useHover', () => {
  it('starts as not hovered', () => {
    const { result } = renderHook(() => useHover<HTMLDivElement>());
    expect(result.current.isHovered).toBe(false);
  });

  it('detects hover on mouseenter', () => {
    const { result } = renderHook(() => useHover<HTMLDivElement>());

    const el = document.createElement('div');
    act(() => result.current.ref(el));

    act(() => {
      el.dispatchEvent(new MouseEvent('mouseenter'));
    });
    expect(result.current.isHovered).toBe(true);
  });

  it('detects unhover on mouseleave', () => {
    const { result } = renderHook(() => useHover<HTMLDivElement>());

    const el = document.createElement('div');
    act(() => result.current.ref(el));

    act(() => el.dispatchEvent(new MouseEvent('mouseenter')));
    act(() => el.dispatchEvent(new MouseEvent('mouseleave')));
    expect(result.current.isHovered).toBe(false);
  });
});
