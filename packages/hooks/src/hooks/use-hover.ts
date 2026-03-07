import { useCallback, useRef, useState } from 'react';

export function useHover<T extends HTMLElement>() {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);

  const ref = useCallback(
    (node: T | null) => {
      if (hoverRef.current) {
        hoverRef.current.removeEventListener('mouseenter', handleMouseEnter);
        hoverRef.current.removeEventListener('mouseleave', handleMouseLeave);
      }

      hoverRef.current = node;

      if (node) {
        node.addEventListener('mouseenter', handleMouseEnter);
        node.addEventListener('mouseleave', handleMouseLeave);
      }
    },
    [handleMouseEnter, handleMouseLeave]
  );

  const hoverRef = useRef<T | null>(null);

  return { ref, isHovered };
}
