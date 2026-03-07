import { useEffect, useState } from 'react';

type ScriptStatus = 'loading' | 'ready' | 'error';

export function useScript(src: string): ScriptStatus {
  const [status, setStatus] = useState<ScriptStatus>(() => {
    if (typeof document === 'undefined') return 'loading';
    const existing = document.querySelector(`script[src="${src}"]`);
    if (existing) return 'ready';
    return 'loading';
  });

  useEffect(() => {
    const existing = document.querySelector(`script[src="${src}"]`);
    if (existing) {
      setStatus('ready');
      return;
    }

    const script = document.createElement('script');
    script.src = src;
    script.async = true;

    const handleLoad = () => setStatus('ready');
    const handleError = () => setStatus('error');

    script.addEventListener('load', handleLoad);
    script.addEventListener('error', handleError);
    document.body.appendChild(script);

    return () => {
      script.removeEventListener('load', handleLoad);
      script.removeEventListener('error', handleError);
    };
  }, [src]);

  return status;
}
