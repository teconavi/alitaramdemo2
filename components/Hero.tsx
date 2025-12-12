import React, { useContext, useState } from 'react';
import { AppContext } from '../App';
import Glass from './Glass';

const Hero: React.FC = () => {
  const { startChatWithMessage } = useContext(AppContext);
  const [heroInput, setHeroInput] = useState('');

  const handleHeroSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if(heroInput.trim()) {
          startChatWithMessage(heroInput);
          setHeroInput('');
      }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-start/10 rounded-full blur-[120px] animate-pulse-glow"></div>
      </div>

      <div className="max-w-4xl mx-auto px-6 w-full relative z-10 flex flex-col items-center text-center">
        
        {/* Status Badge */}
        <div className="animate-slide-up opacity-0" style={{ animationDelay: '0.1s' }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-start opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-primary-start"></span>
                </span>
                <span className="text-xs font-medium text-gray-300 tracking-wide uppercase">Clinical System Active • 24/7 Support</span>
            </div>
        </div>

        {/* Main Headline */}
        <h1 className="animate-slide-up opacity-0 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-6 leading-[1.1] tracking-tight" style={{ animationDelay: '0.2s' }}>
           What can we help you <br />
           <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-start to-primary-end text-glow">
              move better
           </span> today?
        </h1>

        <p className="animate-slide-up opacity-0 text-lg md:text-xl text-gray-400 max-w-2xl mb-12 font-light leading-relaxed" style={{ animationDelay: '0.3s' }}>
           Describe your condition or need below. Our specialist system will analyze your requirements and recommend the perfect medical-grade solution instantly.
        </p>

        {/* The "Brain" Input */}
        <div className="w-full max-w-2xl animate-slide-up opacity-0 perspective-[1000px]" style={{ animationDelay: '0.4s' }}>
            <Glass intensity="medium" className="p-2 pl-4 flex items-center gap-4 border-white/20 bg-black/50 shadow-[0_0_50px_rgba(0,220,130,0.15)] hover:shadow-[0_0_80px_rgba(0,220,130,0.25)] transition-shadow duration-500 focus-within:border-primary-start/50 focus-within:ring-1 focus-within:ring-primary-start/50">
                <div className="w-6 h-6 text-primary-start animate-pulse">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2a10 10 0 1 0 10 10H12V2z"></path><path d="M12 2a10 10 0 0 1 10 10"></path><path d="M12 22a10 10 0 0 1-10-10"></path></svg>
                </div>
                <form onSubmit={handleHeroSubmit} className="flex-grow flex">
                    <input 
                        type="text"
                        value={heroInput}
                        onChange={(e) => setHeroInput(e.target.value)}
                        className="w-full bg-transparent border-none text-white placeholder-gray-500 text-lg py-4 focus:ring-0"
                        placeholder="e.g. 'My dad needs help getting out of the bath'..."
                        autoFocus
                    />
                    <button type="submit" className="bg-primary-start hover:bg-primary-end text-black font-bold p-4 rounded-xl transition-all hover:scale-105 active:scale-95">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                    </button>
                </form>
            </Glass>

            {/* Suggestions */}
            <div className="flex justify-center gap-3 mt-6 flex-wrap">
                {['Hip Surgery Recovery', 'Bathroom Safety', 'Wheelchair Ramps'].map((tag, i) => (
                    <button 
                       key={tag}
                       onClick={() => startChatWithMessage(`I'm looking for solutions for ${tag}`)}
                       className="px-4 py-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-xs font-medium text-gray-400 hover:text-white transition-all hover:-translate-y-1"
                       style={{ animationDelay: `${0.5 + (i * 0.1)}s` }}
                    >
                       {tag}
                    </button>
                ))}
            </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;