import { useGlobalState } from '@/app/data/GlobalStateProvider';
import { useEffect, useState } from 'react';

export default function useHideCard(isComplete: boolean) {
  const { showCompleted } = useGlobalState();
  const [hidden, setHidden] = useState(false);
  const [opacity, setOpacity] = useState(1);

  const hide = () => {
    setOpacity(0);
    setTimeout(() => {
      setHidden(true);
    }, 500);
  };

  const show = () => {
    setHidden(false);
    setOpacity(isComplete ? 0.5 : 1);
  };

  useEffect(() => {
    if (showCompleted === false && isComplete) {
      hide();
    } else {
      show();
    }
  }, [showCompleted, isComplete]);

  return { hidden, opacity };
}
