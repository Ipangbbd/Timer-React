export type TimerMode = 'countdown' | 'stopwatch';

export interface TimerProps {
  /** Initial minutes for countdown mode */
  initialMinutes?: number;
  /** Initial seconds for countdown mode */
  initialSeconds?: number;
  /** Maximum time in seconds for stopwatch mode (0 means unlimited) */
  maxTimeSeconds?: number;
  /** Timer mode: countdown or stopwatch */
  mode?: TimerMode;
  /** Custom class for the timer container */
  className?: string;
  /** Whether to play sound on completion */
  playSound?: boolean;
  /** Whether to show progress indicator */
  showProgress?: boolean;
  /** Color for the timer when running */
  runningColor?: string;
  /** Color for the timer when paused */
  pausedColor?: string;
  /** Color for the timer when completed */
  completedColor?: string;
  /** Callback when timer completes */
  onComplete?: () => void;
}

export interface TimerDisplayProps {
  minutes: number;
  seconds: number;
  isRunning: boolean;
  isPaused: boolean;
  isCompleted: boolean;
  progress: number;
  showProgress: boolean;
  runningColor: string;
  pausedColor: string;
  completedColor: string;
}

export interface TimerControlsProps {
  isRunning: boolean;
  isPaused: boolean;
  isCompleted: boolean;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  onStop: () => void;
  mode: TimerMode;
}

export interface TimeInputProps {
  minutes: number;
  seconds: number;
  onMinutesChange: (value: number) => void;
  onSecondsChange: (value: number) => void;
  disabled: boolean;
}

export interface UseTimerProps {
  initialMinutes?: number;
  initialSeconds?: number;
  maxTimeSeconds?: number;
  mode?: TimerMode;
  onComplete?: () => void;
}

export interface UseTimerReturn {
  minutes: number;
  seconds: number;
  totalSeconds: number;
  isRunning: boolean;
  isPaused: boolean;
  isCompleted: boolean;
  progress: number;
  start: () => void;
  pause: () => void;
  reset: () => void;
  stop: () => void;
  setTime: (minutes: number, seconds: number) => void;
}