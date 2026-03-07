import { renderHook } from '@testing-library/react';
import { useClickOutside } from './use-click-outside';

describe('useClickOutside', () => {
  it('calls handler when clicking outside the ref element', () => {
    const handler = vi.fn();
    const { result } = renderHook(() => useClickOutside<HTMLDivElement>(handler));

    const inside = document.createElement('div');
    document.body.appendChild(inside);
    Object.defineProperty(result.current, 'current', {
      value: inside,
      writable: true,
    });

    const outside = document.createElement('div');
    document.body.appendChild(outside);

    outside.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
    expect(handler).toHaveBeenCalledTimes(1);

    document.body.removeChild(inside);
    document.body.removeChild(outside);
  });

  it('does not call handler when clicking inside the ref element', () => {
    const handler = vi.fn();
    const { result } = renderHook(() => useClickOutside<HTMLDivElement>(handler));

    const el = document.createElement('div');
    document.body.appendChild(el);
    Object.defineProperty(result.current, 'current', {
      value: el,
      writable: true,
    });

    el.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
    expect(handler).not.toHaveBeenCalled();

    document.body.removeChild(el);
  });

  it('does not call handler when ref is null', () => {
    const handler = vi.fn();
    renderHook(() => useClickOutside<HTMLDivElement>(handler));

    document.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
    expect(handler).not.toHaveBeenCalled();
  });
});
