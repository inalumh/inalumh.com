interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  className?: string;
}

export function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  onClick,
  className = ''
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center transition-all duration-300 font-semibold rounded-sm';
  
  const variants = {
    primary: 'bg-[#E63946] text-white hover:bg-[#d32f3c] shadow-lg hover:shadow-xl',
    secondary: 'bg-[#2a2a2a] text-white hover:bg-[#404040]',
    outline: 'border-2 border-white text-white hover:bg-white hover:text-[#1a1a1a]'
  };
  
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };
  
  return (
    <button 
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </button>
  );
}
