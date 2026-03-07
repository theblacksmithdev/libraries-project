import { renderHook, act } from '@testing-library/react';
import { useHistoryState } from './use-history-state';

describe('useHistoryState', () => {
  it('starts with initial value', () => {
    const { result } = renderHook(() => useHistoryState('a'));
    expect(result.current.state).toBe('a');
    expect(result.current.canUndo).toBe(false);
    expect(result.current.canRedo).toBe(false);
  });

  it('sets new values', () => {
    const { result } = renderHook(() => useHistoryState('a'));
    act(() => result.current.set('b'));
    expect(result.current.state).toBe('b');
  });

  it('undoes changes', () => {
    const { result } = renderHook(() => useHistoryState('a'));
    act(() => result.current.set('b'));
    act(() => result.current.set('c'));

    act(() => result.current.undo());
    expect(result.current.state).toBe('b');

    act(() => result.current.undo());
    expect(result.current.state).toBe('a');
    expect(result.current.canUndo).toBe(false);
  });

  it('redoes changes', () => {
    const { result } = renderHook(() => useHistoryState('a'));
    act(() => result.current.set('b'));
    act(() => result.current.undo());

    expect(result.current.canRedo).toBe(true);
    act(() => result.current.redo());
    expect(result.current.state).toBe('b');
    expect(result.current.canRedo).toBe(false);
  });

  it('clears future on new set after undo', () => {
    const { result } = renderHook(() => useHistoryState('a'));
    act(() => result.current.set('b'));
    act(() => result.current.set('c'));
    act(() => result.current.undo());
    act(() => result.current.set('d'));

    expect(result.current.canRedo).toBe(false);
    act(() => result.current.undo());
    expect(result.current.state).toBe('b');
  });

  it('clears history', () => {
    const { result } = renderHook(() => useHistoryState('a'));
    act(() => result.current.set('b'));
    act(() => result.current.clear());
    expect(result.current.state).toBe('a');
    expect(result.current.canUndo).toBe(false);
  });
});
