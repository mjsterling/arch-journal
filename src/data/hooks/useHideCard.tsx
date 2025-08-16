'use client';
import { useCallback, useEffect, useState } from 'react';

export function useHideCard(isComplete: boolean, showCompleted: boolean) {
  const [hidden, setHidden] = useState(false);
  const [opacity, setOpacity] = useState(1);

  const hide = useCallback(() => {
    setOpacity(0);
    setTimeout(() => {
      setHidden(true);
    }, 500);
  }, [setOpacity, setHidden]);

  const show = useCallback(() => {
    setHidden(false);
    setOpacity(isComplete ? 0.5 : 1);
  }, [isComplete, setOpacity, setHidden]);

  useEffect(() => {
    if (showCompleted === false && isComplete) {
      hide();
    } else {
      show();
    }
  }, [showCompleted, isComplete, hide, show]);

  return { hidden, opacity };
}
