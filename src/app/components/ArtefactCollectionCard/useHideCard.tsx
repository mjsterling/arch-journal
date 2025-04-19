import { useGlobalState } from '@/app/data/GlobalStateProvider';
import { useCallback, useEffect, useState } from 'react';

export default function useHideCard(isComplete: boolean) {
  const { showCompleted } = useGlobalState();
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
