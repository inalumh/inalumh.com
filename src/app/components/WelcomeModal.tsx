import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Building2, 
  Frame, 
  Sparkles, 
  Ruler, 
  Calculator, 
  ArrowRight, 
  CheckCircle2,
  ShieldCheck
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function WelcomeModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [dontShowAgain, setDontShowAgain] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the welcome modal was previously closed by the user
    const hasSeen = localStorage.getItem('inalumh_welcome_seen_v2');
    if (!hasSeen) {
      // Delay slightly for smooth page entrance
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 700);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    if (dontShowAgain) {
      localStorage.setItem('inalumh_welcome_seen_v2', 'true');
    }
    setIsOpen(false);
  };

  const handleCotizar = () => {
    handleClose();
    navigate('/cotizador');
  };

  const businessLines = [
    {
      icon: Frame,
      color: '#E63946',
      badge: 'Gama Alta',
      title: 'Vidrio & Aluminio Arquitectónico',
      desc: 'Ventanas termoacústicas, fachadas flotantes, divisiones de vidrio templado y pasamanos de alta seguridad.'
    },
    {
      icon: Building2,
      color: '#F77F00',
      badge: 'Construcción',
      title: 'Obra Civil & Acabados',
      desc: 'Proyectos de construcción, remodelación integral, mampostería y acabados de lujo para residencias y comercios.'
    },
    {
      icon: Sparkles,
      color: '#00A8E8',
      badge: 'Tecnología',
      title: 'Habitat IQ — Domótica & Seguridad',
      desc: 'Automatización inteligente de espacios, control por voz/app, cerraduras digitales, CCTV y redes.'
    },
    {
      icon: Ruler,
      color: '#06D6A0',
      badge: 'Curaduría Urbana',
      title: 'Licencias de Construcción',
      desc: 'Asesoría técnica, levantamientos y aprobación de licencias ante Curadurías Urbanas en las 9 modalidades normativas.'
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 my-auto z-10"
          >
            {/* Top decorative gradient bar */}
            <div className="h-2.5 bg-gradient-to-r from-[#E63946] via-[#F77F00] via-[#00A8E8] to-[#06D6A0]" />

            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors z-20"
              aria-label="Cerrar ventana"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header section */}
            <div className="p-6 sm:p-8 pb-4 text-center sm:text-left">
              <div className="flex items-center gap-3 justify-center sm:justify-start mb-2">
                <div className="bg-[#E63946] p-1.5 rounded-lg shadow-md shadow-[#E63946]/30">
                  <img src="/images/logo_b_150.png" alt="Inalumh Logo" className="h-7 w-auto" />
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-50 text-[#E63946] rounded-full text-xs font-extrabold uppercase tracking-wide border border-red-100">
                  <ShieldCheck className="w-3.5 h-3.5" /> Bienvenido a INALUMH S.A.S.
                </div>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1a1a1a] tracking-tight">
                Soluciones integrales de negocio
              </h2>
              <p className="text-gray-500 text-sm mt-1">
                Descubre nuestras 4 áreas principales de especialización arquitectónica y tecnológica:
              </p>
            </div>

            {/* Business Lines Grid */}
            <div className="px-6 sm:px-8 py-2 grid grid-cols-1 sm:grid-cols-2 gap-3.5 max-h-[55vh] overflow-y-auto">
              {businessLines.map((line, idx) => {
                const Icon = line.icon;
                return (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl border border-gray-100 bg-gray-50/70 hover:bg-white hover:border-gray-200 hover:shadow-md transition-all duration-200 flex flex-col justify-between group"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div
                          className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold shadow-sm"
                          style={{ backgroundColor: line.color }}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        <span
                          className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                          style={{ backgroundColor: `${line.color}15`, color: line.color }}
                        >
                          {line.badge}
                        </span>
                      </div>
                      <h3 className="font-bold text-gray-900 text-sm group-hover:text-[#E63946] transition-colors">
                        {line.title}
                      </h3>
                      <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                        {line.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Footer & Actions */}
            <div className="p-6 sm:p-8 pt-4 bg-gray-50/80 border-t border-gray-100 mt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <label className="flex items-center gap-2 text-xs text-gray-500 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={dontShowAgain}
                  onChange={(e) => setDontShowAgain(e.target.checked)}
                  className="rounded border-gray-300 text-[#E63946] focus:ring-[#E63946] w-4 h-4"
                />
                <span>No mostrar este mensaje de nuevo</span>
              </label>

              <div className="flex items-center gap-2.5 w-full sm:w-auto">
                <button
                  onClick={handleClose}
                  className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl border border-gray-300 hover:border-gray-400 text-gray-700 font-semibold text-xs transition-colors"
                >
                  Explorar sitio
                </button>
                <button
                  onClick={handleCotizar}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#E63946] hover:bg-[#c62833] text-white font-bold text-xs shadow-lg shadow-[#E63946]/25 transition-all"
                >
                  <Calculator className="w-4 h-4" />
                  <span>Cotizar ahora</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
