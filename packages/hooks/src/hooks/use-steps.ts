import { useCallback, useState } from 'react';

export function useSteps(totalSteps: number, initialStep = 0) {
  const [currentStep, setCurrentStep] = useState(initialStep);

  const next = useCallback(() => {
    setCurrentStep((s) => Math.min(s + 1, totalSteps - 1));
  }, [totalSteps]);

  const prev = useCallback(() => {
    setCurrentStep((s) => Math.max(s - 1, 0));
  }, []);

  const goTo = useCallback(
    (step: number) => {
      setCurrentStep(Math.max(0, Math.min(step, totalSteps - 1)));
    },
    [totalSteps]
  );

  const reset = useCallback(() => {
    setCurrentStep(initialStep);
  }, [initialStep]);

  return {
    currentStep,
    isFirst: currentStep === 0,
    isLast: currentStep === totalSteps - 1,
    next,
    prev,
    goTo,
    reset,
  };
}
