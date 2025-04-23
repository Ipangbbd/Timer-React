import React, { useState, useEffect } from 'react';
import { useTimer } from './useTimer';
import TimerDisplay from './TimerDisplay';
import TimerControls from './TimerControls';
import TimeInput from './TimeInput';
import { TimerProps, TimerMode } from './types';

/**
 * A reusable timer component that can function as either a countdown timer or stopwatch.
 */
const Timer: React.FC<TimerProps> = ({
  initialMinutes = 0,
  initialSeconds = 0,
  maxTimeSeconds = 0,
  mode = 'countdown',
  className = '',
  playSound = true,
  showProgress = true,
  runningColor = '#3B82F6', // blue-500
  pausedColor = '#6B7280',  // gray-500
  completedColor = '#10B981', // green-500
  onComplete,
}) => {
  // State for input values (separate from actual timer state)
  const [inputMinutes, setInputMinutes] = useState(initialMinutes);
  const [inputSeconds, setInputSeconds] = useState(initialSeconds);
  const [modeState, setModeState] = useState<TimerMode>(mode);
  
  // Initialize timer with custom hook
  const timer = useTimer({
    initialMinutes,
    initialSeconds,
    maxTimeSeconds,
    mode: modeState,
    onComplete: () => {
      // Play sound when timer completes
      if (playSound) {
        try {
          const audio = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-correct-answer-tone-2870.mp3');
          audio.play();
        } catch (error) {
          console.error('Failed to play completion sound:', error);
        }
      }
      
      // Call external onComplete callback
      if (onComplete) {
        onComplete();
      }
    }
  });
  
  // Update timer when input values change
  const handleApplyTime = () => {
    if (!timer.isRunning) {
      timer.setTime(inputMinutes, inputSeconds);
    }
  };
  
  // Update input state when timer is reset
  useEffect(() => {
    if (!timer.isRunning && !timer.isPaused) {
      setInputMinutes(timer.minutes);
      setInputSeconds(timer.seconds);
    }
  }, [timer.isRunning, timer.isPaused, timer.minutes, timer.seconds]);
  
  // Toggle between countdown and stopwatch modes
  const toggleMode = () => {
    const newMode = modeState === 'countdown' ? 'stopwatch' : 'countdown';
    setModeState(newMode);
    
    // Reset timer when switching modes
    timer.reset();
    
    // For countdown, we need to set the time again
    if (newMode === 'countdown') {
      timer.setTime(inputMinutes, inputSeconds);
    }
  };
  
  return (
    <div className={`bg-white rounded-xl shadow-lg p-6 w-full max-w-md mx-auto ${className}`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">
          {modeState === 'countdown' ? 'Countdown Timer' : 'Stopwatch'}
        </h2>
        
        {/* Mode Toggle */}
        <button 
          onClick={toggleMode}
          className="text-sm px-3 py-1 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
        >
          Switch to {modeState === 'countdown' ? 'Stopwatch' : 'Countdown'}
        </button>
      </div>
      
      {/* Display current time */}
      <div className="flex justify-center mb-2">
        <TimerDisplay
          minutes={timer.minutes}
          seconds={timer.seconds}
          isRunning={timer.isRunning}
          isPaused={timer.isPaused}
          isCompleted={timer.isCompleted}
          progress={timer.progress}
          showProgress={showProgress}
          runningColor={runningColor}
          pausedColor={pausedColor}
          completedColor={completedColor}
        />
      </div>
      
      {/* Time Input (only for countdown mode) */}
      {modeState === 'countdown' && (
        <div className="flex flex-col items-center">
          <TimeInput
            minutes={inputMinutes}
            seconds={inputSeconds}
            onMinutesChange={setInputMinutes}
            onSecondsChange={setInputSeconds}
            disabled={timer.isRunning}
          />
          
          {/* Apply Button */}
          <button
            onClick={handleApplyTime}
            disabled={timer.isRunning}
            className={`
              mb-4 px-4 py-1 text-sm rounded-full
              ${timer.isRunning 
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                : 'bg-gray-200 hover:bg-gray-300 text-gray-700'}
              transition-all duration-200
            `}
          >
            Apply Time
          </button>
        </div>
      )}
      
      {/* Max time display for stopwatch mode */}
      {modeState === 'stopwatch' && maxTimeSeconds > 0 && (
        <div className="text-center mb-4 text-sm text-gray-600">
          Max time: {Math.floor(maxTimeSeconds / 60)}:{(maxTimeSeconds % 60).toString().padStart(2, '0')}
        </div>
      )}
      
      {/* Controls */}
      <TimerControls
        isRunning={timer.isRunning}
        isPaused={timer.isPaused}
        isCompleted={timer.isCompleted}
        onStart={timer.start}
        onPause={timer.pause}
        onReset={timer.reset}
        onStop={timer.stop}
        mode={modeState}
      />
      
      {/* Completion message */}
      {timer.isCompleted && (
        <div className="mt-4 text-center p-2 bg-green-100 text-green-800 rounded-lg animate-pulse">
          Timer completed!
        </div>
      )}
    </div>
  );
};

export default Timer;