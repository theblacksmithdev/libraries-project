import { renderHook, act } from '@testing-library/react';
import { useCounter } from './use-counter';

describe('useCounter', () => {
  it('starts at 0 by default', () => {
    const { result } = renderHook(() => useCounter());
    expect(result.current.count).toBe(0);
  });

  it('accepts an initial value', () => {
    const { result } = renderHook(() => useCounter(5));
    expect(result.current.count).toBe(5);
  });

  it('increments', () => {
    const { result } = renderHook(() => useCounter(0));
    act(() => result.current.increment());
    expect(result.current.count).toBe(1);
  });

  it('increments by custom step', () => {
    const { result } = renderHook(() => useCounter(0));
    act(() => result.current.increment(5));
    expect(result.current.count).toBe(5);
  });

  it('decrements', () => {
    const { result } = renderHook(() => useCounter(10));
    act(() => result.current.decrement());
    expect(result.current.count).toBe(9);
  });

  it('sets a specific value', () => {
    const { result } = renderHook(() => useCounter(0));
    act(() => result.current.set(42));
    expect(result.current.count).toBe(42);
  });

  it('resets to initial value', () => {
    const { result } = renderHook(() => useCounter(5));
    act(() => result.current.increment(10));
    act(() => result.current.reset());
    expect(result.current.count).toBe(5);
  });

  it('clamps to min', () => {
    const { result } = renderHook(() => useCounter(5, { min: 0 }));
    act(() => result.current.decrement(10));
    expect(result.current.count).toBe(0);
  });

  it('clamps to max', () => {
    const { result } = renderHook(() => useCounter(5, { max: 10 }));
    act(() => result.current.increment(10));
    expect(result.current.count).toBe(10);
  });
});
