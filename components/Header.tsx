import React, { useContext, useState } from 'react';
import { AppContext } from '../App';
import Button from './Button';
import Glass from './Glass';

const Header: React.FC = () => {
  const { openConsultation, openAbout } = useContext(AppContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavClick = (action: string) => {
      setIsMenuOpen(false);
      switch(action) {
          case 'home':
              window.scrollTo({ top: 0, behavior: 'smooth' });
              break;
          case 'products':
              const el = document.getElementById('products');
              if(el) el.scrollIntoView({ behavior: 'smooth' });
              break;
          case 'about':
              openAbout();
              break;
          case 'consult':
              openConsultation();
              break;
      }
  };

  return (
    <>
      {/* Minimal Floating Header */}
      <header className="fixed top-0 left-0 right-0 z-40 p-6 flex justify-between items-center pointer-events-none">
        
        {/* Logo */}
        <div className="pointer-events-auto flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-start to-primary-end flex items-center justify-center text-black font-bold text-xl shadow-[0_0_20px_rgba(0,220,130,0.4)]">
              A
            </div>
            <span className="font-display font-bold text-xl text-white tracking-tight hidden sm:block">
              Ali<span className="text-primary-start">Taram</span>
            </span>
        </div>

        {/* Magnetic Menu Button */}
        <div className="pointer-events-auto">
            <button 
                onClick={() => setIsMenuOpen(true)}
                className="group relative flex items-center gap-3 bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 pl-5 pr-2 py-2 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]"
            >
                <span className="text-sm font-medium tracking-wide text-gray-200">MENU</span>
                <div className="w-10 h-10 rounded-full bg-primary-start text-black flex items-center justify-center shadow-lg shadow-primary-start/20 group-hover:rotate-90 transition-transform duration-300">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="12" x2="20" y2="12"></line><line x1="4" y1="6" x2="20" y2="6"></line><line x1="4" y1="18" x2="20" y2="18"></line></svg>
                </div>
            </button>
        </div>
      </header>

      {/* Full Screen Menu Drawer */}
      <div className={`fixed inset-0 z-50 transition-all duration-500 ${isMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
        
        {/* Backdrop */}
        <div 
            className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-500 ${isMenuOpen ? 'opacity-100' : 'opacity-0'}`}
            onClick={() => setIsMenuOpen(false)}
        />
        
        {/* Menu Panel */}
        <div className={`absolute inset-y-0 right-0 w-full md:w-[600px] h-[100dvh] bg-[#0A0C10] border-l border-white/10 shadow-2xl transform transition-transform duration-500 cubic-bezier(0.2, 0.8, 0.2, 1) ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
            <div className="h-full flex flex-col relative overflow-hidden">
                
                {/* Background Decor */}
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary-start/10 rounded-full blur-[100px] pointer-events-none"></div>

                {/* Close Button Header - Sticky Top */}
                <div className="flex justify-between items-center p-8 pb-0 shrink-0 relative z-10">
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Navigation</span>
                    <button onClick={() => setIsMenuOpen(false)} className="w-12 h-12 rounded-full border border-white/10 hover:bg-white/10 flex items-center justify-center text-white transition-colors">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto p-8 md:p-12 min-h-0 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        
                        {/* Left Col: Main Nav */}
                        <div className="space-y-8">
                             <button onClick={() => handleNavClick('home')} className="group block text-left w-full">
                                <span className="block text-3xl md:text-4xl font-display font-bold text-gray-400 group-hover:text-white transition-colors duration-300 group-hover:translate-x-2 transform">Home</span>
                                <span className="text-xs text-gray-600 group-hover:text-primary-start transition-colors">Back to start</span>
                             </button>
                             
                             <button onClick={() => handleNavClick('products')} className="group block text-left w-full">
                                <span className="block text-3xl md:text-4xl font-display font-bold text-gray-400 group-hover:text-white transition-colors duration-300 group-hover:translate-x-2 transform">Products</span>
                                <span className="text-xs text-gray-600 group-hover:text-primary-start transition-colors">Browse catalogue</span>
                             </button>

                             <button onClick={() => handleNavClick('about')} className="group block text-left w-full">
                                <span className="block text-3xl md:text-4xl font-display font-bold text-gray-400 group-hover:text-white transition-colors duration-300 group-hover:translate-x-2 transform">About</span>
                                <span className="text-xs text-gray-600 group-hover:text-primary-start transition-colors">Our mission & team</span>
                             </button>

                             <button onClick={() => handleNavClick('consult')} className="group block text-left w-full">
                                <span className="block text-3xl md:text-4xl font-display font-bold text-gray-400 group-hover:text-white transition-colors duration-300 group-hover:translate-x-2 transform">Consultation</span>
                                <span className="text-xs text-gray-600 group-hover:text-primary-start transition-colors">Book an expert</span>
                             </button>
                        </div>

                        {/* Right Col: Info & Contact */}
                        <div className="flex flex-col space-y-8 border-t md:border-t-0 md:border-l border-white/10 pt-8 md:pt-0 md:pl-8">
                             <div>
                                 <h4 className="text-primary-start text-sm font-bold uppercase tracking-wider mb-3">Headquarters</h4>
                                 <p className="text-gray-400 text-sm leading-relaxed">
                                     AliTaram Plaza, Suite 400<br/>
                                     Tehran, Iran<br/>
                                 </p>
                             </div>
                             
                             <div>
                                 <h4 className="text-primary-start text-sm font-bold uppercase tracking-wider mb-3">Contact</h4>
                                 <p className="text-gray-400 text-sm mb-1">+98 21 8888 0000</p>
                                 <p className="text-gray-400 text-sm">support@alitaram.com</p>
                             </div>

                             <div className="pt-4">
                                <p className="text-xs text-gray-600 mb-4">Connect with us</p>
                                <div className="flex gap-4">
                                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-white hover:text-black transition-all cursor-pointer">
                                        <span className="font-bold text-xs">IG</span>
                                    </div>
                                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-white hover:text-black transition-all cursor-pointer">
                                        <span className="font-bold text-xs">TG</span>
                                    </div>
                                </div>
                             </div>
                        </div>
                    </div>
                    
                    {/* Bottom CTA (Scrollable) */}
                    <div className="mt-12 mb-4">
                        <Glass intensity="medium" className="p-6 border-white/10 bg-white/5 flex items-center justify-between gap-4">
                            <div>
                                <h5 className="font-bold text-white mb-1">Need Advice?</h5>
                                <p className="text-xs text-gray-400">Our Clinical Specialist is online.</p>
                            </div>
                            <Button variant="primary" onClick={() => { setIsMenuOpen(false); openConsultation(); }}>
                                Book Consultation
                            </Button>
                        </Glass>
                    </div>
                </div>

            </div>
        </div>
      </div>
    </>
  );
};

export default Header;