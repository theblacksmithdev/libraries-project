import { renderHook, act } from '@testing-library/react';
import { useTextSelection } from './use-text-selection';

describe('useTextSelection', () => {
  it('starts with empty selection', () => {
    const { result } = renderHook(() => useTextSelection());
    expect(result.current).toBe('');
  });

  it('updates when selection changes', () => {
    const { result } = renderHook(() => useTextSelection());

    vi.spyOn(window, 'getSelection').mockReturnValue({
      toString: () => 'selected text',
    } as Selection);

    act(() => {
      document.dispatchEvent(new Event('selectionchange'));
    });

    expect(result.current).toBe('selected text');

    vi.restoreAllMocks();
  });
});
