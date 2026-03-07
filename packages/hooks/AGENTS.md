# @blacksmith-ui/hooks — AI Reference

> 74 production-ready React hooks for state, DOM, async, timers, and browser APIs.
> Zero dependencies. SSR-safe. TypeScript-first. Tree-shakeable.

## Installation

```bash
npm install @blacksmith-ui/hooks
# or
yarn add @blacksmith-ui/hooks
```

**Peer dependencies:** `react ^18.0.0 || ^19.0.0`, `react-dom ^18.0.0 || ^19.0.0`

## Import Pattern

```tsx
import { useToggle, useLocalStorage, useDebounce } from '@blacksmith-ui/hooks';
```

All hooks are named exports from the package root. Import only what you need — the package is tree-shakeable.

---

## Hook API Reference

### State & Data

#### `useToggle(initialValue?: boolean)`
Boolean state with action helpers.
```tsx
const [isOpen, { toggle, on, off }] = useToggle(false);
```
Returns: `[value: boolean, { toggle: () => void, on: () => void, off: () => void }]`

#### `useDisclosure(initialValue?: boolean)`
Open/close/toggle state for modals, drawers, etc.
```tsx
const { isOpen, open, close, toggle } = useDisclosure(false);
```
Returns: `{ isOpen: boolean, open: () => void, close: () => void, toggle: () => void }`

#### `useCounter(initialValue?: number, options?: { min?: number, max?: number })`
Numeric counter with optional clamping.
```tsx
const { count, increment, decrement, set, reset } = useCounter(0, { min: 0, max: 100 });
increment();     // +1
increment(5);    // +5
decrement();     // -1
set(50);         // set to 50
reset();         // back to initialValue
```
Returns: `{ count: number, increment: (step?: number) => void, decrement: (step?: number) => void, set: (value: number) => void, reset: () => void }`

#### `useList<T>(initialValue?: T[])`
Array state with mutation helpers.
```tsx
const [items, { push, removeAt, updateAt, insertAt, clear, filter, reset, set }] = useList<string>(['a', 'b']);
push('c');              // append
removeAt(0);            // remove by index
updateAt(1, 'updated'); // replace at index
insertAt(0, 'first');   // insert at index
filter((item) => item !== 'b'); // filter in-place
clear();                // empty array
reset();                // back to initialValue
set(['x', 'y']);        // replace entire array
```
Returns: `[list: T[], actions]`

#### `useMap<K, V>(initialValue?: Iterable<[K, V]>)`
Map state with helpers.
```tsx
const { map, set, remove, clear, reset, size } = useMap<string, number>([['a', 1]]);
set('b', 2);
remove('a');
```
Returns: `{ map: Map<K,V>, set, remove, clear, reset, size: number }`

#### `useSet<T>(initialValue?: Iterable<T>)`
Set state with helpers.
```tsx
const { set, add, remove, toggle, has, clear, reset, size } = useSet<string>(['a']);
add('b');
toggle('a');       // removes 'a' (was present)
has('b');           // true
```
Returns: `{ set: Set<T>, add, remove, toggle, has, clear, reset, size: number }`

#### `useHistoryState<T>(initialValue: T)`
State with undo/redo history.
```tsx
const { state, set, undo, redo, canUndo, canRedo, history } = useHistoryState('');
set('hello');
undo();
redo();
```
Returns: `{ state: T, set: (value: T) => void, undo, redo, canUndo: boolean, canRedo: boolean, history: T[] }`

#### `useDefault<T>(initialValue: T, defaultValue: T)`
State that falls back to default when set to null/undefined.
```tsx
const [value, setValue] = useDefault('hello', 'fallback');
setValue(null);    // value becomes 'fallback'
setValue('world'); // value becomes 'world'
```

#### `useQueue<T>(initialValue?: T[])`
FIFO queue.
```tsx
const { queue, enqueue, dequeue, peek, size, clear } = useQueue<string>();
enqueue('first');
const item = dequeue(); // 'first'
```

#### `useStack<T>(initialValue?: T[])`
LIFO stack.
```tsx
const { stack, push, pop, peek, size, clear } = useStack<number>();
push(1);
const item = pop(); // 1
```

