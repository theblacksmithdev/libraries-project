import { renderHook } from '@testing-library/react';
import { useEventListener } from './use-event-listener';

describe('useEventListener', () => {
  it('listens to window events', () => {
    const handler = vi.fn();
    renderHook(() => useEventListener('click', handler));

    window.dispatchEvent(new MouseEvent('click'));
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it('listens to element events via ref', () => {
    const handler = vi.fn();
    const el = document.createElement('div');
    document.body.appendChild(el);
    const ref = { current: el };

    renderHook(() => useEventListener('click', handler, ref));

    el.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    expect(handler).toHaveBeenCalledTimes(1);

    document.body.removeChild(el);
  });

  it('cleans up on unmount', () => {
    const handler = vi.fn();
    const { unmount } = renderHook(() => useEventListener('click', handler));

    unmount();
    window.dispatchEvent(new MouseEvent('click'));
    expect(handler).not.toHaveBeenCalled();
  });

  it('uses the latest handler without re-attaching', () => {
    const handler1 = vi.fn();
    const handler2 = vi.fn();

    const { rerender } = renderHook(
      ({ handler }) => useEventListener('click', handler),
      { initialProps: { handler: handler1 } }
    );

    rerender({ handler: handler2 });
    window.dispatchEvent(new MouseEvent('click'));

    expect(handler1).not.toHaveBeenCalled();
    expect(handler2).toHaveBeenCalledTimes(1);
  });
});
