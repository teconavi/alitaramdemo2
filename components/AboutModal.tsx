import React from 'react';
import Glass from './Glass';

interface AboutModalProps {
  onClose: () => void;
}

const AboutModal: React.FC<AboutModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-0 md:p-8 bg-black/90 backdrop-blur-xl animate-menu-open">
        {/* Backdrop click to close */}
        <div className="absolute inset-0" onClick={onClose}></div>
        
        {/* Modal Container - Full screen mobile, centered desktop */}
        {/* We use rounded="none" as base prop, but override with md:rounded-3xl in className */}
        <Glass 
            intensity="heavy" 
            rounded="none" 
            className="w-full max-w-5xl h-[100dvh] md:h-[90vh] md:rounded-3xl relative overflow-hidden flex flex-col bg-[#0F1115] shadow-2xl border-0 md:border border-white/10"
            contentClassName="flex flex-col h-full"
        >
            
            {/* Header - Sticky */}
            <div className="p-4 md:p-6 border-b border-white/10 flex justify-between items-center bg-[#15181E] shrink-0 z-20">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-gradient-to-br from-primary-start to-primary-end flex items-center justify-center text-black font-bold text-lg shadow-lg">A</div>
                    <span className="font-display font-bold text-lg md:text-xl text-white">About <span className="text-primary-start">AliTaram</span></span>
                </div>
                <button 
                    onClick={onClose}
                    className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white transition-all hover:rotate-90 active:scale-95"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
            </div>

            {/* Content Scroll */}
            <div className="flex-1 overflow-y-auto min-h-0">
                {/* Hero Section */}
                <div className="relative h-56 md:h-80 overflow-hidden shrink-0 group">
                    <img 
                        src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2070&auto=format&fit=crop" 
                        alt="Medical Research Team" 
                        className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-[2s]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F1115] via-[#0F1115]/50 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-6 md:p-12 w-full">
                        <div className="animate-slide-up">
                             <span className="text-primary-start font-bold uppercase tracking-widest text-[10px] md:text-xs mb-2 block">Our Mission</span>
                             <h2 className="text-2xl md:text-5xl font-display font-bold text-white max-w-3xl leading-tight">
                                Restoring Independence <br className="hidden md:block"/>for Everyone.
                             </h2>
                        </div>
                    </div>
                </div>

                <div className="p-6 md:p-12 space-y-12 pb-20">
                    
                    {/* Intro Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
                         <div className="space-y-6">
                            <h3 className="text-xl md:text-2xl font-bold text-white">Who We Are</h3>
                            <p className="text-gray-400 leading-relaxed text-sm md:text-lg">
                                AliTaram is the premier intelligent rehabilitation provider in the Middle East. We bridge the critical gap between clinical assessment and home equipment delivery using AI-driven triage.
                            </p>
                            <p className="text-gray-400 leading-relaxed text-sm md:text-lg">
                                Founded by Teco, we believe that finding the right mobility aid shouldn't be complicated. We empower families with knowledge and medical-grade solutions.
                            </p>
                         </div>
                         <div className="space-y-4">
                             <div className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-primary-start/20 transition-colors group">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                                    </div>
                                    <h4 className="font-bold text-white">Innovation First</h4>
                                </div>
                                <p className="text-sm text-gray-500 leading-relaxed">
                                    We utilize advanced data analytics to match patients with the perfect equipment, reducing return rates and increasing long-term satisfaction by over 90%.
                                </p>
                             </div>
                             
                             <div className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-primary-start/20 transition-colors group">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-8 h-8 rounded-full bg-primary-start/20 text-primary-start flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    </div>
                                    <h4 className="font-bold text-white">Clinical Validation</h4>
                                </div>
                                <p className="text-sm text-gray-500 leading-relaxed">
                                    Every product in our catalogue is vetted by licensed Occupational Therapists to ensure it meets strict safety and durability standards.
                                </p>
                             </div>
                         </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            { label: 'Families Helped', value: '15k+', color: 'text-primary-start' },
                            { label: 'Smart Support', value: '24/7', color: 'text-accent-start' },
                            { label: 'Wait Time Reduced', value: '60%', color: 'text-blue-400' },
                            { label: 'Satisfaction', value: '98%', color: 'text-white' },
                        ].map((stat, i) => (
                            <div key={i} className="p-4 md:p-6 rounded-2xl bg-[#15181E] border border-white/5 text-center hover:bg-white/5 transition-colors">
                                <div className={`text-2xl md:text-4xl font-bold mb-1 ${stat.color}`}>{stat.value}</div>
                                <div className="text-[10px] md:text-xs text-gray-500 uppercase font-bold tracking-wider">{stat.label}</div>
                            </div>
                        ))}
                    </div>

                    {/* Team / Contact Mini Section */}
                    <div className="border-t border-white/10 pt-8">
                         <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
                             <div>
                                <h3 className="text-lg font-bold text-white mb-2">Join the Revolution</h3>
                                <p className="text-sm text-gray-500 max-w-md">
                                    We are always looking for passionate clinicians and engineers to join our team in Tehran.
                                </p>
                             </div>
                             <a href="#" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium transition-all hover:-translate-y-1 active:scale-95">
                                 <span>View Careers</span>
                                 <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                             </a>
                         </div>
                    </div>

                </div>
            </div>
        </Glass>
    </div>
  );
};

export default AboutModal;