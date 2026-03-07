import { renderHook, act } from '@testing-library/react';
import { useFocusWithin } from './use-focus-within';

describe('useFocusWithin', () => {
  it('starts as not focused', () => {
    const { result } = renderHook(() => useFocusWithin<HTMLDivElement>());
    expect(result.current.isFocusWithin).toBe(false);
  });

  it('detects focus within container', () => {
    const { result } = renderHook(() => useFocusWithin<HTMLDivElement>());

    const container = document.createElement('div');
    const input = document.createElement('input');
    container.appendChild(input);
    document.body.appendChild(container);

    act(() => result.current.ref(container));

    act(() => {
      container.dispatchEvent(new FocusEvent('focusin', { bubbles: true }));
    });

    expect(result.current.isFocusWithin).toBe(true);

    document.body.removeChild(container);
  });

  it('detects focus leaving container', () => {
    const { result } = renderHook(() => useFocusWithin<HTMLDivElement>());

    const container = document.createElement('div');
    const outside = document.createElement('input');
    document.body.appendChild(container);
    document.body.appendChild(outside);

    act(() => result.current.ref(container));

    act(() => {
      container.dispatchEvent(new FocusEvent('focusin', { bubbles: true }));
    });

    act(() => {
      container.dispatchEvent(
        new FocusEvent('focusout', { bubbles: true, relatedTarget: outside })
      );
    });

    expect(result.current.isFocusWithin).toBe(false);

    document.body.removeChild(container);
    document.body.removeChild(outside);
  });
});
