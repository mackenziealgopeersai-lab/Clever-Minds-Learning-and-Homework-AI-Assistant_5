
import React from 'react';
import { Subject, AppView } from '../types';

interface DashboardProps {
  onNavigate: (view: AppView) => void;
  onSelectSubject: (subject: string) => void;
}

const subjects: Subject[] = [
  { id: 'math', name: 'Mathematics', icon: '📐', color: 'bg-blue-100 text-blue-600', description: 'Algebra, Geometry, Calculus & more' },
  { id: 'science', name: 'Science', icon: '🧪', color: 'bg-emerald-100 text-emerald-600', description: 'Biology, Physics, Chemistry' },
  { id: 'history', name: 'History', icon: '🏛️', color: 'bg-amber-100 text-amber-600', description: 'World History, Social Studies' },
  { id: 'language', name: 'Language Arts', icon: '📚', color: 'bg-purple-100 text-purple-600', description: 'Literature, Grammar, Writing' },
  { id: 'french', name: 'French', icon: '🇫🇷', color: 'bg-cyan-100 text-cyan-600', description: 'Grammar, Vocabulary, Conversation' },
  { id: 'twi', name: 'TWI', icon: '🇬🇭', color: 'bg-red-100 text-red-600', description: 'Language, Culture & Communication' },
  { id: 'vocational', name: 'Career Tech', icon: '🛠️', color: 'bg-orange-100 text-orange-600', description: 'Vocational Skills & Practical Arts' },
  { id: 'rme', name: 'RME', icon: '🕊️', color: 'bg-yellow-100 text-yellow-600', description: 'Religious and Moral Education' },
  { id: 'art', name: 'Arts', icon: '🎨', color: 'bg-rose-100 text-rose-600', description: 'History of Art, Theory, Techniques' },
  { id: 'tech', name: 'Technology', icon: '💻', color: 'bg-indigo-100 text-indigo-600', description: 'Coding, Digital Literacy' }
];

const Dashboard: React.FC<DashboardProps> = ({ onNavigate, onSelectSubject }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 animate-fade-in">
      <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-800 font-outfit mb-2">Hello, Smart Mind! 👋</h2>
          <p className="text-slate-500">What would you like to learn today?</p>
        </div>
        <div className="bg-white p-2 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-2">
           <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-lg text-sm font-bold">Lvl 1</span>
           <div className="w-32 h-2 bg-slate-100 rounded-full overflow-hidden">
             <div className="w-2/3 h-full bg-indigo-500"></div>
           </div>
           <span className="text-xs text-slate-400 font-medium">850 XP</span>
        </div>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <button 
          onClick={() => onNavigate('tutor')}
          className="col-span-1 md:col-span-2 lg:col-span-3 p-8 rounded-3xl bg-gradient-to-r from-indigo-500 to-blue-600 text-white flex flex-col md:flex-row items-center justify-between gap-8 group hover:shadow-2xl hover:shadow-indigo-200 transition-all duration-300"
        >
          <div className="text-left">
            <h3 className="text-3xl font-bold mb-3 font-outfit">Stuck on homework?</h3>
            <p className="text-indigo-100 text-lg mb-6 max-w-lg">Take a photo of your problem or type it in. Our AI tutor will help you solve it step-by-step!</p>
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-white text-indigo-600 rounded-xl font-bold group-hover:gap-4 transition-all">
              Ask Tutor Now
              <span>→</span>
            </div>
          </div>
          <div className="w-48 h-48 bg-white/20 rounded-full flex items-center justify-center animate-bounce-slow">
            <span className="text-8xl">🤖</span>
          </div>
        </button>
      </section>

      <section className="mb-12">
        <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-indigo-500 rounded-full"></span>
          Explore Subjects
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {subjects.map((sub) => (
            <div 
              key={sub.id}
              onClick={() => {
                onSelectSubject(sub.name);
                onNavigate('tutor');
              }}
              className="bg-white p-6 rounded-2xl border border-slate-100 hover:border-indigo-200 hover:shadow-lg transition-all cursor-pointer group"
            >
              <div className={`w-12 h-12 ${sub.color} rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform`}>
                {sub.icon}
              </div>
              <h4 className="font-bold text-slate-800 mb-1">{sub.name}</h4>
              <p className="text-sm text-slate-500">{sub.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-amber-500 rounded-full"></span>
          Quick Challenges
        </h3>
        <div className="bg-amber-50 border border-amber-100 p-6 rounded-2xl flex items-center justify-between">
          <div className="flex gap-4 items-center">
            <div className="bg-amber-200 p-3 rounded-xl text-3xl">⚡</div>
            <div>
              <h4 className="font-bold text-amber-900">Daily Vocabulary</h4>
              <p className="text-amber-700">Learn 5 new words in 5 minutes.</p>
            </div>
          </div>
          <button className="px-5 py-2 bg-amber-500 text-white rounded-xl font-bold hover:bg-amber-600 transition-colors">
            Start
          </button>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
