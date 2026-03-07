# @blacksmith-ui/hooks

A collection of 75 production-ready React hooks for common UI patterns, state management, DOM interactions, async operations, and more.

## Installation

```bash
npm install @blacksmith-ui/hooks
```

or with Yarn:

```bash
yarn add @blacksmith-ui/hooks
```

## Features

- **SSR-safe** — all hooks that access browser APIs guard against `window`/`document` being undefined
- **TypeScript-first** — fully typed with generics where appropriate
- **Zero dependencies** — only requires React as a peer dependency
- **Tree-shakeable** — import only what you use

## Quick Start

```tsx
import { useToggle, useLocalStorage, useDebounce } from '@blacksmith-ui/hooks';

function App() {
  const [isOpen, { toggle }] = useToggle(false);
  const [theme, setTheme] = useLocalStorage('theme', 'light');
  const debouncedSearch = useDebounce(searchTerm, 300);

  // ...
}
```

## Hooks

### State & Data (13)

| Hook | Description |
|------|-------------|
| `useToggle` | Boolean state with `toggle`, `on`, `off` actions |
| `useDisclosure` | Open/close/toggle state for modals, drawers, etc. |
| `useCounter` | Numeric counter with optional min/max clamping |
| `useList` | Array state with push, remove, update, insert, filter, clear |
| `useMap` | Map state with set, remove, clear helpers |
| `useSet` | Set state with add, remove, toggle, has, clear helpers |
| `useHistoryState` | State with undo/redo history |
| `useDefault` | State that falls back to a default when set to null/undefined |
| `useQueue` | FIFO queue data structure |
| `useStack` | LIFO stack data structure |
| `useLocalStorage` | Persist state to localStorage with JSON serialization |
| `useSessionStorage` | Persist state to sessionStorage with JSON serialization |
| `useUncontrolled` | Controlled/uncontrolled component pattern helper |

### Values & Memoization (8)

| Hook | Description |
|------|-------------|
| `useDebounce` | Debounce a value with configurable delay |
| `useDebouncedCallback` | Debounce a callback function |
| `useThrottle` | Throttle a value with configurable interval |
| `useThrottledCallback` | Throttle a callback function |
| `usePrevious` | Track the previous value of a variable |
| `useLatest` | Ref that always points to the latest value |
| `useConst` | Compute a value once and return it on every render |
| `useSyncedRef` | Keep a ref synchronized with the latest value |

### DOM & Browser (19)

| Hook | Description |
|------|-------------|
| `useClickOutside` | Detect clicks outside a ref element |
| `useEventListener` | Attach event listeners to window or elements |
| `useElementSize` | Track element width/height via ResizeObserver |
| `useHover` | Track mouse hover state |
| `useKeyPress` | Listen for a specific key press |
| `useKeyCombo` | Listen for key + modifier combinations |
| `useLongPress` | Detect long press gestures |
| `useFullscreen` | Manage the Fullscreen API |
| `useTextSelection` | Track currently selected text |
| `useFocusWithin` | Track whether focus is inside a container |
| `useFocusTrap` | Trap Tab/Shift+Tab focus within a container |
| `useBoundingClientRect` | Track element bounding rect via ResizeObserver |
| `useSwipe` | Detect touch swipe direction |
| `useDrag` | Track mouse drag with position and delta |
| `useElementVisibility` | Check if an element is in the viewport |
| `useScrollPosition` | Track window scroll position |
| `useScrollLock` | Lock/unlock body scroll |
| `useMutationObserver` | Observe DOM mutations |
| `useIntersectionObserver` | Observe element intersection with viewport |

### Timers & Lifecycle (9)

| Hook | Description |
|------|-------------|
| `useInterval` | setInterval wrapper with pause support |
| `useTimeout` | setTimeout wrapper with manual clear |
| `useCountdown` | Countdown timer with start/pause/reset |
| `useStopwatch` | Stopwatch with lap support |
| `useIdleTimer` | Detect user idle time |
| `useUpdateEffect` | useEffect that skips the initial render |
| `useIsomorphicLayoutEffect` | SSR-safe useLayoutEffect |
| `useIsMounted` | Check if component is currently mounted |
| `useIsFirstRender` | Check if this is the first render |

### Async & Network (9)

| Hook | Description |
|------|-------------|
| `useFetch` | Declarative data fetching with loading/error states |
| `useAsync` | Execute async functions with status tracking |
| `useScript` | Dynamically load external scripts |
| `useWebSocket` | WebSocket connection with auto-reconnect |
| `useSSE` | Server-Sent Events (EventSource) wrapper |
| `usePolling` | Poll an async function at a fixed interval |
| `useAbortController` | Manage AbortController lifecycle |
| `useRetry` | Retry async operations with exponential backoff |
| `useSearch` | Filter arrays with debounced search |

### Browser APIs (12)

| Hook | Description |
|------|-------------|
| `useMediaQuery` | Reactive CSS media query matching |
| `useDarkMode` | Dark mode toggle (`.dark` class on documentElement) |
| `useColorScheme` | Detect system color scheme preference |
| `useCopyToClipboard` | Copy text to clipboard with status feedback |
| `useOnline` | Track network connectivity |
| `useWindowSize` | Track window dimensions |
| `usePageVisibility` | Detect page visibility state |
| `usePageLeave` | Detect when the user leaves the page |
| `useFavicon` | Dynamically change the favicon |
| `useReducedMotion` | Respect prefers-reduced-motion |
| `useBreakpoint` | Responsive breakpoint detection |
| `useIsClient` | SSR-safe client-side detection |

### Layout & UI (5)

| Hook | Description |
|------|-------------|
| `useStickyHeader` | Detect when header should be sticky |
| `useVirtualList` | Virtualized list rendering for large datasets |
| `useInfiniteScroll` | Infinite scroll with threshold detection |
| `useCollapse` | Collapse/expand animation with prop getters |
| `useSteps` | Multi-step flow navigation |

## Documentation

Full API reference with usage examples is available at the documentation site. Run it locally:

```bash
yarn docs
```

## Peer Dependencies

```json
{
  "react": ">=17.0.0",
  "react-dom": ">=17.0.0"
}
```

## License

MIT