#### `useLocalStorage<T>(key: string, initialValue: T)`
Persist state to localStorage with JSON serialization. SSR-safe. Syncs across tabs via `storage` event.
```tsx
const [theme, setTheme, removeTheme] = useLocalStorage('theme', 'light');
setTheme('dark');
setTheme((prev) => prev === 'dark' ? 'light' : 'dark'); // updater function
removeTheme(); // removes key, resets to initialValue
```
Returns: `[storedValue: T, setValue: (value: T | (prev: T) => T) => void, removeValue: () => void]`

#### `useSessionStorage<T>(key: string, initialValue: T)`
Same API as `useLocalStorage` but uses sessionStorage.

#### `useUncontrolled<T>(options: { value?: T, defaultValue: T, onChange?: (value: T) => void })`
Controlled/uncontrolled component pattern helper.
```tsx
const [value, setValue] = useUncontrolled({
  value: props.value,          // controlled value (optional)
  defaultValue: props.defaultValue,
  onChange: props.onChange,
});
```

---

### Values & Memoization

#### `useDebounce<T>(value: T, delay: number)`
Debounce a value. Returns the debounced value.
```tsx
const debouncedSearch = useDebounce(searchTerm, 300);
// debouncedSearch updates 300ms after searchTerm stops changing
```
Returns: `T`

#### `useDebouncedCallback<T extends (...args) => void>(callback: T, delay: number)`
Debounce a callback function.
```tsx
const { debouncedFn, cancel } = useDebouncedCallback(handleSearch, 300);
debouncedFn('query');
cancel(); // cancel pending invocation
```
Returns: `{ debouncedFn: (...args) => void, cancel: () => void }`

#### `useThrottle<T>(value: T, interval: number)`
Throttle a value update.
```tsx
const throttledValue = useThrottle(scrollPosition, 100);
```

#### `useThrottledCallback<T extends (...args) => void>(callback: T, interval: number)`
Throttle a callback function.
```tsx
const { throttledFn, cancel } = useThrottledCallback(handleScroll, 100);
```

#### `usePrevious<T>(value: T)`
Track the previous value. Returns `undefined` on first render.
```tsx
const prevCount = usePrevious(count);
```
Returns: `T | undefined`

#### `useLatest<T>(value: T)`
Ref that always points to the latest value. Useful for callbacks that need current values without re-creating.
```tsx
const latestCallback = useLatest(callback);
// latestCallback.current is always the latest callback
```
Returns: `React.MutableRefObject<T>`

#### `useConst<T>(fn: () => T)`
Compute a value once (on first render) and return it on every subsequent render.
```tsx
const id = useConst(() => crypto.randomUUID());
```
Returns: `T`

#### `useSyncedRef<T>(value: T)`
Keep a ref synchronized with the latest value (similar to useLatest).
```tsx
const ref = useSyncedRef(value);
```
Returns: `React.MutableRefObject<T>`

---

### DOM & Browser

#### `useClickOutside<T extends HTMLElement>(handler: () => void)`
Detect clicks outside a ref element.
```tsx
const ref = useClickOutside<HTMLDivElement>(() => setOpen(false));
return <div ref={ref}>Dropdown content</div>;
```
Returns: `RefObject<T | null>`

#### `useEventListener(eventName, handler, element?, options?)`
Attach event listeners. Defaults to `window`. Pass a ref for element-scoped events.
```tsx
// Window event
useEventListener('resize', handleResize);
// Element event
useEventListener('click', handleClick, buttonRef);
```

#### `useElementSize<T extends HTMLElement>()`
Track element width/height via ResizeObserver.
```tsx
const { ref, width, height } = useElementSize<HTMLDivElement>();
return <div ref={ref}>Size: {width}x{height}</div>;
```
Returns: `{ ref: (node: T | null) => void, width: number, height: number }`

#### `useHover<T extends HTMLElement>()`
Track mouse hover state.
```tsx
const { ref, isHovered } = useHover<HTMLDivElement>();
return <div ref={ref}>{isHovered ? 'Hovered!' : 'Hover me'}</div>;
```
Returns: `{ ref: (node: T | null) => void, isHovered: boolean }`

#### `useKeyPress(targetKey: string)`
Listen for a specific key press.
```tsx
const isEnterPressed = useKeyPress('Enter');
```
Returns: `boolean`

#### `useKeyCombo(combo: string)`
Listen for key + modifier combinations.
```tsx
const fired = useKeyCombo('ctrl+s');
const fired2 = useKeyCombo('meta+shift+k');
```
Returns: `boolean`

