import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShieldCheck, FileText, Lock, Eye, Server, UserCheck } from 'lucide-react';

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PrivacyPolicyModal({ isOpen, onClose }: PrivacyPolicyModalProps) {
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
                <ShieldCheck className="w-6 h-6 text-[#E63946]" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#E63946]">
                  Protección de Datos Personales
                </span>
                <h2 className="text-2xl font-extrabold text-[#1a1a1a]">
                  Política de Privacidad y Tratamiento de Datos
                </h2>
              </div>
            </div>
            <p className="text-xs text-gray-500">
              Conforme a la Ley Estatutaria 1581 de 2012 y Decreto 1377 de 2013 de la República de Colombia.
            </p>
          </div>

          {/* Body Content */}
          <div className="p-6 sm:p-8 max-h-[65vh] overflow-y-auto space-y-6 text-sm text-gray-600 leading-relaxed">
            {/* Section 1 */}
            <section className="space-y-2">
              <h3 className="font-bold text-gray-900 text-base flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-[#E63946]" /> 1. Identificación del Responsable
              </h3>
              <p>
                <strong>INALUMH S.A.S.</strong>, identificada con NIT registrado en Bogotá D.C., Colombia, con domicilio en la Cra 28 #71-89, Bogotá, teléfono de contacto +57 313 354 0258 y correo electrónico <code>inalumh@gmail.com</code>, es la responsable del tratamiento de los datos personales recolectados a través del sitio web <code>inalumh.com</code> y sus cotizadores.
              </p>
            </section>

            {/* Section 2 */}
            <section className="space-y-2">
              <h3 className="font-bold text-gray-900 text-base flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#E63946]" /> 2. Datos Recolectados
              </h3>
              <p>
                A través de nuestros formularios de contacto, cotizadores inteligentes y solicitudes de trabajo, recopilamos los siguientes datos personales:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-xs">
                <li>Nombre completo o razón social.</li>
                <li>Número de teléfono móvil o WhatsApp de contacto.</li>
                <li>Dirección de correo electrónico.</li>
                <li>Ubicación geográfica del proyecto o residencia.</li>
                <li>Hojas de vida, antecedentes laborales o archivos adjuntos por aspirantes a empleo.</li>
                <li>Especificaciones del proyecto de obra, carpintería metálica o tecnología requerida.</li>
              </ul>
            </section>

            {/* Section 3 */}
            <section className="space-y-2">
              <h3 className="font-bold text-gray-900 text-base flex items-center gap-2">
                <Eye className="w-4 h-4 text-[#E63946]" /> 3. Finalidad del Tratamiento
              </h3>
              <p>
                Los datos suministrados serán utilizados de manera estricta y confidencial para las siguientes finalidades:
              </p>
              <ol className="list-decimal pl-5 space-y-1 text-xs">
                <li>Generación, cálculo y envío de cotizaciones y propuestas comerciales.</li>
                <li>Contacto vía WhatsApp, teléfono o correo electrónico para agendar visitas técnicas y confirmación de presupuestos.</li>
                <li>Estructuración de ofertas y participación en licitaciones o contrataciones corporativas.</li>
                <li>Evaluación de perfiles laborales para vacantes disponibles en INALUMH S.A.S.</li>
                <li>Atención de PQRS y cumplimiento de obligaciones legales o tributarias.</li>
              </ol>
            </section>

            {/* Section 4 */}
            <section className="space-y-2">
              <h3 className="font-bold text-gray-900 text-base flex items-center gap-2">
                <Lock className="w-4 h-4 text-[#E63946]" /> 4. Derechos del Titular (Habeas Data)
              </h3>
              <p>
                Como titular de los datos personales, usted tiene derecho a:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-xs">
                <li>Conocer, actualizar y rectificar sus datos personales frente a INALUMH S.A.S.</li>
                <li>Solicitar prueba de la autorización otorgada para el tratamiento de sus datos.</li>
                <li>Ser informado sobre el uso que se le ha dado a sus datos personales.</li>
                <li>Revocar la autorización y/o solicitar la supresión del dato cuando no se respeten los principios legales.</li>
                <li>Acceder en forma gratuita a sus datos personales que hayan sido objeto de Tratamiento.</li>
              </ul>
            </section>

            {/* Section 5 */}
            <section className="space-y-2">
              <h3 className="font-bold text-gray-900 text-base flex items-center gap-2">
                <Server className="w-4 h-4 text-[#E63946]" /> 5. Seguridad de la Información
              </h3>
              <p>
                INALUMH S.A.S. adopta medidas técnicas, humanas y administrativas necesarias para otorgar seguridad a los registros evitando su adulteración, pérdida, consulta, uso o acceso no autorizado o fraudulento. No vendemos ni compartimos sus datos con terceros con fines comerciales.
              </p>
            </section>
          </div>

          {/* Footer Actions */}
          <div className="p-6 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
            <span className="text-xs text-gray-400">Última actualización: Agosto 2026</span>
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
