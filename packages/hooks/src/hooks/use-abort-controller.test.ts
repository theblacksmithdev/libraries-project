import { renderHook, act } from '@testing-library/react';
import { useAbortController } from './use-abort-controller';

describe('useAbortController', () => {
  it('creates a signal', () => {
    const { result } = renderHook(() => useAbortController());
    let signal: AbortSignal;

    act(() => {
      signal = result.current.getSignal();
    });

    expect(signal!).toBeInstanceOf(AbortSignal);
    expect(signal!.aborted).toBe(false);
  });

  it('aborts the current signal', () => {
    const { result } = renderHook(() => useAbortController());
    let signal: AbortSignal;

    act(() => {
      signal = result.current.getSignal();
    });

    act(() => {
      result.current.abort();
    });

    expect(signal!.aborted).toBe(true);
  });

  it('aborts previous signal when getting a new one', () => {
    const { result } = renderHook(() => useAbortController());
    let signal1: AbortSignal;

    act(() => {
      signal1 = result.current.getSignal();
    });

    act(() => {
      result.current.getSignal();
    });

    expect(signal1!.aborted).toBe(true);
  });

  it('aborts on unmount', () => {
    const { result, unmount } = renderHook(() => useAbortController());
    let signal: AbortSignal;

    act(() => {
      signal = result.current.getSignal();
    });

    unmount();
    expect(signal!.aborted).toBe(true);
  });
});
