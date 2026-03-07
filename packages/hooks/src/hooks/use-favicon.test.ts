import { renderHook } from '@testing-library/react';
import { useFavicon } from './use-favicon';

describe('useFavicon', () => {
  afterEach(() => {
    document.querySelectorAll('link[rel*="icon"]').forEach((el) => el.remove());
  });

  it('creates a favicon link element', () => {
    renderHook(() => useFavicon('/favicon.ico'));

    const link = document.querySelector('link[rel="shortcut icon"]') as HTMLLinkElement;
    expect(link).not.toBeNull();
    expect(link.href).toContain('/favicon.ico');
  });

  it('updates existing favicon', () => {
    const existing = document.createElement('link');
    existing.rel = 'shortcut icon';
    existing.href = '/old.ico';
    document.head.appendChild(existing);

    renderHook(() => useFavicon('/new.ico'));

    const links = document.querySelectorAll('link[rel="shortcut icon"]');
    expect(links.length).toBe(1);
    expect((links[0] as HTMLLinkElement).href).toContain('/new.ico');
  });
});
