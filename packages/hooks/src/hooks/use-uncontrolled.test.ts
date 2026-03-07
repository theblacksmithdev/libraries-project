import { renderHook, act } from '@testing-library/react';
import { useUncontrolled } from './use-uncontrolled';

describe('useUncontrolled', () => {
  it('uses defaultValue in uncontrolled mode', () => {
    const { result } = renderHook(() =>
      useUncontrolled({ defaultValue: 'hello' })
    );
    expect(result.current[0]).toBe('hello');
  });

  it('updates internal state in uncontrolled mode', () => {
    const { result } = renderHook(() =>
      useUncontrolled({ defaultValue: 'a' })
    );
    act(() => result.current[1]('b'));
    expect(result.current[0]).toBe('b');
  });

  it('uses value in controlled mode', () => {
    const { result } = renderHook(() =>
      useUncontrolled({ value: 'controlled', defaultValue: 'default' })
    );
    expect(result.current[0]).toBe('controlled');
  });

  it('calls onChange in both modes', () => {
    const onChange = vi.fn();
    const { result } = renderHook(() =>
      useUncontrolled({ defaultValue: 'a', onChange })
    );
    act(() => result.current[1]('b'));
    expect(onChange).toHaveBeenCalledWith('b');
  });

  it('does not update internal state in controlled mode', () => {
    const onChange = vi.fn();
    const { result } = renderHook(() =>
      useUncontrolled({ value: 'controlled', defaultValue: 'default', onChange })
    );
    act(() => result.current[1]('new'));
    expect(result.current[0]).toBe('controlled');
    expect(onChange).toHaveBeenCalledWith('new');
  });
});
