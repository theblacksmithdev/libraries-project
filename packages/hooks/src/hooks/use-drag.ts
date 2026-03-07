import { useCallback, useRef, useState } from 'react';

interface DragState {
  isDragging: boolean;
  x: number;
  y: number;
  deltaX: number;
  deltaY: number;
}

export function useDrag() {
  const [state, setState] = useState<DragState>({
    isDragging: false,
    x: 0,
    y: 0,
    deltaX: 0,
    deltaY: 0,
  });
  const startRef = useRef({ x: 0, y: 0 });

  const onMouseDown = useCallback((e: React.MouseEvent | MouseEvent) => {
    startRef.current = { x: e.clientX, y: e.clientY };
    setState({ isDragging: true, x: e.clientX, y: e.clientY, deltaX: 0, deltaY: 0 });

    const onMouseMove = (moveEvent: MouseEvent) => {
      setState({
        isDragging: true,
        x: moveEvent.clientX,
        y: moveEvent.clientY,
        deltaX: moveEvent.clientX - startRef.current.x,
        deltaY: moveEvent.clientY - startRef.current.y,
      });
    };

    const onMouseUp = () => {
      setState((s) => ({ ...s, isDragging: false }));
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }, []);

  return { ...state, onMouseDown };
}
