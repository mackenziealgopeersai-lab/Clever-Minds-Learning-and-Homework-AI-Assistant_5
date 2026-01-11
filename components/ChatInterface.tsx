
import React, { useState, useRef, useEffect } from 'react';
import { Message } from '../types';
import { getTutorResponse } from '../services/geminiService';

interface ChatInterfaceProps {
  initialSubject?: string;
  onBack: () => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ initialSubject, onBack }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (initialSubject) {
      handleSend(`I'd like to learn about ${initialSubject}.`);
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSend = async (customText?: string) => {
    const textToSend = customText || input;
    if (!textToSend.trim() && !image) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: textToSend,
      timestamp: Date.now(),
      attachments: image ? [image] : undefined
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setImage(null);
    setIsLoading(true);

    try {
      const history = messages.map(m => ({ role: m.role, content: m.content }));
      const base64Data = image ? image.split(',')[1] : undefined;
      
      const response = await getTutorResponse(textToSend, history, base64Data);
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.text,
        timestamp: Date.now(),
        groundingSources: response.sources
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error(error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "Oops! I hit a snag. Let's try that again.",
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-white">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 shrink-0">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-slate-50 rounded-lg text-slate-500">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div>
            <h3 className="font-bold text-slate-800 flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              AI Tutor
            </h3>
            <p className="text-xs text-slate-400">Always active & ready to help</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="p-2 text-slate-400 hover:text-indigo-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" /></svg>
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6">
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center max-w-sm mx-auto animate-fade-in">
             <div className="w-24 h-24 bg-indigo-50 rounded-full flex items-center justify-center text-5xl mb-6">🤖</div>
             <h4 className="text-xl font-bold text-slate-800 mb-2">I'm Your Clever Tutor</h4>
             <p className="text-slate-500">Ask me anything about math, science, history, or even upload a photo of your homework!</p>
          </div>
        )}
        
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-slide-in`}>
            <div className={`max-w-[85%] md:max-w-[70%] rounded-2xl p-4 shadow-sm ${
              msg.role === 'user' 
                ? 'bg-indigo-600 text-white' 
                : 'bg-slate-50 text-slate-800 border border-slate-100'
            }`}>
              {msg.attachments && msg.attachments.length > 0 && (
                <div className="mb-3">
                  <img src={msg.attachments[0]} alt="Attachment" className="max-h-60 rounded-lg border border-white/20" />
                </div>
              )}
              <div className="whitespace-pre-wrap leading-relaxed text-sm md:text-base">
                {msg.content}
              </div>
              
              {msg.groundingSources && msg.groundingSources.length > 0 && (
                <div className="mt-4 pt-4 border-t border-slate-200">
                  <p className="text-[10px] uppercase font-bold text-slate-400 mb-2">Sources</p>
                  <div className="flex flex-wrap gap-2">
                    {msg.groundingSources.map((source, i) => (
                      <a 
                        key={i} 
                        href={source.uri} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-[11px] px-2 py-1 bg-white border border-slate-200 rounded-md text-indigo-600 hover:bg-indigo-50 transition-colors truncate max-w-[150px]"
                      >
                        {source.title}
                      </a>
                    ))}
                  </div>
                </div>
              )}
              
              <div className={`mt-2 text-[10px] opacity-50 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start animate-pulse">
            <div className="bg-slate-50 rounded-2xl p-4 flex gap-2 items-center text-slate-400">
               <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
               <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
               <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
               <span className="text-sm ml-2">Tutor is thinking...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 md:p-6 border-t border-slate-100 shrink-0">
        {image && (
          <div className="mb-3 relative inline-block">
            <img src={image} className="w-20 h-20 object-cover rounded-xl border-2 border-indigo-100 shadow-md" alt="Preview" />
            <button 
              onClick={() => setImage(null)}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-lg hover:bg-red-600 transition-colors"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
        )}
        
        <div className="flex gap-2 items-end">
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            className="hidden" 
            accept="image/*"
          />
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="p-3 bg-slate-100 text-slate-500 rounded-xl hover:bg-slate-200 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
          </button>
          
          <div className="flex-1 relative">
            <textarea 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Ask a question or describe your homework..."
              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all resize-none max-h-32 text-slate-800"
              rows={1}
            />
          </div>

          <button 
            disabled={isLoading || (!input.trim() && !image)}
            onClick={() => handleSend()}
            className="p-4 bg-indigo-600 text-white rounded-2xl hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-indigo-200"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
