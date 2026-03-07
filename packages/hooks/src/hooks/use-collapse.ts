import { useCallback, useRef, useState } from 'react';

export function useCollapse(defaultOpen = false) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const contentRef = useRef<HTMLElement | null>(null);

  const toggle = useCallback(() => setIsOpen((v) => !v), []);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  const getCollapseProps = useCallback(() => {
    return {
      ref: contentRef,
      style: {
        overflow: 'hidden' as const,
        height: isOpen ? 'auto' : '0px',
        transition: 'height 200ms ease',
      },
      'aria-hidden': !isOpen,
    };
  }, [isOpen]);

  const getToggleProps = useCallback(() => {
    return {
      onClick: toggle,
      'aria-expanded': isOpen,
    };
  }, [isOpen, toggle]);

  return { isOpen, toggle, open, close, getCollapseProps, getToggleProps };
}
