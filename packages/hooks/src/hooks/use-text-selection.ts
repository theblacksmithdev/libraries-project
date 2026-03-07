import { useEffect, useState } from 'react';

export function useTextSelection() {
  const [selection, setSelection] = useState('');

  useEffect(() => {
    const handler = () => {
      const sel = window.getSelection();
      setSelection(sel?.toString() ?? '');
    };

    document.addEventListener('selectionchange', handler);
    return () => document.removeEventListener('selectionchange', handler);
  }, []);

  return selection;
}
