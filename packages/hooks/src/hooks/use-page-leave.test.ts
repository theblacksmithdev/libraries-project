import { renderHook } from '@testing-library/react';
import { usePageLeave } from './use-page-leave';

describe('usePageLeave', () => {
  it('calls handler when mouse leaves page (clientY <= 0)', () => {
    const handler = vi.fn();
    renderHook(() => usePageLeave(handler));

    document.dispatchEvent(new MouseEvent('mouseleave', { clientY: -1 }));
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it('does not call handler when mouse stays in page', () => {
    const handler = vi.fn();
    renderHook(() => usePageLeave(handler));

    document.dispatchEvent(new MouseEvent('mouseleave', { clientY: 100 }));
    expect(handler).not.toHaveBeenCalled();
  });

  it('cleans up on unmount', () => {
    const handler = vi.fn();
    const { unmount } = renderHook(() => usePageLeave(handler));

    unmount();
    document.dispatchEvent(new MouseEvent('mouseleave', { clientY: -1 }));
    expect(handler).not.toHaveBeenCalled();
  });
});
