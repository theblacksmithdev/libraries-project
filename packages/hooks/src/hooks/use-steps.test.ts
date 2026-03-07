import { renderHook, act } from '@testing-library/react';
import { useSteps } from './use-steps';

describe('useSteps', () => {
  it('starts at step 0 by default', () => {
    const { result } = renderHook(() => useSteps(5));
    expect(result.current.currentStep).toBe(0);
    expect(result.current.isFirst).toBe(true);
    expect(result.current.isLast).toBe(false);
  });

  it('accepts an initial step', () => {
    const { result } = renderHook(() => useSteps(5, 2));
    expect(result.current.currentStep).toBe(2);
  });

  it('goes to next step', () => {
    const { result } = renderHook(() => useSteps(3));
    act(() => result.current.next());
    expect(result.current.currentStep).toBe(1);
  });

  it('does not exceed total steps', () => {
    const { result } = renderHook(() => useSteps(2));
    act(() => result.current.next());
    act(() => result.current.next());
    act(() => result.current.next());
    expect(result.current.currentStep).toBe(1);
    expect(result.current.isLast).toBe(true);
  });

  it('goes to previous step', () => {
    const { result } = renderHook(() => useSteps(3, 2));
    act(() => result.current.prev());
    expect(result.current.currentStep).toBe(1);
  });

  it('does not go below 0', () => {
    const { result } = renderHook(() => useSteps(3));
    act(() => result.current.prev());
    expect(result.current.currentStep).toBe(0);
    expect(result.current.isFirst).toBe(true);
  });

  it('goes to a specific step', () => {
    const { result } = renderHook(() => useSteps(5));
    act(() => result.current.goTo(3));
    expect(result.current.currentStep).toBe(3);
  });

  it('clamps goTo within bounds', () => {
    const { result } = renderHook(() => useSteps(5));
    act(() => result.current.goTo(10));
    expect(result.current.currentStep).toBe(4);
    act(() => result.current.goTo(-5));
    expect(result.current.currentStep).toBe(0);
  });

  it('resets to initial step', () => {
    const { result } = renderHook(() => useSteps(5, 1));
    act(() => result.current.goTo(4));
    act(() => result.current.reset());
    expect(result.current.currentStep).toBe(1);
  });
});
