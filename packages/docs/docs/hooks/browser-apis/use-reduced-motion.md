---
sidebar_label: useReducedMotion
title: useReducedMotion
description: Detects whether the user has requested reduced motion via their OS accessibility settings.
---

# useReducedMotion

Detects whether the user has requested reduced motion via their OS accessibility settings.

## Import

```tsx
import { useReducedMotion } from '@blacksmith-ui/hooks';
```

## Usage

```tsx
function AnimatedCard({ children }: { children: React.ReactNode }) {
  const prefersReduced = useReducedMotion();

  return (
    <div
      style={{
        transition: prefersReduced ? 'none' : 'transform 0.3s ease',
      }}
    >
      {children}
    </div>
  );
}
```

```tsx
function HeroSection() {
  const prefersReduced = useReducedMotion();

  return (
    <section>
      {prefersReduced ? <StaticHero /> : <AnimatedHero />}
    </section>
  );
}
```

## API Reference

### Parameters

This hook takes no parameters.

### Return Value

| Type      | Description                                                                  |
|-----------|------------------------------------------------------------------------------|
| `boolean` | `true` if the user prefers reduced motion, `false` otherwise.                |

## Notes

- Matches the `(prefers-reduced-motion: reduce)` media query and updates reactively if the user changes the setting.
- On the server (`typeof window === 'undefined'`), defaults to `false`.
- Use this hook to disable or simplify animations and transitions for users with motion sensitivities or vestibular disorders.
- This is an accessibility best practice -- consider using it alongside any non-trivial animations in your application.

## Related Hooks

- [`useMediaQuery`](./use-media-query.md) -- subscribe to arbitrary media queries.
- [`useColorScheme`](./use-color-scheme.md) -- detect the user's preferred color scheme.
