import { renderHook, act } from '@testing-library/react';
import { usePageVisibility } from './use-page-visibility';

describe('usePageVisibility', () => {
  it('returns true when visible', () => {
    Object.defineProperty(document, 'hidden', { value: false, writable: true, configurable: true });
    const { result } = renderHook(() => usePageVisibility());
    expect(result.current).toBe(true);
  });

  it('updates when visibility changes', () => {
    Object.defineProperty(document, 'hidden', { value: false, writable: true, configurable: true });
    const { result } = renderHook(() => usePageVisibility());

    act(() => {
      Object.defineProperty(document, 'hidden', { value: true, writable: true, configurable: true });
      document.dispatchEvent(new Event('visibilitychange'));
    });

    expect(result.current).toBe(false);
  });
});
