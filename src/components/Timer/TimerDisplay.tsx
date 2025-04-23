import React from 'react';
import { TimerDisplayProps } from './types';

const TimerDisplay: React.FC<TimerDisplayProps> = ({
  minutes,
  seconds,
  isRunning,
  isPaused,
  isCompleted,
  progress,
  showProgress,
  runningColor,
  pausedColor,
  completedColor,
}) => {
  // Determine the current color based on timer state
  const getColor = () => {
    if (isCompleted) return completedColor;
    if (isPaused) return pausedColor;
    if (isRunning) return runningColor;
    return pausedColor;
  };

  // Format time as MM:SS
  const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  
  // Calculate the stroke offset for the progress circle
  const circumference = 2 * Math.PI * 36; // radius is 36px
  const strokeDashoffset = circumference * (1 - progress);
  
  return (
    <div className="relative flex flex-col items-center justify-center w-40 h-40">
      {/* Progress Circle */}
      {showProgress && (
        <svg className="absolute w-40 h-40" viewBox="0 0 100 100">
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r="36"
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="6"
          />
          {/* Progress circle */}
          <circle
            cx="50"
            cy="50"
            r="36"
            fill="none"
            stroke={getColor()}
            strokeWidth="6"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            transform="rotate(-90 50 50)"
            className="transition-all duration-300 ease-in-out"
          />
        </svg>
      )}
      
      {/* Timer Text */}
      <div 
        className={`text-4xl font-semibold transition-colors duration-300 z-10`}
        style={{ color: getColor() }}
      >
        {formattedTime}
      </div>
      
      {/* Status Text */}
      <div className="text-sm mt-2 text-gray-500">
        {isCompleted 
          ? "Completed" 
          : isRunning 
            ? "Running" 
            : isPaused 
              ? "Paused" 
              : "Ready"}
      </div>
    </div>
  );
};

export default TimerDisplay;