---
sidebar_position: 1
title: Introduction
description: Get started with @blacksmith-ui/hooks — 75 production-ready React hooks.
---

# Introduction

**@blacksmith-ui/hooks** is a collection of 75 production-ready React hooks designed for real-world applications. Every hook is:

- **SSR-safe** — checks for `window`/`document` before accessing browser APIs
- **TypeScript-first** — fully typed with generics where appropriate
- **Lightweight** — zero dependencies beyond React
- **Tree-shakeable** — import only what you use

## Installation

```bash
npm install @blacksmith-ui/hooks
```

or with Yarn:

```bash
yarn add @blacksmith-ui/hooks
```

## Quick Start

```tsx
import { useToggle, useLocalStorage, useDebounce } from '@blacksmith-ui/hooks';

function App() {
  const [isOpen, { toggle }] = useToggle(false);
  const [theme, setTheme] = useLocalStorage('theme', 'light');
  const debouncedSearch = useDebounce(searchTerm, 300);

  return (
    <div>
      <button onClick={toggle}>{isOpen ? 'Close' : 'Open'}</button>
      <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        Toggle Theme
      </button>
    </div>
  );
}
```

## Peer Dependencies

```json
{
  "react": ">=17.0.0",
  "react-dom": ">=17.0.0"
}
```

## Categories

| Category | Count | Description |
|----------|-------|-------------|
| [State & Data](/docs/hooks/state-data/use-toggle) | 13 | Toggle, disclosure, counters, lists, maps, storage |
| [Values & Memoization](/docs/hooks/values-memoization/use-debounce) | 8 | Debounce, throttle, previous values, refs |
| [DOM & Browser](/docs/hooks/dom-browser/use-click-outside) | 19 | Click outside, hover, keyboard, gestures, observers |
| [Timers & Lifecycle](/docs/hooks/timers-lifecycle/use-interval) | 9 | Intervals, timeouts, countdowns, mount lifecycle |
| [Async & Network](/docs/hooks/async-network/use-fetch) | 9 | Fetch, WebSocket, SSE, polling, retry |
| [Browser APIs](/docs/hooks/browser-apis/use-media-query) | 12 | Media queries, dark mode, clipboard, online status |
| [Layout & UI](/docs/hooks/layout-ui/use-sticky-header) | 5 | Sticky headers, virtual lists, infinite scroll |
