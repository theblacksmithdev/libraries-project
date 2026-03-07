import { renderHook, act } from '@testing-library/react';
import { useMap } from './use-map';

describe('useMap', () => {
  it('starts empty by default', () => {
    const { result } = renderHook(() => useMap<string, number>());
    expect(result.current.size).toBe(0);
  });

  it('accepts initial entries', () => {
    const { result } = renderHook(() =>
      useMap([['a', 1], ['b', 2]])
    );
    expect(result.current.size).toBe(2);
    expect(result.current.map.get('a')).toBe(1);
  });

  it('sets a value', () => {
    const { result } = renderHook(() => useMap<string, number>());
    act(() => result.current.set('x', 10));
    expect(result.current.map.get('x')).toBe(10);
  });

  it('removes a value', () => {
    const { result } = renderHook(() =>
      useMap([['a', 1]])
    );
    act(() => result.current.remove('a'));
    expect(result.current.size).toBe(0);
  });

  it('clears all values', () => {
    const { result } = renderHook(() =>
      useMap([['a', 1], ['b', 2]])
    );
    act(() => result.current.clear());
    expect(result.current.size).toBe(0);
  });

  it('resets to initial values', () => {
    const initial: [string, number][] = [['a', 1]];
    const { result } = renderHook(() => useMap(initial));
    act(() => result.current.set('b', 2));
    act(() => result.current.reset());
    expect(result.current.size).toBe(1);
    expect(result.current.map.get('a')).toBe(1);
  });
});
