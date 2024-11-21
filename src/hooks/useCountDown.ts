import { useState, useEffect, useCallback } from 'react';

interface UseCountDownReturn {
  countdown: number;
  startCountdown: () => void;
  resetCountdown: () => void;
}

export const useCountDown = (initialTime: number): UseCountDownReturn => {
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [countdown]);

  const startCountdown = useCallback(() => {
    setCountdown(initialTime);
  }, [initialTime]);

  const resetCountdown = useCallback(() => {
    setCountdown(0);
  }, []);

  return {
    countdown,
    startCountdown,
    resetCountdown,
  };
}; 