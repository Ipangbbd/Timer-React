import { useState, useEffect, useRef, useCallback } from 'react';
import { TimerMode, UseTimerProps, UseTimerReturn } from './types';

/**
 * Custom hook that manages timer logic
 */
export const useTimer = ({
  initialMinutes = 0,
  initialSeconds = 0,
  maxTimeSeconds = 0,
  mode = 'countdown',
  onComplete,
}: UseTimerProps): UseTimerReturn => {
  // Calculate initial total seconds
  const initialTotalSeconds = initialMinutes * 60 + initialSeconds;
  
  // State for timer
  const [totalSeconds, setTotalSeconds] = useState<number>(initialTotalSeconds);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  
  // Ref for interval ID
  const intervalRef = useRef<number | null>(null);
  
  // Calculate minutes and seconds
  const minutes = Math.floor(Math.abs(totalSeconds) / 60);
  const seconds = Math.abs(totalSeconds) % 60;
  
  // Calculate progress (0 to 1)
  const progress = mode === 'countdown'
    ? isCompleted ? 1 : 1 - (totalSeconds / initialTotalSeconds)
    : maxTimeSeconds > 0
      ? Math.min(totalSeconds / maxTimeSeconds, 1)
      : 0;

  // Timer tick function
  const tick = useCallback(() => {
    setTotalSeconds(prev => {
      // For countdown mode
      if (mode === 'countdown') {
        // If we're at 0 or below, timer is complete
        if (prev <= 0) {
          setIsRunning(false);
          setIsCompleted(true);
          if (onComplete) onComplete();
          if (intervalRef.current) {
            window.clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
          return 0;
        }
        return prev - 1;
      } 
      // For stopwatch mode
      else {
        const newValue = prev + 1;
        // If we've reached the max time, stop the timer
        if (maxTimeSeconds > 0 && newValue >= maxTimeSeconds) {
          setIsRunning(false);
          setIsCompleted(true);
          if (onComplete) onComplete();
          if (intervalRef.current) {
            window.clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
          return maxTimeSeconds;
        }
        return newValue;
      }
    });
  }, [mode, maxTimeSeconds, onComplete]);

  // Start the timer
  const start = useCallback(() => {
    // Don't start if already completed
    if (isCompleted) return;
    
    // Don't start if already running
    if (isRunning) return;

    // Don't start countdown if at 0
    if (mode === 'countdown' && totalSeconds <= 0) return;
    
    setIsRunning(true);
    setIsPaused(false);
    
    // Set up interval
    intervalRef.current = window.setInterval(tick, 1000);
  }, [isRunning, isCompleted, totalSeconds, mode, tick]);
  
  // Pause the timer
  const pause = useCallback(() => {
    if (!isRunning) return;
    
    setIsRunning(false);
    setIsPaused(true);
    
    // Clear interval
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, [isRunning]);
  
  // Reset the timer
  const reset = useCallback(() => {
    // Clear interval
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    
    setTotalSeconds(initialTotalSeconds);
    setIsRunning(false);
    setIsPaused(false);
    setIsCompleted(false);
  }, [initialTotalSeconds]);
  
  // Stop the timer
  const stop = useCallback(() => {
    // Clear interval
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    
    setIsRunning(false);
    setIsPaused(false);
    
    // For stopwatch, we preserve the time
    // For countdown, we reset the time
    if (mode === 'countdown') {
      setTotalSeconds(initialTotalSeconds);
      setIsCompleted(false);
    }
  }, [initialTotalSeconds, mode]);

  // Set custom time
  const setTime = useCallback((minutes: number, seconds: number) => {
    if (isRunning) return;
    
    const newTotalSeconds = Math.max(0, minutes * 60 + seconds);
    setTotalSeconds(newTotalSeconds);
    setIsCompleted(false);
  }, [isRunning]);
  
  // Clean up interval on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, []);
  
  return {
    minutes,
    seconds,
    totalSeconds,
    isRunning,
    isPaused,
    isCompleted,
    progress,
    start,
    pause,
    reset,
    stop,
    setTime,
  };
};