import { renderHook, act } from '@testing-library/react';
import { useToggle } from './use-toggle';

describe('useToggle', () => {
  it('defaults to false', () => {
    const { result } = renderHook(() => useToggle());
    expect(result.current[0]).toBe(false);
  });

  it('accepts an initial value', () => {
    const { result } = renderHook(() => useToggle(true));
    expect(result.current[0]).toBe(true);
  });

  it('toggles the value', () => {
    const { result } = renderHook(() => useToggle());
    act(() => result.current[1].toggle());
    expect(result.current[0]).toBe(true);
    act(() => result.current[1].toggle());
    expect(result.current[0]).toBe(false);
  });

  it('sets value to true with on()', () => {
    const { result } = renderHook(() => useToggle(false));
    act(() => result.current[1].on());
    expect(result.current[0]).toBe(true);
  });

  it('sets value to false with off()', () => {
    const { result } = renderHook(() => useToggle(true));
    act(() => result.current[1].off());
    expect(result.current[0]).toBe(false);
  });
});
