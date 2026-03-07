import { renderHook, act } from '@testing-library/react';
import { useScript } from './use-script';

describe('useScript', () => {
  afterEach(() => {
    document.querySelectorAll('script[src]').forEach((s) => s.remove());
  });

  it('starts in loading state', () => {
    const { result } = renderHook(() => useScript('https://example.com/script.js'));
    expect(result.current).toBe('loading');
  });

  it('transitions to ready on load', () => {
    const { result } = renderHook(() => useScript('https://example.com/test.js'));

    const script = document.querySelector('script[src="https://example.com/test.js"]');
    expect(script).not.toBeNull();

    act(() => {
      script!.dispatchEvent(new Event('load'));
    });

    expect(result.current).toBe('ready');
  });

  it('transitions to error on failure', () => {
    const { result } = renderHook(() => useScript('https://example.com/fail.js'));

    const script = document.querySelector('script[src="https://example.com/fail.js"]');

    act(() => {
      script!.dispatchEvent(new Event('error'));
    });

    expect(result.current).toBe('error');
  });

  it('returns ready if script already exists', () => {
    const existing = document.createElement('script');
    existing.src = 'https://example.com/existing.js';
    document.body.appendChild(existing);

    const { result } = renderHook(() => useScript('https://example.com/existing.js'));
    expect(result.current).toBe('ready');
  });
});
