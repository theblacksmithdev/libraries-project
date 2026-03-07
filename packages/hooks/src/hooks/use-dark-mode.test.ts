import { renderHook, act } from '@testing-library/react';
import { useDarkMode } from './use-dark-mode';

describe('useDarkMode', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove('dark');
  });

  it('defaults to false (light mode)', () => {
    const { result } = renderHook(() => useDarkMode());
    expect(result.current.isDark).toBe(false);
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });

  it('toggles dark mode', () => {
    const { result } = renderHook(() => useDarkMode());
    act(() => result.current.toggle());
    expect(result.current.isDark).toBe(true);
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('enables dark mode', () => {
    const { result } = renderHook(() => useDarkMode());
    act(() => result.current.enable());
    expect(result.current.isDark).toBe(true);
  });

  it('disables dark mode', () => {
    const { result } = renderHook(() => useDarkMode());
    act(() => result.current.enable());
    act(() => result.current.disable());
    expect(result.current.isDark).toBe(false);
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });

  it('persists to localStorage', () => {
    const { result } = renderHook(() => useDarkMode());
    act(() => result.current.enable());
    expect(JSON.parse(localStorage.getItem('blacksmith-ui-dark-mode')!)).toBe(true);
  });

  it('reads from localStorage on init', () => {
    localStorage.setItem('blacksmith-ui-dark-mode', 'true');
    const { result } = renderHook(() => useDarkMode());
    expect(result.current.isDark).toBe(true);
  });
});
