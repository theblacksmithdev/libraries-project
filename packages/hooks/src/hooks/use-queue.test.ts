import { renderHook, act } from '@testing-library/react';
import { useQueue } from './use-queue';

describe('useQueue', () => {
  it('starts empty by default', () => {
    const { result } = renderHook(() => useQueue<number>());
    expect(result.current.size).toBe(0);
  });

  it('accepts initial values', () => {
    const { result } = renderHook(() => useQueue([1, 2, 3]));
    expect(result.current.size).toBe(3);
    expect(result.current.peek).toBe(1);
  });

  it('enqueues items', () => {
    const { result } = renderHook(() => useQueue<number>());
    act(() => result.current.enqueue(1));
    act(() => result.current.enqueue(2));
    expect(result.current.queue).toEqual([1, 2]);
  });

  it('dequeues items (FIFO)', () => {
    const { result } = renderHook(() => useQueue([1, 2, 3]));
    act(() => result.current.dequeue());
    expect(result.current.queue).toEqual([2, 3]);
    expect(result.current.peek).toBe(2);
  });

  it('clears the queue', () => {
    const { result } = renderHook(() => useQueue([1, 2]));
    act(() => result.current.clear());
    expect(result.current.size).toBe(0);
  });

  it('resets to initial value', () => {
    const { result } = renderHook(() => useQueue([1, 2]));
    act(() => result.current.enqueue(3));
    act(() => result.current.reset());
    expect(result.current.queue).toEqual([1, 2]);
  });
});
