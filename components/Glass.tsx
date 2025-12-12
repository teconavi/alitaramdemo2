import React from 'react';

interface GlassProps {
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
  intensity?: 'light' | 'medium' | 'heavy';
  interactive?: boolean;
  border?: boolean;
  rounded?: 'none' | 'lg' | 'xl' | '2xl' | '3xl';
}

const Glass: React.FC<GlassProps> = ({ 
  children, 
  className = '', 
  contentClassName = '',
  intensity = 'medium',
  interactive = false,
  border = true,
  rounded = '3xl'
}) => {
  // Base classes for the liquid effect
  const baseStyle = "relative overflow-hidden transition-all duration-500";
  
  // Radius map
  const radiusStyles = {
    'none': 'rounded-none',
    'lg': 'rounded-lg',
    'xl': 'rounded-xl',
    '2xl': 'rounded-2xl',
    '3xl': 'rounded-3xl'
  };

  // Dark Mode Saturation and Blur levels
  const intensityStyles = {
    light: "bg-black/20 backdrop-blur-md",
    medium: "bg-[#0F1115]/60 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.5)]",
    heavy: "bg-[#1A1D24]/80 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.7)]"
  };

  // Subtle white border for dark glass
  const borderStyle = border ? "border border-white/10 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)]" : "";

  const interactiveStyle = interactive 
    ? "hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,220,130,0.1)] hover:border-primary-start/30 cursor-pointer active:scale-[0.98]" 
    : "";

  return (
    <div className={`${baseStyle} ${radiusStyles[rounded]} ${intensityStyles[intensity]} ${borderStyle} ${interactiveStyle} ${className}`}>
      {/* Noise Texture (Optional) */}
      <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none"></div>
      
      {/* Spotlight Effect */}
      <div className="absolute -top-20 -left-20 w-40 h-40 bg-white/5 rounded-full blur-3xl pointer-events-none group-hover:bg-primary-start/10 transition-colors duration-500"></div>

      {/* Content Wrapper - Now accepts classes to control internal layout (e.g. flex) */}
      <div className={`relative z-10 h-full w-full ${contentClassName}`}>
        {children}
      </div>
    </div>
  );
};

export default Glass;