#### `useLongPress(callback: () => void, options?: { delay?: number })`
Detect long press gestures.
```tsx
const handlers = useLongPress(() => console.log('Long pressed!'), { delay: 500 });
return <button {...handlers}>Hold me</button>;
```
Returns: event handler props to spread on element

#### `useFullscreen<T extends HTMLElement>()`
Manage the Fullscreen API.
```tsx
const { ref, isFullscreen, enter, exit, toggle } = useFullscreen<HTMLDivElement>();
```

#### `useTextSelection()`
Track currently selected text.
```tsx
const selection = useTextSelection();
// selection.text, selection.rect, etc.
```

#### `useFocusWithin<T extends HTMLElement>()`
Track whether focus is inside a container.
```tsx
const { ref, isFocusWithin } = useFocusWithin<HTMLDivElement>();
```

#### `useFocusTrap<T extends HTMLElement>(active?: boolean)`
Trap Tab/Shift+Tab focus within a container.
```tsx
const ref = useFocusTrap<HTMLDivElement>(isModalOpen);
return <div ref={ref}>Modal content with trapped focus</div>;
```

#### `useBoundingClientRect<T extends HTMLElement>()`
Track element bounding rect via ResizeObserver.
```tsx
const { ref, rect } = useBoundingClientRect<HTMLDivElement>();
// rect.top, rect.left, rect.width, rect.height, etc.
```

#### `useSwipe(options?: { threshold?: number })`
Detect touch swipe direction.
```tsx
const { ref, direction } = useSwipe();
// direction: 'up' | 'down' | 'left' | 'right' | null
```

#### `useDrag<T extends HTMLElement>()`
Track mouse drag with position and delta.
```tsx
const { ref, isDragging, position, delta } = useDrag<HTMLDivElement>();
```

#### `useElementVisibility<T extends HTMLElement>()`
Check if an element is in the viewport.
```tsx
const { ref, isVisible } = useElementVisibility<HTMLDivElement>();
```

#### `useScrollPosition()`
Track window scroll position.
```tsx
const { x, y } = useScrollPosition();
```

#### `useScrollLock(locked?: boolean)`
Lock/unlock body scroll (useful for modals).
```tsx
useScrollLock(isModalOpen);
```

#### `useMutationObserver<T extends HTMLElement>(callback, options)`
Observe DOM mutations.
```tsx
const ref = useMutationObserver<HTMLDivElement>(
  (mutations) => console.log(mutations),
  { childList: true, subtree: true }
);
```

#### `useIntersectionObserver<T extends HTMLElement>(options?)`
Observe element intersection with viewport.
```tsx
const { ref, entry, isIntersecting } = useIntersectionObserver<HTMLDivElement>({
  threshold: 0.5,
  rootMargin: '100px',
});
```

---

### Timers & Lifecycle

#### `useInterval(callback: () => void, delay: number | null)`
setInterval wrapper. Pass `null` delay to pause.
```tsx
useInterval(() => setCount(c => c + 1), isRunning ? 1000 : null);
```

#### `useTimeout(callback: () => void, delay: number | null)`
setTimeout wrapper. Pass `null` delay to disable.
```tsx
const { clear } = useTimeout(() => setVisible(false), 3000);
```
Returns: `{ clear: () => void }`

#### `useCountdown(options: { seconds: number, interval?: number, autoStart?: boolean })`
Countdown timer with start/pause/reset.
```tsx
const { count, start, pause, reset, isRunning } = useCountdown({
  seconds: 60,
  interval: 1000,
});
```

#### `useStopwatch(options?: { autoStart?: boolean })`
Stopwatch with lap support.
```tsx
const { time, start, pause, reset, laps, lap, isRunning } = useStopwatch();
```

#### `useIdleTimer(timeout: number, onIdle: () => void)`
Detect user idle time.
```tsx
const { isIdle, reset } = useIdleTimer(30000, () => console.log('User idle'));
```

#### `useUpdateEffect(effect: EffectCallback, deps: DependencyList)`
useEffect that skips the initial render. Same signature as useEffect.
```tsx
useUpdateEffect(() => {
  console.log('value changed (not on mount)');
}, [value]);
```

#### `useIsomorphicLayoutEffect`
SSR-safe `useLayoutEffect`. Uses `useLayoutEffect` on client, `useEffect` on server.
```tsx
useIsomorphicLayoutEffect(() => { /* DOM measurement */ }, []);
```

