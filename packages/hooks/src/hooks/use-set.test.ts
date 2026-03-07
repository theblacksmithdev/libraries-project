import { renderHook, act } from '@testing-library/react';
import { useSet } from './use-set';

describe('useSet', () => {
  it('starts empty by default', () => {
    const { result } = renderHook(() => useSet<number>());
    expect(result.current.size).toBe(0);
  });

  it('accepts initial values', () => {
    const { result } = renderHook(() => useSet([1, 2, 3]));
    expect(result.current.size).toBe(3);
  });

  it('adds a value', () => {
    const { result } = renderHook(() => useSet<number>());
    act(() => result.current.add(1));
    expect(result.current.has(1)).toBe(true);
  });

  it('removes a value', () => {
    const { result } = renderHook(() => useSet([1, 2]));
    act(() => result.current.remove(1));
    expect(result.current.has(1)).toBe(false);
    expect(result.current.size).toBe(1);
  });

  it('toggles a value', () => {
    const { result } = renderHook(() => useSet<number>());
    act(() => result.current.toggle(1));
    expect(result.current.has(1)).toBe(true);
    act(() => result.current.toggle(1));
    expect(result.current.has(1)).toBe(false);
  });

  it('clears all values', () => {
    const { result } = renderHook(() => useSet([1, 2, 3]));
    act(() => result.current.clear());
    expect(result.current.size).toBe(0);
  });

  it('resets to initial values', () => {
    const { result } = renderHook(() => useSet([1, 2]));
    act(() => result.current.add(3));
    act(() => result.current.reset());
    expect(result.current.size).toBe(2);
  });
});
