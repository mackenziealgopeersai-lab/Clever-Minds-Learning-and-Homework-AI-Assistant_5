
import React, { useState } from 'react';
import WelcomeScreen from './components/WelcomeScreen';
import Dashboard from './components/Dashboard';
import ChatInterface from './components/ChatInterface';
import { AppView } from './types';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>('welcome');
  const [selectedSubject, setSelectedSubject] = useState<string | undefined>();

  const handleStart = () => {
    setView('dashboard');
  };

  const handleNavigate = (newView: AppView) => {
    setView(newView);
    if (newView !== 'tutor') {
      setSelectedSubject(undefined);
    }
  };

  const handleSelectSubject = (subject: string) => {
    setSelectedSubject(subject);
    setView('tutor');
  };

  return (
    <div className="min-h-screen font-sans selection:bg-indigo-100">
      {view === 'welcome' && <WelcomeScreen onStart={handleStart} />}
      
      {view !== 'welcome' && (
        <div className="flex flex-col h-screen overflow-hidden">
          {/* Main Content Area */}
          <main className="flex-1 overflow-y-auto bg-slate-50 relative">
            {view === 'dashboard' && (
              <Dashboard 
                onNavigate={handleNavigate} 
                onSelectSubject={handleSelectSubject}
              />
            )}
            
            {view === 'tutor' && (
              <div className="h-full bg-white">
                <ChatInterface 
                  initialSubject={selectedSubject}
                  onBack={() => setView('dashboard')} 
                />
              </div>
            )}
          </main>

          {/* Persistent Navbar for Dashboard/Explorer */}
          {view === 'dashboard' && (
            <nav className="bg-white border-t border-slate-100 px-6 py-4 flex justify-around items-center shrink-0">
              <button 
                onClick={() => setView('dashboard')}
                className={`flex flex-col items-center gap-1 ${view === 'dashboard' ? 'text-indigo-600' : 'text-slate-400'}`}
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" /></svg>
                <span className="text-[10px] font-bold uppercase tracking-wider">Home</span>
              </button>
              
              <button 
                onClick={() => setView('tutor')}
                className={`flex flex-col items-center gap-1 ${view === 'tutor' ? 'text-indigo-600' : 'text-slate-400'}`}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
                <span className="text-[10px] font-bold uppercase tracking-wider">Tutor</span>
              </button>

              <button 
                className={`flex flex-col items-center gap-1 text-slate-400 opacity-50 cursor-not-allowed`}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                <span className="text-[10px] font-bold uppercase tracking-wider">Stats</span>
              </button>

              <button 
                className={`flex flex-col items-center gap-1 text-slate-400 opacity-50 cursor-not-allowed`}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                <span className="text-[10px] font-bold uppercase tracking-wider">Profile</span>
              </button>
            </nav>
          )}
        </div>
      )}
      
      <style>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slide-in {
          from { opacity: 0; transform: translateX(-10px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-fade-in-up { animation: fade-in-up 0.8s ease-out forwards; }
        .animate-fade-in { animation: fade-in 0.5s ease-out forwards; }
        .animate-slide-in { animation: slide-in 0.3s ease-out forwards; }
        .animate-bounce-slow { animation: bounce-slow 3s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

export default App;
