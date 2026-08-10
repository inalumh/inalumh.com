import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, FileDown, ExternalLink, Building2, Sparkles, CheckCircle2, ShieldCheck, Award } from 'lucide-react';

interface BrochureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function BrochureModal({ isOpen, onClose }: BrochureModalProps) {
  if (!isOpen) return null;

  const handleOpenPDF = () => {
    window.open('/docs/brochure.pdf', '_blank');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/75 backdrop-blur-sm"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 my-auto z-10 text-gray-800"
        >
          {/* Top Bar Accent */}
          <div className="h-2.5 bg-gradient-to-r from-[#E63946] via-[#F77F00] via-[#00A8E8] to-[#06D6A0]" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 text-gray-400 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors z-20"
            aria-label="Cerrar"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="p-6 sm:p-8 pb-4 border-b border-gray-100 bg-gray-50/50">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-[#E63946] p-1.5 rounded-lg shadow-md shadow-[#E63946]/30">
                <img src="/images/logo_b_150.png" alt="Inalumh Logo" className="h-7 w-auto" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#E63946]">
                  Presentación Corporativa
                </span>
                <h2 className="text-2xl font-extrabold text-[#1a1a1a]">
                  Brochure Institucional INALUMH S.A.S.
                </h2>
              </div>
            </div>
            <p className="text-xs text-gray-500">
              Conoce nuestro portafolio de construcción, ventanería en aluminio, obra civil y soluciones de Habitat IQ.
            </p>
          </div>

          {/* Preview / Information Body */}
          <div className="p-6 sm:p-8 max-h-[60vh] overflow-y-auto space-y-6">
            {/* Banner card */}
            <div className="bg-gradient-to-br from-[#1e293b] via-[#0f172a] to-[#1e293b] text-white p-6 rounded-2xl shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-[#F77F00]" />
                  <span className="font-bold text-sm">Más de 10 Años de Trayectoria</span>
                </div>
                <span className="text-[10px] bg-white/10 px-2.5 py-1 rounded-full font-semibold border border-white/20">
                  Edición Oficial
                </span>
              </div>
              <h3 className="text-xl font-bold text-white">
                Transformando espacios con ingeniería, precisión y diseño de vanguardia.
              </h3>
              <p className="text-xs text-gray-300 leading-relaxed">
                El brochure corporativo contiene la ficha técnica de nuestros proyectos ejecutados, catálogo de fachadas flotantes, ventanería arquitectónica, acabados en obra civil y la división tecnológica Habitat IQ.
              </p>

              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  onClick={handleOpenPDF}
                  className="flex items-center gap-2 px-5 py-2.5 bg-[#E63946] hover:bg-[#c62833] text-white font-bold rounded-xl text-xs shadow-lg shadow-[#E63946]/30 transition-all"
                >
                  <FileDown className="w-4 h-4" />
                  <span>Descargar / Ver Brochure (PDF)</span>
                </button>
                <a
                  href="/docs/brochure.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold rounded-xl text-xs transition-all"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Abrir en Pestaña Nueva</span>
                </a>
              </div>
            </div>

            {/* Ficha técnica highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                <Building2 className="w-5 h-5 text-[#E63946] mb-2" />
                <h4 className="font-bold text-gray-900 mb-1">Obra Civil & Vidrio</h4>
                <p className="text-gray-500">Diseño e instalación de ventanería, fachadas y carpintería de aluminio.</p>
              </div>

              <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                <Sparkles className="w-5 h-5 text-[#00A8E8] mb-2" />
                <h4 className="font-bold text-gray-900 mb-1">Habitat IQ</h4>
                <p className="text-gray-500">Domótica, redes de datos, control de acceso y seguridad electrónica.</p>
              </div>

              <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                <ShieldCheck className="w-5 h-5 text-[#06D6A0] mb-2" />
                <h4 className="font-bold text-gray-900 mb-1">Licitaciones</h4>
                <p className="text-gray-500">Capacidad RUP, cumplimiento de pliegos y proyectos a gran escala.</p>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="p-6 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
            <span className="text-xs text-gray-500">Documento oficial INALUMH S.A.S.</span>
            <button
              onClick={onClose}
              className="px-6 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold text-xs rounded-xl transition-all"
            >
              Cerrar
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
