import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, FileText, Scale, Calculator, ShieldCheck, Wrench, AlertTriangle } from 'lucide-react';

interface TermsConditionsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TermsConditionsModal({ isOpen, onClose }: TermsConditionsModalProps) {
  if (!isOpen) return null;

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
          <div className="h-2 bg-gradient-to-r from-[#E63946] via-[#F77F00] to-[#00A8E8]" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 text-gray-400 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors z-20"
            aria-label="Cerrar"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="p-6 sm:p-8 pb-4 border-b border-gray-100">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-[#E63946]/10 text-[#E63946] flex items-center justify-center font-bold">
                <Scale className="w-6 h-6 text-[#E63946]" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#E63946]">
                  Condiciones del Servicio
                </span>
                <h2 className="text-2xl font-extrabold text-[#1a1a1a]">
                  Términos y Condiciones de Uso
                </h2>
              </div>
            </div>
            <p className="text-xs text-gray-500">
              Disposiciones legales para el uso de la plataforma inalumh.com y contratación de servicios.
            </p>
          </div>

          {/* Body Content */}
          <div className="p-6 sm:p-8 max-h-[65vh] overflow-y-auto space-y-6 text-sm text-gray-600 leading-relaxed">
            {/* Section 1 */}
            <section className="space-y-2">
              <h3 className="font-bold text-gray-900 text-base flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#E63946]" /> 1. Aceptación de los Términos
              </h3>
              <p>
                Al acceder y utilizar el sitio web de <strong>INALUMH S.A.S.</strong> (inalumh.com) y sus herramientas digitales como los cotizadores interactivos, el usuario acepta de manera expresa e incondicional los presentes Términos y Condiciones. Si no está de acuerdo con estos términos, le solicitamos abstenerse de utilizar nuestros servicios en línea.
              </p>
            </section>

            {/* Section 2 */}
            <section className="space-y-2">
              <h3 className="font-bold text-gray-900 text-base flex items-center gap-2">
                <Calculator className="w-4 h-4 text-[#E63946]" /> 2. Alcance de los Cotizadores Digitales
              </h3>
              <p>
                Los valores arrojados por el Cotizador Inalumh y Cotizador Habitat IQ constituyen <strong>estimaciones preliminares y referenciales</strong>. No constituyen un presupuesto contractual definitivo ni una oferta vinculante inmodificable.
              </p>
              <ul className="list-disc pl-5 space-y-1 text-xs">
                <li>El precio final está sujeto a la verificación presencial mediante <strong>visita técnica de ingeniería</strong> en el lugar de la obra.</li>
                <li>Factores como accesibilidad del sitio, estado estructural preexistente, cambios en medidas definitivas o variaciones de insumos importados pueden modificar el presupuesto final.</li>
                <li>Los PDFs generados tienen una validez informativa de 15 días calendario a partir de su emisión.</li>
              </ul>
            </section>

            {/* Section 3 */}
            <section className="space-y-2">
              <h3 className="font-bold text-gray-900 text-base flex items-center gap-2">
                <Wrench className="w-4 h-4 text-[#E63946]" /> 3. Ejecución de Obras y Servicios
              </h3>
              <p>
                La contratación formal de servicios de carpintería metálica, vidrio templado, construcción, obra civil o domótica se formalizará mediante contrato o propuesta comercial firmada entre el cliente e INALUMH S.A.S.
              </p>
              <ul className="list-disc pl-5 space-y-1 text-xs">
                <li>Los tiempos de entrega acordados inician a partir del recibo del anticipo pactado y la aprobación de planos técnicos.</li>
                <li>El cliente debe garantizar el acceso seguro al lugar de la obra y el suministro de energía/agua requeridos para la instalación.</li>
              </ul>
            </section>

            {/* Section 4 */}
            <section className="space-y-2">
              <h3 className="font-bold text-gray-900 text-base flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#E63946]" /> 4. Garantías y Calidad
              </h3>
              <p>
                INALUMH S.A.S. otorga garantía sobre sus trabajos de fabricación, instalación y montaje de acuerdo con las leyes colombianas y el Estatuto del Consumidor (Ley 1480 de 2011).
              </p>
              <ul className="list-disc pl-5 space-y-1 text-xs">
                <li>Garantía de instalación y estanqueidad en ventanería y sistemas de vidrio según especificación de contrato.</li>
                <li>La garantía no cubre daños causados por mal uso, intervención de terceros no autorizados o fenómenos naturales extraordinarios.</li>
              </ul>
            </section>

            {/* Section 5 */}
            <section className="space-y-2">
              <h3 className="font-bold text-gray-900 text-base flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-[#E63946]" /> 5. Propiedad Intelectual
              </h3>
              <p>
                Todos los contenidos, diseños, marcas, logotipos, imágenes y software de este sitio son propiedad exclusiva de INALUMH S.A.S. Queda prohibida su reproducción parcial o total sin autorización previa por escrito.
              </p>
            </section>
          </div>

          {/* Footer Actions */}
          <div className="p-6 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
            <span className="text-xs text-gray-400">INALUMH S.A.S. · Bogotá, Colombia</span>
            <button
              onClick={onClose}
              className="px-6 py-2.5 bg-[#E63946] hover:bg-[#c62833] text-white font-bold text-xs rounded-xl shadow-md transition-all"
            >
              Entendido y Aceptar
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