#### `useIsMounted()`
Check if component is currently mounted. Useful for async operations.
```tsx
const isMounted = useIsMounted();
const handleAsync = async () => {
  const data = await fetchData();
  if (isMounted()) setState(data); // safe state update
};
```
Returns: `() => boolean`

#### `useIsFirstRender()`
Check if this is the first render.
```tsx
const isFirst = useIsFirstRender();
```
Returns: `boolean`

---

### Async & Network

#### `useFetch<T>(url: string, options?: UseFetchOptions)`
Declarative data fetching with loading/error states.
```tsx
const { data, error, isLoading, refetch } = useFetch<User[]>('/api/users');

// With options
const { data } = useFetch<Post>('/api/posts/1', {
  enabled: !!postId,  // conditional fetching
  headers: { Authorization: `Bearer ${token}` },
});
```
Returns: `{ data: T | null, error: Error | null, isLoading: boolean, refetch: () => Promise<void> }`

Options extend `RequestInit` with `enabled?: boolean` (default: `true`).

#### `useAsync<T, Args extends unknown[]>(asyncFn: (...args: Args) => Promise<T>)`
Execute async functions with status tracking.
```tsx
const { data, error, status, isLoading, isSuccess, isError, execute, reset } = useAsync(
  async (userId: string) => {
    const res = await fetch(`/api/users/${userId}`);
    return res.json();
  }
);

await execute('user-123');
```
Returns: `{ status: 'idle'|'pending'|'success'|'error', data: T|null, error: Error|null, isLoading, isSuccess, isError, execute: (...args) => Promise<T>, reset: () => void }`

#### `useScript(src: string, options?: { removeOnUnmount?: boolean })`
Dynamically load external scripts.
```tsx
const { loaded, error } = useScript('https://cdn.example.com/lib.js');
if (loaded) { /* script ready */ }
```

#### `useWebSocket(url: string, options?)`
WebSocket connection with auto-reconnect.
```tsx
const { sendMessage, lastMessage, readyState } = useWebSocket('wss://api.example.com/ws', {
  onOpen: () => console.log('connected'),
  onMessage: (msg) => console.log(msg),
  reconnectAttempts: 5,
  reconnectInterval: 3000,
});
```

#### `useSSE(url: string, options?)`
Server-Sent Events (EventSource) wrapper.
```tsx
const { data, error, readyState } = useSSE('/api/events', {
  onMessage: (event) => console.log(event.data),
});
```

#### `usePolling<T>(fn: () => Promise<T>, interval: number, options?)`
Poll an async function at a fixed interval.
```tsx
const { data, error, isPolling, start, stop } = usePolling(
  () => fetch('/api/status').then(r => r.json()),
  5000
);
```

#### `useAbortController()`
Manage AbortController lifecycle.
```tsx
const { signal, abort, reset } = useAbortController();
fetch('/api/data', { signal });
```

#### `useRetry<T>(fn: () => Promise<T>, options?)`
Retry async operations with exponential backoff.
```tsx
const { execute, data, error, attempts, isRetrying } = useRetry(
  () => fetch('/api/flaky').then(r => r.json()),
  { maxRetries: 3, delay: 1000, backoff: 'exponential' }
);
```

#### `useSearch<T>(items: T[], searchFn: (item: T, query: string) => boolean, options?)`
Filter arrays with debounced search.
```tsx
const { query, setQuery, results, isSearching } = useSearch(
  users,
  (user, q) => user.name.toLowerCase().includes(q.toLowerCase()),
  { debounce: 300 }
);
```

---

### Browser APIs

#### `useMediaQuery(query: string)`
Reactive CSS media query matching. SSR-safe.
```tsx
const isMobile = useMediaQuery('(max-width: 768px)');
const prefersDark = useMediaQuery('(prefers-color-scheme: dark)');
```
Returns: `boolean`

#### `useColorScheme()`
Detect system color scheme preference (no DOM manipulation).
```tsx
const scheme = useColorScheme(); // 'light' | 'dark'
```

#### `useCopyToClipboard()`
Copy text to clipboard with status feedback.
```tsx
const { copy, copied, error } = useCopyToClipboard();
<button onClick={() => copy('Hello')}>
  {copied ? 'Copied!' : 'Copy'}
</button>
```

