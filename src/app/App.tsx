import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Toaster } from 'sonner';
import { HomePage } from './pages/HomePage';
import HabitatPage from './pages/HabitatPage';
import CotizadorPage from './cotizador/CotizadorPage';
import HabitatIQCotizadorPage from './cotizador-iq/HabitatIQCotizadorPage';
import { QuotationProvider } from './context/QuotationContext';

function ScrollToTop() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    let title = "Inalumh S.A.S. - Construcción y Renovación";
    let faviconUrl = "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🏗️</text></svg>";

    if (pathname === '/habitat-iq') {
      title = "Habitat IQ - Soluciones Tecnológicas";
      faviconUrl = "/favicon-iq.png";
    } else if (pathname === '/cotizador') {
      title = "Cotizador Inalumh - Cotiza tu proyecto al instante";
      faviconUrl = "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🧮</text></svg>";
    } else if (pathname === '/cotizador-iq') {
      title = "Cotizador Habitat IQ - Cotiza tecnología para tu espacio";
      faviconUrl = "/favicon-iq.png";
    }

    document.title = title;
    let link: HTMLLinkElement | null = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.head.appendChild(link);
    }
    link.href = faviconUrl;
    
  }, [pathname]);
  
  return null;
}

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Toaster position="top-center" richColors />
      <QuotationProvider>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/habitat-iq" element={<HabitatPage />} />
          <Route path="/cotizador" element={<CotizadorPage />} />
          <Route path="/cotizador-iq" element={<HabitatIQCotizadorPage />} />
        </Routes>
      </QuotationProvider>
    </div>
  );
}
