import { renderHook, act } from '@testing-library/react';
import { useCopyToClipboard } from './use-copy-to-clipboard';

describe('useCopyToClipboard', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn().mockResolvedValue(undefined),
      },
    });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('starts with idle status', () => {
    const { result } = renderHook(() => useCopyToClipboard());
    expect(result.current.status).toBe('idle');
  });

  it('copies text and sets copied status', async () => {
    const { result } = renderHook(() => useCopyToClipboard());

    await act(async () => {
      await result.current.copy('hello');
    });

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('hello');
    expect(result.current.status).toBe('copied');
  });

  it('resets to idle after delay', async () => {
    const { result } = renderHook(() => useCopyToClipboard(1000));

    await act(async () => {
      await result.current.copy('hello');
    });

    expect(result.current.status).toBe('copied');

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(result.current.status).toBe('idle');
  });

  it('sets error status on failure', async () => {
    (navigator.clipboard.writeText as ReturnType<typeof vi.fn>).mockRejectedValueOnce(
      new Error('fail')
    );

    const { result } = renderHook(() => useCopyToClipboard());

    await act(async () => {
      await result.current.copy('hello');
    });

    expect(result.current.status).toBe('error');
  });
});
