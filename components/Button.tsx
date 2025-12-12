import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'ghost';
  fullWidth?: boolean;
  icon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  className = '',
  icon,
  ...props 
}) => {
  const base = "h-12 px-6 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-gradient-to-r from-primary-start to-primary-end text-white shadow-lg shadow-primary-start/30 hover:shadow-primary-start/50 border border-transparent",
    accent: "bg-gradient-to-r from-accent-start to-accent-end text-white shadow-lg shadow-accent-start/30 hover:shadow-accent-start/50 border border-transparent",
    secondary: "bg-white/50 backdrop-blur-md border border-primary-start/30 text-neutral-text hover:bg-white/80",
    ghost: "bg-transparent text-primary-start hover:bg-primary-start/10"
  };

  return (
    <button 
      className={`${base} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {icon && <span className="text-lg">{icon}</span>}
      {children}
    </button>
  );
};

export default Button;
