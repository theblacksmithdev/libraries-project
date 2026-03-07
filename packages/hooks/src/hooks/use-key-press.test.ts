import { renderHook } from '@testing-library/react';
import { useKeyPress } from './use-key-press';

describe('useKeyPress', () => {
  it('calls handler when the target key is pressed', () => {
    const handler = vi.fn();
    renderHook(() => useKeyPress('Enter', handler));

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it('does not call handler for other keys', () => {
    const handler = vi.fn();
    renderHook(() => useKeyPress('Enter', handler));

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    expect(handler).not.toHaveBeenCalled();
  });

  it('supports keyup event', () => {
    const handler = vi.fn();
    renderHook(() => useKeyPress('Escape', handler, { event: 'keyup' }));

    window.dispatchEvent(new KeyboardEvent('keyup', { key: 'Escape' }));
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it('can be disabled', () => {
    const handler = vi.fn();
    renderHook(() => useKeyPress('Enter', handler, { enabled: false }));

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    expect(handler).not.toHaveBeenCalled();
  });

  it('cleans up on unmount', () => {
    const handler = vi.fn();
    const { unmount } = renderHook(() => useKeyPress('Enter', handler));

    unmount();
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    expect(handler).not.toHaveBeenCalled();
  });
});
