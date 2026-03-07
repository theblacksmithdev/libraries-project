---
sidebar_label: useSearch
title: useSearch
description: Filters a list of items by a debounced search query using a custom filter function.
---

# useSearch

Filters a list of items by a debounced search query using a custom filter function.

## Import

```tsx
import { useSearch } from '@blacksmith-ui/hooks';
```

## Usage

```tsx
interface User {
  id: number;
  name: string;
  email: string;
}

function UserList({ users }: { users: User[] }) {
  const { query, setQuery, debouncedQuery, filteredItems } = useSearch<User>(
    users,
    (user, q) =>
      user.name.toLowerCase().includes(q.toLowerCase()) ||
      user.email.toLowerCase().includes(q.toLowerCase()),
    300
  );

  return (
    <div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search users..."
      />
      {debouncedQuery && (
        <p>{filteredItems.length} results for "{debouncedQuery}"</p>
      )}
      <ul>
        {filteredItems.map((user) => (
          <li key={user.id}>
            {user.name} ({user.email})
          </li>
        ))}
      </ul>
    </div>
  );
}
```

## API Reference

### Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `items` | `T[]` | - | The array of items to filter. |
| `filterFn` | `(item: T, query: string) => boolean` | - | A predicate function called for each item with the debounced query. Return `true` to include the item. |
| `delay` | `number` | `300` | Debounce delay in milliseconds before the query triggers filtering. |

### Return Value

| Property | Type | Description |
|----------|------|-------------|
| `query` | `string` | The current raw (un-debounced) search query. |
| `setQuery` | `(query: string) => void` | Setter to update the search query (typically wired to an input's `onChange`). |
| `debouncedQuery` | `string` | The debounced version of the query, updated after the specified delay. |
| `filteredItems` | `T[]` | The filtered array of items matching the debounced query. Returns all items when the debounced query is empty. |

## Notes

- When the debounced query is an empty string, all items are returned (no filtering is applied).
- The filtering is performed via `useMemo`, so `filteredItems` is only recalculated when `items`, `debouncedQuery`, or `filterFn` change.
- This hook uses `useDebounce` internally for debouncing the query string.
- The `filterFn` should be memoized with `useCallback` if defined inline to avoid unnecessary re-filtering on every render.
- This hook is designed for client-side filtering. For server-side search, use `useFetch` or `useAsync` with a debounced query.

## Related Hooks

- [useFetch](./use-fetch.md) - For server-side search by passing a debounced query to an API endpoint.
- [useAsync](./use-async.md) - For triggering server-side search on demand.
