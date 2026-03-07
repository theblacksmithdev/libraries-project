import { useLayoutEffect } from 'react';
import { useIsomorphicLayoutEffect } from './use-isomorphic-layout-effect';

describe('useIsomorphicLayoutEffect', () => {
  it('uses useLayoutEffect in browser environment', () => {
    expect(useIsomorphicLayoutEffect).toBe(useLayoutEffect);
  });
});
