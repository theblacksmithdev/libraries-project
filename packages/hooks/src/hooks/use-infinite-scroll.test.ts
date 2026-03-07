import { renderHook } from '@testing-library/react';
import { useInfiniteScroll } from './use-infinite-scroll';

describe('useInfiniteScroll', () => {
  it('returns a ref', () => {
    const { result } = renderHook(() =>
      useInfiniteScroll<HTMLDivElement>(vi.fn())
    );
    expect(result.current).toBeDefined();
    expect(result.current.current).toBeNull();
  });

  it('calls onLoadMore when scrolled near bottom', () => {
    const onLoadMore = vi.fn();
    const el = document.createElement('div');

    Object.defineProperties(el, {
      scrollTop: { value: 900, writable: true },
      scrollHeight: { value: 1000, writable: true },
      clientHeight: { value: 50, writable: true },
    });

    const { result } = renderHook(() => {
      const ref = useInfiniteScroll<HTMLDivElement>(onLoadMore, { threshold: 100 });
      (ref as React.MutableRefObject<HTMLDivElement | null>).current = el;
      return ref;
    });

    el.dispatchEvent(new Event('scroll'));
    expect(onLoadMore).toHaveBeenCalled();
  });

  it('does not call when disabled', () => {
    const onLoadMore = vi.fn();
    renderHook(() =>
      useInfiniteScroll<HTMLDivElement>(onLoadMore, { enabled: false })
    );
    expect(onLoadMore).not.toHaveBeenCalled();
  });
});
