import { renderHook, act } from '@testing-library/react';
import { useList } from './use-list';

describe('useList', () => {
  it('starts with initial value', () => {
    const { result } = renderHook(() => useList([1, 2, 3]));
    expect(result.current[0]).toEqual([1, 2, 3]);
  });

  it('defaults to empty array', () => {
    const { result } = renderHook(() => useList());
    expect(result.current[0]).toEqual([]);
  });

  it('pushes items', () => {
    const { result } = renderHook(() => useList([1]));
    act(() => result.current[1].push(2, 3));
    expect(result.current[0]).toEqual([1, 2, 3]);
  });

  it('removes at index', () => {
    const { result } = renderHook(() => useList(['a', 'b', 'c']));
    act(() => result.current[1].removeAt(1));
    expect(result.current[0]).toEqual(['a', 'c']);
  });

  it('updates at index', () => {
    const { result } = renderHook(() => useList(['a', 'b', 'c']));
    act(() => result.current[1].updateAt(1, 'x'));
    expect(result.current[0]).toEqual(['a', 'x', 'c']);
  });

  it('inserts at index', () => {
    const { result } = renderHook(() => useList([1, 3]));
    act(() => result.current[1].insertAt(1, 2));
    expect(result.current[0]).toEqual([1, 2, 3]);
  });

  it('clears the list', () => {
    const { result } = renderHook(() => useList([1, 2, 3]));
    act(() => result.current[1].clear());
    expect(result.current[0]).toEqual([]);
  });

  it('filters the list', () => {
    const { result } = renderHook(() => useList([1, 2, 3, 4, 5]));
    act(() => result.current[1].filter((n) => n % 2 === 0));
    expect(result.current[0]).toEqual([2, 4]);
  });

  it('resets to initial value', () => {
    const { result } = renderHook(() => useList([1, 2]));
    act(() => result.current[1].push(3));
    act(() => result.current[1].reset());
    expect(result.current[0]).toEqual([1, 2]);
  });
});
