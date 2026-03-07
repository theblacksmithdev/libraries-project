import { renderHook } from '@testing-library/react';
import { useIsClient } from './use-is-client';

describe('useIsClient', () => {
  it('returns true in browser environment after mount', () => {
    const { result } = renderHook(() => useIsClient());
    expect(result.current).toBe(true);
  });
});
