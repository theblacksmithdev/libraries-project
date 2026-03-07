import { renderHook, act } from '@testing-library/react';
import { useDisclosure } from './use-disclosure';

describe('useDisclosure', () => {
  it('defaults to closed', () => {
    const { result } = renderHook(() => useDisclosure());
    expect(result.current.isOpen).toBe(false);
  });

  it('accepts an initial open state', () => {
    const { result } = renderHook(() => useDisclosure(true));
    expect(result.current.isOpen).toBe(true);
  });

  it('opens', () => {
    const { result } = renderHook(() => useDisclosure());
    act(() => result.current.open());
    expect(result.current.isOpen).toBe(true);
  });

  it('closes', () => {
    const { result } = renderHook(() => useDisclosure(true));
    act(() => result.current.close());
    expect(result.current.isOpen).toBe(false);
  });

  it('toggles', () => {
    const { result } = renderHook(() => useDisclosure());
    act(() => result.current.toggle());
    expect(result.current.isOpen).toBe(true);
    act(() => result.current.toggle());
    expect(result.current.isOpen).toBe(false);
  });
});
