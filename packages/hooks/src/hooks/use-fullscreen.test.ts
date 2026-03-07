import { renderHook, act } from '@testing-library/react';
import { useFullscreen } from './use-fullscreen';

describe('useFullscreen', () => {
  it('starts as not fullscreen', () => {
    const { result } = renderHook(() => useFullscreen<HTMLDivElement>());
    expect(result.current.isFullscreen).toBe(false);
  });

  it('returns a ref', () => {
    const { result } = renderHook(() => useFullscreen<HTMLDivElement>());
    expect(result.current.ref).toBeDefined();
  });

  it('updates on fullscreenchange event', () => {
    const { result } = renderHook(() => useFullscreen<HTMLDivElement>());

    Object.defineProperty(document, 'fullscreenElement', {
      value: document.createElement('div'),
      writable: true,
      configurable: true,
    });

    act(() => {
      document.dispatchEvent(new Event('fullscreenchange'));
    });

    expect(result.current.isFullscreen).toBe(true);

    Object.defineProperty(document, 'fullscreenElement', {
      value: null,
      writable: true,
      configurable: true,
    });

    act(() => {
      document.dispatchEvent(new Event('fullscreenchange'));
    });

    expect(result.current.isFullscreen).toBe(false);
  });
});
