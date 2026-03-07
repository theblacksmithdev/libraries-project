import { renderHook } from '@testing-library/react';
import { useFocusTrap } from './use-focus-trap';

describe('useFocusTrap', () => {
  it('returns a ref', () => {
    const { result } = renderHook(() => useFocusTrap<HTMLDivElement>());
    expect(result.current).toBeDefined();
    expect(result.current.current).toBeNull();
  });

  it('does not trap when inactive', () => {
    const { result } = renderHook(() => useFocusTrap<HTMLDivElement>(false));
    expect(result.current.current).toBeNull();
  });

  it('focuses the first focusable element when active', () => {
    const container = document.createElement('div');
    const button1 = document.createElement('button');
    const button2 = document.createElement('button');
    button1.textContent = 'First';
    button2.textContent = 'Second';
    container.appendChild(button1);
    container.appendChild(button2);
    document.body.appendChild(container);

    renderHook(() => {
      const ref = useFocusTrap<HTMLDivElement>();
      (ref as React.MutableRefObject<HTMLDivElement | null>).current = container;
      return ref;
    });

    expect(document.activeElement).toBe(button1);

    document.body.removeChild(container);
  });
});
