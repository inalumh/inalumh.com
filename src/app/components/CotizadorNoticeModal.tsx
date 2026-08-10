import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  AlertCircle, 
  Calculator, 
  MessageCircle, 
  CheckCircle2, 
  X, 
  FileText,
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface CotizadorNoticeModalProps {
  theme?: 'red' | 'cyan';
  onStart?: () => void;
}

export function CotizadorNoticeModal({ theme = 'red', onStart }: CotizadorNoticeModalProps) {
  const [isOpen, setIsOpen] = useState(true);

  const isRed = theme === 'red';

  const primaryColor = isRed ? '#E63946' : '#00A8E8';
  const primaryBg = isRed ? 'bg-[#E63946]' : 'bg-[#00A8E8]';
  const primaryHover = isRed ? 'hover:bg-[#c62833]' : 'hover:bg-[#007EA7]';
  const borderAccent = isRed ? 'border-[#E63946]/30' : 'border-[#00A8E8]/30';
  const textAccent = isRed ? 'text-[#E63946]' : 'text-[#00A8E8]';
  const bgLight = isRed ? 'bg-red-50' : 'bg-cyan-950/40';

  const defaultMsg = encodeURIComponent(
    '¡Hola equipo INALUMH! Quisiera asesoría directa de un asesor para cotizar mi proyecto.'
  );

  const handleStart = () => {
    setIsOpen(false);
    if (onStart) onStart();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleStart}
            className="fixed inset-0 bg-black/75 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className={`relative w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden border ${
              isRed ? 'bg-white text-gray-900 border-gray-200' : 'bg-[#0f172a] text-white border-white/10'
            } my-auto z-10`}
          >
            {/* Top Bar Accent */}
            <div className={`h-2.5 ${isRed ? 'bg-gradient-to-r from-[#E63946] to-[#F77F00]' : 'bg-gradient-to-r from-[#00A8E8] to-[#06D6A0]'}`} />

            {/* Close Button */}
            <button
              onClick={handleStart}
              className={`absolute top-4 right-4 p-2 rounded-full transition-colors ${
                isRed ? 'text-gray-400 hover:text-gray-700 bg-gray-100' : 'text-gray-400 hover:text-white bg-white/10'
              }`}
              aria-label="Cerrar aviso"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="p-6 sm:p-8 pb-4">
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-11 h-11 rounded-2xl flex items-center justify-center text-white font-bold shadow-lg shrink-0"
                  style={{ backgroundColor: primaryColor }}
                >
                  <AlertCircle className="w-6 h-6" />
                </div>
                <div>
                  <span className={`text-xs font-bold uppercase tracking-wider ${textAccent}`}>
                    Aviso Importante
                  </span>
                  <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
                    Valores Estimados de Cotización
                  </h2>
                </div>
              </div>

              <p className={`text-sm leading-relaxed ${isRed ? 'text-gray-600' : 'text-gray-300'}`}>
                Te damos la bienvenida a nuestro cotizador digital. Antes de comenzar, ten en cuenta las siguientes consideraciones:
              </p>
            </div>

            {/* Key Notice Points */}
            <div className="px-6 sm:px-8 py-2 space-y-3">
              {/* Point 1 */}
              <div className={`p-4 rounded-2xl border ${borderAccent} ${bgLight} flex items-start gap-3.5`}>
                <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-600 flex items-center justify-center shrink-0 mt-0.5">
                  <Calculator className="w-4.5 h-4.5 text-amber-500" />
                </div>
                <div>
                  <h4 className="font-bold text-sm mb-0.5">
                    Precios Estimados y Referenciales
                  </h4>
                  <p className={`text-xs leading-relaxed ${isRed ? 'text-gray-600' : 'text-gray-300'}`}>
                    Los montos mostrados en la plataforma son cálculos preliminares basados en las áreas y opciones que selecciones.
                  </p>
                </div>
              </div>

              {/* Point 2 */}
              <div className={`p-4 rounded-2xl border ${borderAccent} ${bgLight} flex items-start gap-3.5`}>
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                  <MessageCircle className="w-4.5 h-4.5 text-emerald-500" />
                </div>
                <div>
                  <h4 className="font-bold text-sm mb-0.5">
                    Atención Personalizada vía WhatsApp
                  </h4>
                  <p className={`text-xs leading-relaxed ${isRed ? 'text-gray-600' : 'text-gray-300'}`}>
                    Al finalizar el proceso podrás contactarnos directamente por WhatsApp para programar una <strong>visita técnica presencial</strong> y obtener una cotización oficial definitiva.
                  </p>
                </div>
              </div>
            </div>

            {/* Buttons / Actions */}
            <div className={`p-6 sm:p-8 pt-4 border-t ${isRed ? 'bg-gray-50 border-gray-100' : 'bg-[#020617]/50 border-white/10'} mt-4 flex flex-col sm:flex-row items-center justify-between gap-3`}>
              <a
                href={`https://wa.me/573133540258?text=${defaultMsg}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-3 bg-[#25D366] hover:bg-[#1ebe57] text-white font-bold rounded-xl text-xs transition-all shadow-md shadow-[#25D366]/20"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Contactar Asesor Ahora</span>
              </a>

              <button
                onClick={handleStart}
                className={`w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 ${primaryBg} ${primaryHover} text-white font-bold rounded-xl text-xs shadow-lg transition-all`}
              >
                <span>Entendido, Iniciar Cotización</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
