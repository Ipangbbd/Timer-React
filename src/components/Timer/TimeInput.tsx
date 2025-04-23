import React from 'react';
import { TimeInputProps } from './types';

const TimeInput: React.FC<TimeInputProps> = ({
  minutes,
  seconds,
  onMinutesChange,
  onSecondsChange,
  disabled,
}) => {
  const handleMinutesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (isNaN(value)) {
      onMinutesChange(0);
    } else {
      onMinutesChange(Math.max(0, value));
    }
  };

  const handleSecondsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (isNaN(value)) {
      onSecondsChange(0);
    } else {
      // Keep seconds between 0 and 59
      onSecondsChange(Math.min(59, Math.max(0, value)));
    }
  };

  return (
    <div className="flex items-center gap-2 mt-3 mb-4">
      <div className="flex flex-col">
        <label htmlFor="minutes" className="text-xs text-gray-500 mb-1">Minutes</label>
        <input
          id="minutes"
          type="number"
          min="0"
          value={minutes}
          onChange={handleMinutesChange}
          disabled={disabled}
          className="w-20 px-2 py-1 border rounded text-center focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:text-gray-500"
        />
      </div>
      <span className="text-xl mt-6">:</span>
      <div className="flex flex-col">
        <label htmlFor="seconds" className="text-xs text-gray-500 mb-1">Seconds</label>
        <input
          id="seconds"
          type="number"
          min="0"
          max="59"
          value={seconds}
          onChange={handleSecondsChange}
          disabled={disabled}
          className="w-20 px-2 py-1 border rounded text-center focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:text-gray-500"
        />
      </div>
    </div>
  );
};

export default TimeInput;