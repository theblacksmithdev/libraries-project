import { renderHook } from '@testing-library/react';
import { useKeyCombo } from './use-key-combo';

describe('useKeyCombo', () => {
  it('fires on Ctrl+S', () => {
    const handler = vi.fn();
    renderHook(() => useKeyCombo('s', handler, { ctrl: true }));

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 's', ctrlKey: true }));
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it('does not fire without modifier', () => {
    const handler = vi.fn();
    renderHook(() => useKeyCombo('s', handler, { ctrl: true }));

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 's' }));
    expect(handler).not.toHaveBeenCalled();
  });

  it('supports Meta+Shift combo', () => {
    const handler = vi.fn();
    renderHook(() => useKeyCombo('k', handler, { meta: true, shift: true }));

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true, shiftKey: true }));
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it('can be disabled', () => {
    const handler = vi.fn();
    renderHook(() => useKeyCombo('s', handler, { ctrl: true }, false));

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 's', ctrlKey: true }));
    expect(handler).not.toHaveBeenCalled();
  });
});
