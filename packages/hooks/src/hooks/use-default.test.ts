import { renderHook, act } from '@testing-library/react';
import { useDefault } from './use-default';

describe('useDefault', () => {
  it('returns the initial value', () => {
    const { result } = renderHook(() => useDefault('hello', 'fallback'));
    expect(result.current[0]).toBe('hello');
  });

  it('falls back to default when set to null', () => {
    const { result } = renderHook(() => useDefault('hello', 'fallback'));
    act(() => result.current[1](null));
    expect(result.current[0]).toBe('fallback');
  });

  it('falls back to default when set to undefined', () => {
    const { result } = renderHook(() => useDefault('hello', 'fallback'));
    act(() => result.current[1](undefined));
    expect(result.current[0]).toBe('fallback');
  });

  it('uses the set value when not null/undefined', () => {
    const { result } = renderHook(() => useDefault(0, 42));
    act(() => result.current[1](10));
    expect(result.current[0]).toBe(10);
  });
});
