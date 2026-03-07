import { useEffect } from 'react';

export function useFavicon(href: string) {
  useEffect(() => {
    const link: HTMLLinkElement =
      document.querySelector('link[rel*="icon"]') ||
      document.createElement('link');

    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.href = href;

    document.head.appendChild(link);
  }, [href]);
}
