import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Briefcase, Paperclip, Send, User, Phone, FileText, CheckCircle2, AlertCircle } from 'lucide-react';

interface WorkWithUsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function WorkWithUsModal({ isOpen, onClose }: WorkWithUsModalProps) {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [position, setPosition] = useState('');
  const [experience, setExperience] = useState('');
  const [attachedFile, setAttachedFile] = useState<File | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      // Limit file size to ~15MB
      if (file.size > 15 * 1024 * 1024) {
        setErrorMsg('El archivo supera el límite de 15MB. Elige un documento más ligero.');
        return;
      }
      setErrorMsg('');
      setAttachedFile(file);
    }
  };

  const handleSubmitWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim() || !position.trim()) {
      setErrorMsg('Por favor completa tu nombre, teléfono y cargo de interés.');
      return;
    }

    const fileNameInfo = attachedFile ? `📄 *Hoja de Vida Adjunta:* ${attachedFile.name} (${(attachedFile.size / 1024).toFixed(0)} KB)` : '📄 *Sin archivo adjunto previo*';

    const messageText = 
      `👷 *SOLICITUD DE EMPLEO — INALUMH S.A.S.*\n\n` +
      `👤 *Nombre:* ${fullName}\n` +
      `📞 *Teléfono:* ${phone}\n` +
      `💼 *Cargo / Especialidad:* ${position}\n` +
      `${fileNameInfo}\n\n` +
      (experience ? `📝 *Experiencia / Notas:* ${experience}\n\n` : '') +
      `👉 *Instrucción:* Adjunto mi hoja de vida / documento en este chat a continuación.`;

    const encoded = encodeURIComponent(messageText);
    window.open(`https://wa.me/573133540258?text=${encoded}`, '_blank');
    
    // Close modal after sending
    onClose();
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
          className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 my-auto z-10 text-gray-800"
        >
          {/* Top Bar Accent */}
          <div className="h-2.5 bg-gradient-to-r from-[#E63946] via-[#F77F00] to-[#06D6A0]" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 text-gray-400 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors z-20"
            aria-label="Cerrar"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="p-6 sm:p-8 pb-3 border-b border-gray-100">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-[#E63946]/10 text-[#E63946] flex items-center justify-center font-bold">
                <Briefcase className="w-6 h-6 text-[#E63946]" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#E63946]">
                  Talento INALUMH
                </span>
                <h2 className="text-2xl font-extrabold text-[#1a1a1a]">
                  Trabaja con nosotros
                </h2>
              </div>
            </div>
            <p className="text-xs text-gray-500">
              Únete a nuestro equipo de construcción, carpintería metálica, vidrio y tecnología. Envíanos tu hoja de vida.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmitWhatsApp} className="p-6 sm:p-8 space-y-4">
            {errorMsg && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Field 1: Full Name */}
            <div>
              <label className="text-xs font-bold text-gray-700 mb-1 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-[#E63946]" /> Nombre Completo *
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Ej: Juan Pérez"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#E63946] focus:ring-2 focus:ring-[#E63946]/20 outline-none text-sm"
              />
            </div>

            {/* Field 2: Phone */}
            <div>
              <label className="text-xs font-bold text-gray-700 mb-1 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-[#E63946]" /> Teléfono / WhatsApp *
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Ej: 310 123 4567"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#E63946] focus:ring-2 focus:ring-[#E63946]/20 outline-none text-sm"
              />
            </div>

            {/* Field 3: Position / Profession */}
            <div>
              <label className="text-xs font-bold text-gray-700 mb-1 flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5 text-[#E63946]" /> Cargo o Especialidad *
              </label>
              <select
                required
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#E63946] focus:ring-2 focus:ring-[#E63946]/20 outline-none text-sm bg-white"
              >
                <option value="">Selecciona tu especialidad...</option>
                <option value="Instalador de Vidrio y Aluminio">Instalador de Vidrio y Aluminio</option>
                <option value="Maestro de Obra / Oficial Civil">Maestro de Obra / Oficial Civil</option>
                <option value="Técnico en Domótica e Instalaciones">Técnico en Domótica e Instalaciones</option>
                <option value="Ingeniero de Proyectos / Arquitecto">Ingeniero de Proyectos / Arquitecto</option>
                <option value="Auxiliar Operativo / Ayudante">Auxiliar Operativo / Ayudante</option>
                <option value="Asesor Comercial / Ejecutivo">Asesor Comercial / Ejecutivo</option>
                <option value="Otro perfil">Otro perfil profesional</option>
              </select>
            </div>

            {/* Field 4: File Attachment */}
            <div>
              <label className="text-xs font-bold text-gray-700 mb-1 flex items-center gap-1.5">
                <Paperclip className="w-3.5 h-3.5 text-[#E63946]" /> Adjuntar Hoja de Vida / CV (PDF, DOCX, Imagen)
              </label>
              <div className="relative border-2 border-dashed border-gray-200 hover:border-[#E63946] rounded-2xl p-4 text-center transition-colors bg-gray-50/50">
                <input
                  type="file"
                  accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                  onChange={handleFileChange}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                />
                {attachedFile ? (
                  <div className="flex items-center justify-center gap-2 text-emerald-600 font-semibold text-xs">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{attachedFile.name} ({(attachedFile.size / 1024).toFixed(0)} KB)</span>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <Paperclip className="w-6 h-6 text-gray-400 mx-auto" />
                    <p className="text-xs font-semibold text-gray-600">Haz clic o arrastra tu archivo aquí</p>
                    <p className="text-[10px] text-gray-400">PDF, Word o imagen hasta 15MB</p>
                  </div>
                )}
              </div>
            </div>

            {/* Field 5: Notes */}
            <div>
              <label className="text-xs font-bold text-gray-700 mb-1 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-[#E63946]" /> Experiencia o comentarios adicionales
              </label>
              <textarea
                rows={2}
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                placeholder="Cuéntanos brevemente sobre tu experiencia laboral..."
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#E63946] focus:ring-2 focus:ring-[#E63946]/20 outline-none text-sm resize-none"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-[#25D366] hover:bg-[#1ebe57] text-white font-bold rounded-xl text-sm shadow-lg shadow-[#25D366]/25 transition-all"
              >
                <Send className="w-4 h-4" />
                <span>Enviar Hoja de Vida por WhatsApp</span>
              </button>
              <p className="text-[10px] text-gray-400 text-center mt-2">
                Al hacer clic, se abrirá WhatsApp con tus datos preparados para enviarse a nuestro equipo de Selección.
              </p>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
