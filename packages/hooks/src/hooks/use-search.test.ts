import { renderHook, act } from '@testing-library/react';
import { useSearch } from './use-search';

describe('useSearch', () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  const items = ['apple', 'banana', 'cherry', 'apricot'];
  const filterFn = (item: string, query: string) =>
    item.toLowerCase().includes(query.toLowerCase());

  it('returns all items initially', () => {
    const { result } = renderHook(() => useSearch(items, filterFn));
    expect(result.current.filteredItems).toEqual(items);
    expect(result.current.query).toBe('');
  });

  it('filters items after debounce', () => {
    const { result } = renderHook(() => useSearch(items, filterFn, 200));

    act(() => result.current.setQuery('ap'));
    expect(result.current.filteredItems).toEqual(items); // not yet debounced

    act(() => vi.advanceTimersByTime(200));
    expect(result.current.filteredItems).toEqual(['apple', 'apricot']);
  });

  it('returns all items when query is cleared', () => {
    const { result } = renderHook(() => useSearch(items, filterFn, 200));

    act(() => result.current.setQuery('ban'));
    act(() => vi.advanceTimersByTime(200));
    expect(result.current.filteredItems).toEqual(['banana']);

    act(() => result.current.setQuery(''));
    act(() => vi.advanceTimersByTime(200));
    expect(result.current.filteredItems).toEqual(items);
  });
});