#### `useOnline()`
Track network connectivity.
```tsx
const isOnline = useOnline();
```
Returns: `boolean`

#### `useWindowSize()`
Track window dimensions. SSR-safe.
```tsx
const { width, height } = useWindowSize();
```

#### `usePageVisibility()`
Detect page visibility state.
```tsx
const isVisible = usePageVisibility();
```

#### `usePageLeave(callback: () => void)`
Detect when the user's cursor leaves the page.
```tsx
usePageLeave(() => console.log('User might leave'));
```

#### `useFavicon(href: string)`
Dynamically change the favicon.
```tsx
useFavicon(hasNotification ? '/favicon-alert.ico' : '/favicon.ico');
```

#### `useReducedMotion()`
Respect `prefers-reduced-motion` media query.
```tsx
const prefersReducedMotion = useReducedMotion();
const animationDuration = prefersReducedMotion ? 0 : 300;
```
Returns: `boolean`

#### `useBreakpoint(breakpoints?: Record<string, string>)`
Responsive breakpoint detection.
```tsx
const breakpoint = useBreakpoint();
// breakpoint: 'sm' | 'md' | 'lg' | 'xl' | '2xl'
```

#### `useIsClient()`
SSR-safe client-side detection.
```tsx
const isClient = useIsClient();
if (isClient) { /* safe to access window/document */ }
```
Returns: `boolean`

---

### Layout & UI

#### `useStickyHeader(options?: { offset?: number })`
Detect when header should become sticky.
```tsx
const { ref, isSticky } = useStickyHeader({ offset: 100 });
return <header ref={ref} className={isSticky ? 'shadow-md' : ''}>...</header>;
```

#### `useVirtualList<T>(options: { items: T[], itemHeight: number, overscan?: number })`
Virtualized list rendering for large datasets.
```tsx
const { containerRef, virtualItems, totalHeight } = useVirtualList({
  items: largeArray,
  itemHeight: 40,
  overscan: 5,
});
```

#### `useInfiniteScroll(options: { onLoadMore: () => void, hasMore: boolean, threshold?: number })`
Infinite scroll with threshold detection.
```tsx
const { sentinelRef, isLoading } = useInfiniteScroll({
  onLoadMore: loadNextPage,
  hasMore: hasNextPage,
  threshold: 200,
});
return (
  <div>
    {items.map(item => <Item key={item.id} {...item} />)}
    <div ref={sentinelRef} />
  </div>
);
```

#### `useCollapse(options?: { defaultOpen?: boolean, duration?: number })`
Collapse/expand animation with prop getters.
```tsx
const { isOpen, toggle, getToggleProps, getCollapseProps } = useCollapse();
return (
  <>
    <button {...getToggleProps()}>Toggle</button>
    <div {...getCollapseProps()}>Collapsible content</div>
  </>
);
```

#### `useSteps(options: { totalSteps: number, initialStep?: number })`
Multi-step flow navigation.
```tsx
const { currentStep, goToStep, nextStep, prevStep, isFirst, isLast, progress } = useSteps({
  totalSteps: 4,
});
```

---

## Common Patterns

### SSR Safety
All hooks that access `window`, `document`, or browser APIs guard with `typeof window === 'undefined'` checks and return safe defaults on the server.

### Ref Callbacks vs RefObjects
- **Callback refs** (`useElementSize`, `useHover`): Return `ref: (node: T | null) => void` — pass directly as `ref` prop
- **RefObject refs** (`useClickOutside`, `useFocusTrap`): Return `RefObject<T | null>` — pass directly as `ref` prop

### Tuple vs Object Returns
- **Tuples** (`[value, actions]`): `useToggle`, `useLocalStorage`, `useList`, `useSessionStorage`
- **Objects** (`{ state, action }`): `useCounter`, `useMap`, `useSet`, `useDarkMode`, `useFetch`, `useAsync`
- **Bare values**: `useDebounce`, `useMediaQuery`, `usePrevious`, `useIsClient`

### Disabling Hooks
Hooks with intervals/timeouts accept `null` for the delay parameter to pause:
```tsx
useInterval(callback, isActive ? 1000 : null);
useTimeout(callback, shouldRun ? 3000 : null);
```

### Cleanup
All hooks properly clean up subscriptions, timers, observers, and event listeners in their `useEffect` return functions.
