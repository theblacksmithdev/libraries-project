import { renderHook, act } from '@testing-library/react';
import { useOnline } from './use-online';

describe('useOnline', () => {
  it('returns true when online', () => {
    Object.defineProperty(navigator, 'onLine', { value: true, writable: true });
    const { result } = renderHook(() => useOnline());
    expect(result.current).toBe(true);
  });

  it('updates when going offline', () => {
    Object.defineProperty(navigator, 'onLine', { value: true, writable: true });
    const { result } = renderHook(() => useOnline());

    act(() => {
      window.dispatchEvent(new Event('offline'));
    });
    expect(result.current).toBe(false);
  });

  it('updates when going online', () => {
    Object.defineProperty(navigator, 'onLine', { value: false, writable: true });
    const { result } = renderHook(() => useOnline());

    act(() => {
      window.dispatchEvent(new Event('online'));
    });
    expect(result.current).toBe(true);
  });
});
