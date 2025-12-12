import React, { useContext } from 'react';
import Glass from './Glass';
import Button from './Button';
import { Product } from '../types';
import { AppContext } from '../App';

interface ProductCardProps {
  product: Product;
  onConsult: (id: string) => void;
  onChat: (id: string) => void;
  onViewDetail?: (id: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onConsult, onChat, onViewDetail }) => {
  const { t } = useContext(AppContext);

  return (
    <div 
        className="h-full hover:z-10 relative transition-all duration-500 group cursor-pointer"
        onClick={() => onViewDetail && onViewDetail(product.id)}
    >
        {/* Colorful Gradient Border Effect on Hover */}
        <div className="absolute -inset-[1px] bg-gradient-to-r from-primary-start via-accent-start to-primary-end rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>

        <Glass 
            interactive 
            className="h-full bg-[#121418] border border-white/10 shadow-lg group-hover:shadow-2xl group-hover:shadow-primary-start/20 rounded-2xl overflow-hidden"
            contentClassName="relative flex flex-col h-full"
        >
        
        {/* Image Container */}
        <div className="relative h-64 w-full overflow-hidden bg-gray-900 shrink-0">
            <img 
                src={product.imageUrl} 
                alt={product.name} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:contrast-110"
                loading="lazy"
            />
            
            {/* Overlay Gradient on Hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#121418] via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>

            {/* Top Status Tags */}
            <div className="absolute top-3 left-3 flex gap-2">
                <span className="bg-primary-start/90 text-black text-[10px] font-bold px-2 py-1 rounded shadow-lg backdrop-blur-md">
                    IN STOCK
                </span>
            </div>
            
            {/* "Quick View" floating icon */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center opacity-0 group-hover:opacity-100 scale-50 group-hover:scale-100 transition-all duration-300">
                 <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
            </div>
        </div>
        
        {/* Content Body */}
        <div className="p-5 flex flex-col flex-grow relative">
            {/* Category Tag */}
            <div className="flex justify-between items-start mb-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-primary-start opacity-80 group-hover:opacity-100 transition-opacity">
                    {product.category}
                </span>
                <span className="text-xs font-medium text-gray-400">
                    Est. ${product.priceRef}
                </span>
            </div>

            <h3 className="text-lg font-display font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-all">
                {product.name}
            </h3>
            
            {/* Colorful Badges */}
            <div className="flex flex-wrap gap-2 mb-3">
                {product.badges.slice(0, 2).map((badge, i) => (
                    <span key={i} className={`text-[10px] font-bold px-2 py-0.5 rounded border border-white/5 ${i === 0 ? 'bg-primary-start/10 text-primary-start' : 'bg-accent-start/10 text-accent-start'}`}>
                        {badge}
                    </span>
                ))}
            </div>

            <p className="text-sm text-gray-400 mb-4 line-clamp-2 leading-relaxed flex-grow group-hover:text-gray-300 transition-colors">
                {product.shortDescription}
            </p>

            <div className="mt-auto space-y-2 pt-4 border-t border-white/5">
                <Button 
                    variant="primary" 
                    fullWidth 
                    onClick={(e) => { e.stopPropagation(); onConsult(product.id); }} 
                    className="h-10 text-sm shadow-none group-hover:shadow-primary-start/40 transition-shadow"
                >
                    Book Consultation
                </Button>
            </div>
        </div>
        </Glass>
    </div>
  );
};

export default ProductCard;