---
sidebar_position: 2
title: Getting Started
description: Learn how to use @blacksmith-ui/hooks in your React projects.
---

# Getting Started

## How Hooks Are Organized

Hooks are grouped into **7 categories** based on what they do, not when they were added. Pick the category that matches your use case:

- **State & Data** — Managing component state (booleans, collections, storage)
- **Values & Memoization** — Controlling when and how values update (debounce, throttle, refs)
- **DOM & Browser** — Interacting with DOM elements (clicks, keyboard, gestures, observers)
- **Timers & Lifecycle** — Timing and component lifecycle (intervals, countdowns, mount state)
- **Async & Network** — Data fetching and real-time communication (fetch, WebSocket, polling)
- **Browser APIs** — Accessing browser capabilities (media queries, clipboard, visibility)
- **Layout & UI** — Building UI patterns (virtual lists, infinite scroll, collapse)

## Import Pattern

Every hook is a named export from the package root:

```tsx
import { useToggle, useDebounce, useFetch } from '@blacksmith-ui/hooks';
```

The package supports tree-shaking, so unused hooks won't be included in your bundle.

## SSR Compatibility

All hooks that access browser APIs (`window`, `document`, `localStorage`, etc.) include SSR guards. They return safe default values during server-side rendering and activate on the client.

## TypeScript

Every hook is fully typed. Many hooks accept generics for flexible typing:

```tsx
const [value, setValue] = useLocalStorage<User>('user', defaultUser);
const { data } = useFetch<ApiResponse>('/api/data');
const ref = useClickOutside<HTMLDivElement>(handleClose);
```
