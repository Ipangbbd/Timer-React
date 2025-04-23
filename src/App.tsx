import React, { useState } from 'react';
import Timer from './components/Timer';
import { TimerMode } from './components/Timer/types';
import { Clock, Hourglass } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState<TimerMode>('countdown');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">A Timer</h1>
        
        {/* Tab Navigation */}
        <div className="flex mb-6 border rounded-lg overflow-hidden bg-white">
          <button
            className={`flex-1 py-3 flex items-center justify-center gap-2 transition-colors ${
              activeTab === 'countdown' 
                ? 'bg-blue-500 text-white' 
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
            onClick={() => setActiveTab('countdown')}
          >
            <Hourglass size={18} /> Countdown
          </button>
          <button
            className={`flex-1 py-3 flex items-center justify-center gap-2 transition-colors ${
              activeTab === 'stopwatch' 
                ? 'bg-blue-500 text-white' 
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
            onClick={() => setActiveTab('stopwatch')}
          >
            <Clock size={18} /> Stopwatch
          </button>
        </div>
        
        {/* Timer Component */}
        {activeTab === 'countdown' && (
          <Timer 
            initialMinutes={1} 
            initialSeconds={30} 
            mode="countdown"
            onComplete={() => console.log('Timer completed!')}
          />
        )}
        
        {activeTab === 'stopwatch' && (
          <Timer 
            mode="stopwatch"
            maxTimeSeconds={180} // 3 minutes
            showProgress={true}
          />
        )}
        
      </div>
    </div>
  );
}

export default App;