import React from 'react';
import Glass from './Glass';
import Button from './Button';
import { MOCK_PRODUCTS } from '../constants';

interface ProductDetailModalProps {
  productId: string;
  onClose: () => void;
  onConsult: () => void;
  fromChat?: boolean;
}

const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ productId, onClose, onConsult, fromChat = false }) => {
  const product = MOCK_PRODUCTS.find(p => p.id === productId);

  if (!product) return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-0 md:p-6 bg-black/90 backdrop-blur-xl animate-menu-open">
        {/* Background Click to Close */}
        <div className="absolute inset-0" onClick={onClose}></div>

        {/* Modal Container */}
        <Glass 
            intensity="heavy" 
            className="w-full max-w-6xl h-[100dvh] md:h-[90vh] overflow-hidden relative shadow-2xl border-white/10 rounded-none md:rounded-3xl bg-[#0F1115]"
            contentClassName="flex flex-col lg:flex-row"
        >
            
            {/* Nav Bar (Top - Fixed) */}
            <div className="absolute top-0 left-0 right-0 p-4 md:p-6 z-50 flex justify-between items-start pointer-events-none">
                {/* Back to Chat Tag */}
                <div className="pointer-events-auto">
                    {fromChat && (
                         <button 
                            onClick={onClose}
                            className="flex items-center gap-2 bg-black/40 hover:bg-primary-start/20 backdrop-blur-md border border-white/10 text-white px-4 py-2 rounded-full transition-all group shadow-lg"
                         >
                             <div className="w-6 h-6 rounded-full bg-primary-start text-black flex items-center justify-center group-hover:scale-110 transition-transform shadow-md shadow-primary-start/20">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="15 18 9 12 15 6"></polyline></svg>
                             </div>
                             <span className="text-sm font-bold pr-1">Back to Chat</span>
                         </button>
                    )}
                </div>

                {/* Close Button */}
                <button 
                    onClick={onClose}
                    className="pointer-events-auto w-10 h-10 rounded-full bg-black/40 hover:bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center text-white transition-all hover:rotate-90 hover:scale-110 shadow-lg"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
            </div>

            {/* Image Section */}
            {/* Reduced height to 30vh on mobile to give more room for content/footer. */}
            <div className="w-full lg:w-1/2 h-[30vh] lg:h-full relative bg-[#050505] overflow-hidden group shrink-0">
                {/* Top Gradient for Nav Visibility */}
                <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/80 to-transparent z-10 pointer-events-none"></div>
                
                {/* Bottom/Side Gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0F1115] z-10 lg:bg-gradient-to-r lg:to-[#0F1115] lg:from-transparent"></div>
                
                <img 
                    src={product.imageUrl} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105"
                />

                {/* Floating Highlight Widgets - Bottom Left */}
                <div className="absolute bottom-6 left-6 right-6 z-20 flex flex-wrap gap-2">
                     {product.badges.map((badge, idx) => (
                        <div key={idx} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 shadow-lg">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary-start animate-pulse"></span>
                            <span className="text-xs font-bold text-white tracking-wide">{badge}</span>
                        </div>
                     ))}
                </div>
            </div>

            {/* Content Section */}
            {/* Flex-1 ensures it fills the remaining height. min-h-0 prevents overflow issues in nested flex. */}
            <div className="w-full lg:w-1/2 flex flex-col bg-[#0F1115] relative min-h-0 flex-1 lg:h-full">
                
                {/* Scrollable Area - Content flows here */}
                <div className="flex-1 overflow-y-auto overflow-x-hidden p-6 md:p-10 scroll-smooth overscroll-contain">
                    {/* Breadcrumbs */}
                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-4 uppercase tracking-widest font-bold">
                        <span>Catalogue</span>
                        <span className="text-white/20">/</span>
                        <span className="text-primary-start">{product.category}</span>
                    </div>

                    <h2 className="text-2xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-6 leading-[1.1]">{product.name}</h2>
                    
                    {/* Key Metrics Grid */}
                    <div className="grid grid-cols-2 gap-3 mb-8">
                         <div className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-primary-start/30 transition-colors group/item">
                             <div className="w-8 h-8 rounded-full bg-primary-start/10 text-primary-start flex items-center justify-center mb-2 group-hover/item:scale-110 transition-transform">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                             </div>
                             <h4 className="text-[10px] text-gray-400 uppercase font-bold tracking-wider mb-1">Safety Rating</h4>
                             <p className="text-white font-bold text-lg">Clinical A+</p>
                         </div>
                         <div className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-accent-start/30 transition-colors group/item">
                             <div className="w-8 h-8 rounded-full bg-accent-start/10 text-accent-start flex items-center justify-center mb-2 group-hover/item:scale-110 transition-transform">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                             </div>
                             <h4 className="text-[10px] text-gray-400 uppercase font-bold tracking-wider mb-1">Availability</h4>
                             <p className="text-white font-bold text-lg">In Stock (CA)</p>
                         </div>
                    </div>

                    <div className="prose prose-invert max-w-none">
                        <div className="mb-8 p-5 bg-gradient-to-br from-white/5 to-transparent border-l-4 border-primary-start rounded-r-xl">
                            <p className="text-gray-200 text-lg leading-relaxed italic m-0">
                                "{product.shortDescription}"
                            </p>
                        </div>
                        
                        <div className="mb-10 space-y-4">
                            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-accent-start"></span>
                                Clinical Analysis
                            </h3>
                            <p className="text-gray-300 leading-relaxed text-base">
                                {product.clinicalSummary}
                            </p>
                            <div className="flex flex-col gap-2 pt-2">
                                <div className="flex items-start gap-3 text-sm text-gray-400 bg-white/5 p-3 rounded-lg border border-white/5">
                                    <svg className="w-5 h-5 text-green-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                                    <span>Approved for long-term home rehabilitation usage.</span>
                                </div>
                                <div className="flex items-start gap-3 text-sm text-gray-400 bg-white/5 p-3 rounded-lg border border-white/5">
                                    <svg className="w-5 h-5 text-green-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                                    <span>Eligible for provincial medical device funding (ADP/AADL).</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-[#050505] rounded-2xl p-6 border border-white/10">
                            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Technical Specifications</h3>
                            <div className="grid grid-cols-2 gap-y-4 gap-x-4">
                                {Object.entries(product.specs).map(([key, value]) => (
                                    <div key={key} className="flex flex-col border-b border-white/5 pb-2 last:border-0">
                                        <span className="text-[10px] text-gray-500 uppercase font-bold mb-1">{key}</span>
                                        <span className="text-sm text-white font-mono">{value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sticky Footer CTA - Now Flex Item (Static position relative to flow) */}
                <div className="shrink-0 p-4 md:p-8 bg-[#0F1115] border-t border-white/10 z-20 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
                    <div className="flex flex-col gap-3 max-w-md mx-auto lg:max-w-none">
                         <div className="flex justify-between items-center mb-1">
                             <div className="flex flex-col">
                                <span className="text-[10px] text-gray-400 uppercase font-bold">Estimated Cost</span>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-2xl font-bold text-white">${product.priceRef}</span>
                                    <span className="text-xs font-medium text-gray-500">CAD</span>
                                </div>
                             </div>
                             <div className="text-right flex flex-col items-end">
                                 <span className="text-[10px] text-gray-400 uppercase font-bold mb-1">Coverage</span>
                                 <span className="text-[10px] text-green-400 font-bold bg-green-500/10 border border-green-500/20 px-2 py-1 rounded-full">Insurance Eligible</span>
                             </div>
                         </div>
                         <Button 
                            variant="primary" 
                            fullWidth 
                            onClick={onConsult}
                            className="h-12 md:h-14 text-base md:text-lg font-bold shadow-[0_0_30px_rgba(0,220,130,0.3)] hover:shadow-[0_0_50px_rgba(0,220,130,0.5)] relative overflow-hidden group"
                         >
                            <span className="relative z-10">Request Expert Consultation</span>
                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                         </Button>
                         <p className="text-center text-[10px] text-gray-600">No payment required today. Speak to a specialist first.</p>
                    </div>
                </div>

            </div>
        </Glass>
    </div>
  );
};

export default ProductDetailModal;