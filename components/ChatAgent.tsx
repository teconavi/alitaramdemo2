import React, { useState, useEffect, useRef, useContext } from 'react';
import Glass from './Glass';
import { sendMessageToGemini } from '../services/geminiService';
import { ChatMessage, Product } from '../types';
import { AppContext } from '../App';
import { MOCK_PRODUCTS } from '../constants';

const ChatAgent: React.FC = () => {
  const { 
    isChatOpen, 
    setChatOpen, 
    t, 
    openProductDetail, // Updated to use Product Detail flow
    initialChatMsg, 
    clearInitialChatMsg,
    chatMessages,      
    addChatMessage     
  } = useContext(AppContext);
  
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Initial Greeting (Client-side only)
  useEffect(() => {
    if (chatMessages.length === 0) {
      setTimeout(() => {
        addChatMessage({
            id: 'init',
            role: 'model',
            text: "👋 Hi there. I am the AliTaram Specialist. I can analyze your needs and recommend specific clinical products. How can I help you move better today?",
            timestamp: new Date()
          });
      }, 500);
    }
  }, []);

  // Handle Initial Message
  useEffect(() => {
      if (initialChatMsg) {
          handleSend(initialChatMsg);
          clearInitialChatMsg();
      }
  }, [initialChatMsg]);

  // Auto-scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatMessages, isTyping, isChatOpen]);

  const handleSend = async (textOverride?: string) => {
    const textToSend = textOverride || input;
    if (!textToSend.trim()) return;

    // 1. Add User Message
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: textToSend,
      timestamp: new Date()
    };

    addChatMessage(userMsg);
    if (!textOverride) setInput('');
    setIsTyping(true);

    try {
        // 2. Prepare History
        const apiHistory = chatMessages
            .filter(m => m.id !== 'init' && m.role !== 'system')
            .map(m => ({ role: m.role, parts: m.text }));
        
        // 3. Call API
        const rawResponse = await sendMessageToGemini(apiHistory, textToSend);
        const responseText = rawResponse || "I apologize, I didn't quite catch that. Could you rephrase?";
        
        // 4. Parse Response
        const productRegex = /\[RECOMMEND:\s*([^\]]+)\]/g;
        let cleanText = responseText;
        const suggestions: Product[] = [];
        
        let match;
        while ((match = productRegex.exec(responseText)) !== null) {
            const pid = match[1].trim();
            const p = MOCK_PRODUCTS.find(prod => prod.id === pid);
            if (p) suggestions.push(p);
        }
        
        cleanText = cleanText.replace(productRegex, '').trim();

        // 5. Add AI Message
        const aiMsg: ChatMessage = {
            id: (Date.now() + 1).toString(),
            role: 'model',
            text: cleanText,
            timestamp: new Date(),
            isProductSuggestion: suggestions.length > 0,
            suggestedProducts: suggestions
        };

        addChatMessage(aiMsg);
    } catch (error) {
        console.error("Chat Error", error);
        addChatMessage({
            id: Date.now().toString(),
            role: 'model',
            text: "I'm having trouble connecting to the clinical database. Please try again or call our support line.",
            timestamp: new Date()
        });
    } finally {
        setIsTyping(false);
        const inputEl = document.getElementById('chat-input');
        if(inputEl) inputEl.focus();
    }
  };

  // Logic: Close Chat -> Open Product Page
  const handleProductClick = (productId: string) => {
      setChatOpen(false); 
      // Pass true to indicate this came from chat!
      openProductDetail(productId, true); 
  };

  if (!isChatOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center sm:p-4 bg-black/60 backdrop-blur-sm animate-menu-open">
        {/* Close Overlay */}
        <div className="absolute inset-0" onClick={() => setChatOpen(false)}></div>

        {/* Window Container */}
        <div className="w-full sm:w-[450px] h-[85dvh] sm:h-[600px] relative z-10 flex flex-col transition-all">
            <Glass intensity="heavy" className="border border-white/20 shadow-[0_0_80px_rgba(0,0,0,0.8)] overflow-hidden rounded-t-3xl sm:rounded-2xl bg-[#0F1115] w-full h-full">
                
                <div className="flex flex-col h-full w-full">
                    {/* Header */}
                    <div className="p-4 border-b border-white/10 flex justify-between items-center bg-white/5 shrink-0">
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-start to-primary-end p-[2px] shadow-lg animate-pulse-glow">
                                    <div className="w-full h-full bg-black rounded-full flex items-center justify-center overflow-hidden">
                                        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                                    </div>
                                </div>
                                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 border-2 border-black rounded-full"></span>
                            </div>
                            <div>
                                <h3 className="font-bold text-white text-base leading-tight">Clinical Assistant</h3>
                                <p className="text-[10px] text-primary-start font-medium uppercase tracking-wider">Online • AliTaram</p>
                            </div>
                        </div>
                        <button onClick={() => setChatOpen(false)} className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/20 flex items-center justify-center text-white transition-colors">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                        </button>
                    </div>

                    {/* Chat Stream */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-6 scroll-smooth min-h-0" ref={scrollRef}>
                        {chatMessages.map((msg) => (
                            <div key={msg.id} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'} animate-slide-up`}>
                                
                                <div className={`max-w-[85%] p-3.5 rounded-2xl shadow-md text-sm leading-relaxed ${
                                    msg.role === 'user' 
                                    ? 'bg-primary-start text-black font-semibold rounded-tr-none' 
                                    : 'bg-white/10 border border-white/10 text-gray-100 rounded-tl-none backdrop-blur-md'
                                }`}>
                                    <p className="whitespace-pre-line">{msg.text}</p>
                                </div>

                                {/* Professional Product Recommendation Cards */}
                                {msg.isProductSuggestion && msg.suggestedProducts && (
                                    <div className="mt-4 w-full max-w-[95%] space-y-3 pl-2">
                                        {msg.suggestedProducts.map(p => (
                                            <div 
                                                key={p.id} 
                                                className="group relative overflow-hidden bg-[#151920] hover:bg-[#1A1D24] p-3 rounded-2xl border border-white/10 transition-all cursor-pointer hover:border-primary-start/50 hover:shadow-lg hover:shadow-primary-start/10" 
                                                onClick={() => handleProductClick(p.id)}
                                            >
                                                <div className="flex gap-4 items-start">
                                                    {/* Image Thumbnail */}
                                                    <div className="w-16 h-16 rounded-xl bg-black overflow-hidden shrink-0 border border-white/5">
                                                        <img src={p.imageUrl} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={p.name} />
                                                    </div>
                                                    
                                                    {/* Content */}
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex justify-between items-start">
                                                            <h4 className="text-white font-bold text-sm truncate pr-2">{p.name}</h4>
                                                            <span className="text-[10px] bg-white/10 text-gray-300 px-1.5 py-0.5 rounded uppercase tracking-wider">{p.category}</span>
                                                        </div>
                                                        <p className="text-gray-400 text-xs mt-1 line-clamp-2 leading-snug">{p.shortDescription}</p>
                                                        
                                                        <div className="flex items-center gap-2 mt-2">
                                                            <span className="text-primary-start text-xs font-bold uppercase tracking-wide group-hover:underline decoration-primary-start/50 underline-offset-2">View Details</span>
                                                            <div className="w-4 h-4 rounded-full bg-primary-start/10 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                                                                <svg className="w-3 h-3 text-primary-start" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                        
                        {isTyping && (
                            <div className="flex items-center gap-2 ml-2">
                                <div className="bg-white/5 px-4 py-2 rounded-2xl rounded-tl-none flex gap-1 items-center h-10 border border-white/5">
                                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
                                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-100"></span>
                                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-200"></span>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Input Area */}
                    <div className="p-4 bg-[#0A0C10] border-t border-white/10 shrink-0">
                        <form 
                            onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                            className="relative"
                        >
                            <div className="relative flex items-center bg-white/5 border border-white/10 rounded-2xl focus-within:ring-1 focus-within:ring-primary-start focus-within:border-primary-start transition-all overflow-hidden">
                                <input 
                                    id="chat-input"
                                    type="text" 
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder={t.chatPlaceholder}
                                    disabled={isTyping}
                                    className="w-full bg-transparent border-none px-4 py-4 text-white placeholder-gray-500 text-sm focus:ring-0 focus:outline-none min-w-0"
                                    autoComplete="off"
                                />
                                <button 
                                    type="submit"
                                    disabled={!input.trim() || isTyping}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 flex items-center justify-center bg-primary-start text-black rounded-xl hover:bg-primary-end disabled:opacity-0 disabled:pointer-events-none transition-all active:scale-95 shadow-lg shadow-primary-start/20"
                                >
                                    {isTyping ? (
                                        <svg className="animate-spin h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                    ) : (
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </Glass>
        </div>
    </div>
  );
};

export default ChatAgent;