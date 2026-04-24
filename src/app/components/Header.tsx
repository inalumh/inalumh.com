import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  
  const navItems = [
    { label: 'Inicio', href: '#inicio' },
    { label: 'Servicios', href: '#servicios' },
    { label: 'Habitat IQ', href: '#habitat-iq' },
    { label: 'Cotizador', href: '/cotizador' },
    { label: 'Proyectos', href: '#proyectos' },
    { label: 'Contacto', href: '#contacto' }
  ];

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();

    // If it's an internal route (not a hash anchor), navigate via router
    if (href.startsWith('/')) {
      navigate(href);
      setMobileMenuOpen(false);
      return;
    }

    const targetId = href.replace('#', '');
    const elem = document.getElementById(targetId);
    if (elem) {
      const headerOffset = 80; // height of the header (h-20 = 80px)
      const elementPosition = elem.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setMobileMenuOpen(false);
  };
  
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="bg-[#E63946] p-1.5 rounded-md flex items-center justify-center">
                <img src="/images/logo_b_150.png" alt="Inalumh Logo" className="h-9 w-auto object-contain" />
              </div>
              <div>
                <div className="text-xl font-bold text-[#1a1a1a] leading-none">INALUMH</div>
                <div className="text-xs text-[#717182] leading-none mt-1">Construcción & Renovación</div>
              </div>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a 
                key={item.label}
                href={item.href}
                onClick={(e) => handleScroll(e, item.href)}
                className="text-[#2a2a2a] hover:text-[#E63946] transition-colors font-medium"
              >
                {item.label}
              </a>
            ))}
          </nav>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-[#1a1a1a]" />
            ) : (
              <Menu className="w-6 h-6 text-[#1a1a1a]" />
            )}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <nav className="px-4 py-4 flex flex-col gap-4">
            {navItems.map((item) => (
              <a 
                key={item.label}
                href={item.href}
                className="text-[#2a2a2a] hover:text-[#E63946] transition-colors font-medium py-2"
                onClick={(e) => handleScroll(e, item.href)}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
