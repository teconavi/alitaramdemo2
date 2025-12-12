import React, { useState, createContext } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductCard from './components/ProductCard';
import ChatAgent from './components/ChatAgent';
import ConsultationModal from './components/ConsultationModal';
import ProductDetailModal from './components/ProductDetailModal';
import AboutModal from './components/AboutModal';
import Footer from './components/Footer';
import { UI_TEXT, MOCK_PRODUCTS } from './constants';
import { ChatMessage } from './types';

interface AppContextType {
  t: typeof UI_TEXT;
  isChatOpen: boolean;
  setChatOpen: (open: boolean) => void;
  isConsultationOpen: boolean;
  openConsultation: (productId?: string) => void;
  closeConsultation: () => void;
  consultationProductId?: string;
  startChatWithMessage: (msg: string) => void;
  initialChatMsg: string | null;
  clearInitialChatMsg: () => void;
  chatMessages: ChatMessage[];
  addChatMessage: (msg: ChatMessage) => void;
  // Product Detail Context
  openProductDetail: (productId: string, fromChat?: boolean) => void;
  closeProductDetail: () => void;
  isDetailFromChat: boolean;
  // About Context
  isAboutOpen: boolean;
  openAbout: () => void;
  closeAbout: () => void;
}

export const AppContext = createContext<AppContextType>({} as AppContextType);

const App: React.FC = () => {
  const [isChatOpen, setChatOpen] = useState(false);
  const [isConsultationOpen, setConsultationOpen] = useState(false);
  const [consultationProductId, setConsultationProductId] = useState<string | undefined>(undefined);
  const [initialChatMsg, setInitialChatMsg] = useState<string | null>(null);
  
  // Product Detail State
  const [detailProductId, setDetailProductId] = useState<string | null>(null);
  const [isDetailFromChat, setIsDetailFromChat] = useState(false);
  
  // About State
  const [isAboutOpen, setAboutOpen] = useState(false);

  // Lifted Chat State for persistence
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);

  const openConsultation = (productId?: string) => {
    setConsultationProductId(productId);
    setConsultationOpen(true);
  };

  const closeConsultation = () => {
    setConsultationOpen(false);
    setConsultationProductId(undefined);
  };

  const openProductDetail = (productId: string, fromChat: boolean = false) => {
    setDetailProductId(productId);
    setIsDetailFromChat(fromChat);
  };

  const closeProductDetail = () => {
    setDetailProductId(null);
    // If it was opened from chat, reopen chat!
    if (isDetailFromChat) {
        setChatOpen(true);
        setIsDetailFromChat(false);
    }
  };
  
  const openAbout = () => setAboutOpen(true);
  const closeAbout = () => setAboutOpen(false);

  const startChatWithMessage = (msg: string) => {
    setInitialChatMsg(msg);
    setChatOpen(true);
  };

  const clearInitialChatMsg = () => {
    setInitialChatMsg(null);
  };

  const addChatMessage = (msg: ChatMessage) => {
    setChatMessages(prev => [...prev, msg]);
  };

  const t = UI_TEXT;

  return (
    <AppContext.Provider value={{ 
      t, 
      isChatOpen, 
      setChatOpen, 
      isConsultationOpen, 
      openConsultation, 
      closeConsultation,
      consultationProductId,
      startChatWithMessage,
      initialChatMsg,
      clearInitialChatMsg,
      chatMessages,
      addChatMessage,
      openProductDetail,
      closeProductDetail,
      isDetailFromChat,
      isAboutOpen,
      openAbout,
      closeAbout
    }}>
      <div className="min-h-screen flex flex-col font-sans text-neutral-text antialiased selection:bg-primary-start/30">
        <Header />
        
        <main className="flex-grow">
          <Hero />
          
          <section id="products" className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
              <div>
                <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-neutral-text to-gray-500">
                  Featured Solutions
                </h2>
                <p className="text-gray-600 max-w-2xl text-lg">
                   Clinical-grade equipment curated for Canadian homes.
                </p>
              </div>
              
              <div className="flex gap-2">
                 <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50/10 text-blue-400 border border-blue-500/20 text-xs font-semibold">
                    <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                    CSA Approved
                 </span>
                 <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-50/10 text-green-400 border border-green-500/20 text-xs font-semibold">
                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                    In Stock
                 </span>
              </div>
            </div>

            {/* Grid Optimized for Mobile (1), Tablet (2-3), Desktop (4) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {MOCK_PRODUCTS.map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onViewDetail={() => openProductDetail(product.id)}
                  onConsult={() => openConsultation(product.id)}
                  onChat={(id) => {
                    startChatWithMessage(`I'm interested in the ${product.name} (ID: ${product.id}). Can you tell me more?`);
                  }}
                />
              ))}
            </div>
          </section>
        </main>

        <Footer />
        
        <ChatAgent />
        
        {/* Product Detail Modal */}
        {detailProductId && (
            <ProductDetailModal 
                productId={detailProductId} 
                onClose={closeProductDetail} 
                fromChat={isDetailFromChat}
                onConsult={() => {
                    setDetailProductId(null);
                    openConsultation(detailProductId);
                }} 
            />
        )}

        {/* Consultation Form Modal */}
        {isConsultationOpen && (
          <ConsultationModal onClose={closeConsultation} productId={consultationProductId} />
        )}

        {/* About Company Modal */}
        {isAboutOpen && (
            <AboutModal onClose={closeAbout} />
        )}
      </div>
    </AppContext.Provider>
  );
};

export default App;