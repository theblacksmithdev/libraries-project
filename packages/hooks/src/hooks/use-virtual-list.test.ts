import { renderHook } from '@testing-library/react';
import { useVirtualList } from './use-virtual-list';

describe('useVirtualList', () => {
  const items = Array.from({ length: 1000 }, (_, i) => `Item ${i}`);

  it('returns totalHeight', () => {
    const { result } = renderHook(() =>
      useVirtualList(items, { itemHeight: 40 })
    );
    expect(result.current.totalHeight).toBe(40000);
  });

  it('returns virtual items', () => {
    const { result } = renderHook(() =>
      useVirtualList(items, { itemHeight: 40, overscan: 2 })
    );

    expect(result.current.virtualItems.length).toBeGreaterThan(0);
    expect(result.current.virtualItems[0].index).toBe(0);
    expect(result.current.virtualItems[0].item).toBe('Item 0');
  });

  it('calculates correct offset', () => {
    const { result } = renderHook(() =>
      useVirtualList(items, { itemHeight: 40 })
    );

    const firstItem = result.current.virtualItems[0];
    expect(firstItem.offsetTop).toBe(0);

    if (result.current.virtualItems.length > 1) {
      expect(result.current.virtualItems[1].offsetTop).toBe(40);
    }
  });

  it('provides containerRef and onScroll', () => {
    const { result } = renderHook(() =>
      useVirtualList(items, { itemHeight: 40 })
    );
    expect(typeof result.current.containerRef).toBe('function');
    expect(typeof result.current.onScroll).toBe('function');
  });
});
