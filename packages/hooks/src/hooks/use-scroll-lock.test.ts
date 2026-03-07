import { renderHook } from '@testing-library/react';
import { useScrollLock } from './use-scroll-lock';

describe('useScrollLock', () => {
  beforeEach(() => {
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
  });

  it('locks body scroll when true', () => {
    renderHook(() => useScrollLock(true));
    expect(document.body.style.overflow).toBe('hidden');
  });

  it('does not lock when false', () => {
    renderHook(() => useScrollLock(false));
    expect(document.body.style.overflow).toBe('');
  });

  it('restores original overflow on unmount', () => {
    document.body.style.overflow = 'auto';
    const { unmount } = renderHook(() => useScrollLock(true));
    expect(document.body.style.overflow).toBe('hidden');

    unmount();
    expect(document.body.style.overflow).toBe('auto');
  });

  it('restores when locked changes to false', () => {
    const { rerender } = renderHook(({ locked }) => useScrollLock(locked), {
      initialProps: { locked: true },
    });
    expect(document.body.style.overflow).toBe('hidden');

    rerender({ locked: false });
    expect(document.body.style.overflow).toBe('');
  });
});
