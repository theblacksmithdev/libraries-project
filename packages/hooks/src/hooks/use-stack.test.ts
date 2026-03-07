import { renderHook, act } from '@testing-library/react';
import { useStack } from './use-stack';

describe('useStack', () => {
  it('starts empty by default', () => {
    const { result } = renderHook(() => useStack<number>());
    expect(result.current.size).toBe(0);
  });

  it('accepts initial values', () => {
    const { result } = renderHook(() => useStack([1, 2, 3]));
    expect(result.current.size).toBe(3);
    expect(result.current.peek).toBe(3);
  });

  it('pushes items', () => {
    const { result } = renderHook(() => useStack<number>());
    act(() => result.current.push(1));
    act(() => result.current.push(2));
    expect(result.current.stack).toEqual([1, 2]);
    expect(result.current.peek).toBe(2);
  });

  it('pops items (LIFO)', () => {
    const { result } = renderHook(() => useStack([1, 2, 3]));
    act(() => result.current.pop());
    expect(result.current.stack).toEqual([1, 2]);
    expect(result.current.peek).toBe(2);
  });

  it('clears the stack', () => {
    const { result } = renderHook(() => useStack([1, 2]));
    act(() => result.current.clear());
    expect(result.current.size).toBe(0);
  });

  it('resets to initial value', () => {
    const { result } = renderHook(() => useStack([1, 2]));
    act(() => result.current.push(3));
    act(() => result.current.reset());
    expect(result.current.stack).toEqual([1, 2]);
  });
});
