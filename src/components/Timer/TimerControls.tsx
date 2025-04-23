import React from 'react';
import { Play, Pause, RotateCcw, Square } from 'lucide-react';
import { TimerControlsProps } from './types';

const TimerControls: React.FC<TimerControlsProps> = ({
  isRunning,
  isPaused,
  isCompleted,
  onStart,
  onPause,
  onReset,
  onStop,
  mode,
}) => {
  return (
    <div className="flex justify-center gap-3 mt-4">
      {/* Start/Pause Button */}
      {!isRunning ? (
        <button
          onClick={onStart}
          disabled={mode === 'countdown' && isCompleted}
          className={`
            px-4 py-2 flex items-center gap-2 rounded-full 
            ${isCompleted && mode === 'countdown' 
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
              : 'bg-green-500 text-white hover:bg-green-600 active:bg-green-700'}
            transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500
          `}
        >
          <Play size={16} /> 
          {isPaused ? 'Resume' : 'Start'}
        </button>
      ) : (
        <button
          onClick={onPause}
          className="px-4 py-2 flex items-center gap-2 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 active:bg-yellow-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-500"
        >
          <Pause size={16} /> Pause
        </button>
      )}

      {/* Reset Button */}
      <button
        onClick={onReset}
        className="px-4 py-2 flex items-center gap-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 active:bg-blue-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <RotateCcw size={16} /> Reset
      </button>

      {/* Stop Button */}
      <button
        onClick={onStop}
        disabled={!isRunning && !isPaused && mode === 'countdown'}
        className={`
          px-4 py-2 flex items-center gap-2 rounded-full
          ${!isRunning && !isPaused && mode === 'countdown'
            ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
            : 'bg-red-500 text-white hover:bg-red-600 active:bg-red-700'}
          transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500
        `}
      >
        <Square size={16} /> Stop
      </button>
    </div>
  );
};

export default TimerControls;