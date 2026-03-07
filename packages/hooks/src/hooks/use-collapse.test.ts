import { renderHook, act } from '@testing-library/react';
import { useCollapse } from './use-collapse';

describe('useCollapse', () => {
  it('starts closed by default', () => {
    const { result } = renderHook(() => useCollapse());
    expect(result.current.isOpen).toBe(false);
  });

  it('accepts default open state', () => {
    const { result } = renderHook(() => useCollapse(true));
    expect(result.current.isOpen).toBe(true);
  });

  it('toggles open/close', () => {
    const { result } = renderHook(() => useCollapse());
    act(() => result.current.toggle());
    expect(result.current.isOpen).toBe(true);
    act(() => result.current.toggle());
    expect(result.current.isOpen).toBe(false);
  });

  it('returns collapse props with height 0 when closed', () => {
    const { result } = renderHook(() => useCollapse());
    const props = result.current.getCollapseProps();
    expect(props.style.height).toBe('0px');
    expect(props['aria-hidden']).toBe(true);
  });

  it('returns collapse props with auto height when open', () => {
    const { result } = renderHook(() => useCollapse(true));
    const props = result.current.getCollapseProps();
    expect(props.style.height).toBe('auto');
    expect(props['aria-hidden']).toBe(false);
  });

  it('returns toggle props with aria-expanded', () => {
    const { result } = renderHook(() => useCollapse());
    expect(result.current.getToggleProps()['aria-expanded']).toBe(false);

    act(() => result.current.open());
    expect(result.current.getToggleProps()['aria-expanded']).toBe(true);
  });
});
