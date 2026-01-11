
import React from 'react';

interface WelcomeScreenProps {
  onStart: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-blue-500 to-purple-600 flex flex-col items-center justify-center p-6 text-white overflow-hidden relative">
      {/* Decorative blobs */}
      <div className="absolute top-0 -left-20 w-72 h-72 bg-white opacity-10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 -right-20 w-96 h-96 bg-indigo-200 opacity-10 rounded-full blur-3xl"></div>

      <div className="z-10 text-center max-w-2xl animate-fade-in-up">
        <div className="mb-8 flex justify-center">
          <div className="bg-white p-4 rounded-3xl shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-300">
            <svg className="w-16 h-16 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold font-outfit mb-6 tracking-tight">
          Clever <span className="text-indigo-200">Minds</span>
        </h1>
        
        <p className="text-xl md:text-2xl mb-10 text-indigo-50 opacity-90 leading-relaxed">
          The AI-powered friend that helps you master any subject, from math homework to history mysteries.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={onStart}
            className="px-10 py-4 bg-white text-indigo-600 rounded-2xl font-bold text-lg shadow-xl hover:bg-indigo-50 transform hover:-translate-y-1 transition-all"
          >
            Start Learning
          </button>
          <button className="px-10 py-4 bg-transparent border-2 border-white/30 hover:border-white/60 rounded-2xl font-semibold text-lg transition-all">
            See How It Works
          </button>
        </div>

        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 opacity-70">
          <div className="flex flex-col items-center">
            <span className="text-3xl mb-1">🧮</span>
            <span className="text-sm font-medium">Math Master</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-3xl mb-1">🔬</span>
            <span className="text-sm font-medium">Science Pro</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-3xl mb-1">✍️</span>
            <span className="text-sm font-medium">Writing Hero</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-3xl mb-1">🌎</span>
            <span className="text-sm font-medium">History Buff</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
