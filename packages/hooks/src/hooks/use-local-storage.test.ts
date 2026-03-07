import { renderHook, act } from '@testing-library/react';
import { useLocalStorage } from './use-local-storage';

describe('useLocalStorage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('returns the initial value when nothing is stored', () => {
    const { result } = renderHook(() => useLocalStorage('key', 'default'));
    expect(result.current[0]).toBe('default');
  });

  it('returns the stored value if present', () => {
    localStorage.setItem('key', JSON.stringify('stored'));
    const { result } = renderHook(() => useLocalStorage('key', 'default'));
    expect(result.current[0]).toBe('stored');
  });

  it('updates the value and localStorage', () => {
    const { result } = renderHook(() => useLocalStorage('key', 'default'));
    act(() => result.current[1]('new value'));
    expect(result.current[0]).toBe('new value');
    expect(JSON.parse(localStorage.getItem('key')!)).toBe('new value');
  });

  it('supports functional updates', () => {
    const { result } = renderHook(() => useLocalStorage('count', 0));
    act(() => result.current[1]((prev) => prev + 1));
    expect(result.current[0]).toBe(1);
  });

  it('removes the value', () => {
    const { result } = renderHook(() => useLocalStorage('key', 'default'));
    act(() => result.current[1]('stored'));
    act(() => result.current[2]());
    expect(result.current[0]).toBe('default');
    expect(localStorage.getItem('key')).toBeNull();
  });

  it('handles objects', () => {
    const { result } = renderHook(() =>
      useLocalStorage('obj', { a: 1, b: 2 })
    );
    act(() => result.current[1]({ a: 3, b: 4 }));
    expect(result.current[0]).toEqual({ a: 3, b: 4 });
  });
});
