import { renderHook, act } from '@testing-library/react';
import { useSessionStorage } from './use-session-storage';

describe('useSessionStorage', () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  it('returns the initial value when nothing is stored', () => {
    const { result } = renderHook(() => useSessionStorage('key', 'default'));
    expect(result.current[0]).toBe('default');
  });

  it('returns the stored value if present', () => {
    sessionStorage.setItem('key', JSON.stringify('stored'));
    const { result } = renderHook(() => useSessionStorage('key', 'default'));
    expect(result.current[0]).toBe('stored');
  });

  it('updates the value and sessionStorage', () => {
    const { result } = renderHook(() => useSessionStorage('key', 'default'));
    act(() => result.current[1]('new value'));
    expect(result.current[0]).toBe('new value');
    expect(JSON.parse(sessionStorage.getItem('key')!)).toBe('new value');
  });

  it('supports functional updates', () => {
    const { result } = renderHook(() => useSessionStorage('count', 0));
    act(() => result.current[1]((prev) => prev + 1));
    expect(result.current[0]).toBe(1);
  });

  it('removes the value', () => {
    const { result } = renderHook(() => useSessionStorage('key', 'default'));
    act(() => result.current[1]('stored'));
    act(() => result.current[2]());
    expect(result.current[0]).toBe('default');
    expect(sessionStorage.getItem('key')).toBeNull();
  });
});
