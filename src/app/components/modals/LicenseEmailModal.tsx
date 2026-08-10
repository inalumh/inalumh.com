import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Building2, 
  Paperclip, 
  Send, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  FileText, 
  CheckCircle2, 
  AlertCircle,
  Trash2,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import emailjs from '@emailjs/browser';
import { supabase } from '../../../lib/supabase';
import { toast } from 'sonner';

interface LicenseEmailModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LicenseEmailModal({ isOpen, onClose }: LicenseEmailModalProps) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [modality, setModality] = useState('Obra Nueva');
  const [address, setAddress] = useState('');
  const [message, setMessage] = useState('');
  const [attachedFile, setAttachedFile] = useState<File | null>(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const modalitiesList = [
    'Obra Nueva (Modalidad 01)',
    'Ampliación (Modalidad 02)',
    'Adecuación / Cambio de Uso (Modalidad 03)',
    'Modificación Interior/Exterior (Modalidad 04)',
    'Restauración / Patrimonio (Modalidad 05)',
    'Reforzamiento Estructural NSR-10 (Modalidad 06)',
    'Demolición Total o Parcial (Modalidad 07)',
    'Cerramiento de Predio (Modalidad 08)',
    'Reconstrucción por Siniestros (Modalidad 09)',
    'Reconocimiento de Edificaciones (Legalización)',
    'Consulta General / Asesoría Urbanística (POT)'
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      // Limit file size to ~15MB
      if (file.size > 15 * 1024 * 1024) {
        setErrorMsg('El archivo supera el límite de 15MB. Selecciona un archivo o plano más liviano.');
        return;
      }
      setErrorMsg('');
      setAttachedFile(file);
    }
  };

  const removeFile = () => {
    setAttachedFile(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim() || !phone.trim() || !message.trim()) {
      setErrorMsg('Por favor completa todos los campos obligatorios (*).');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    const fileDetailsText = attachedFile 
      ? `📄 Archivo Adjunto Registrado: ${attachedFile.name} (${(attachedFile.size / 1024).toFixed(0)} KB)`
      : '📄 Sin archivo adjunto previo';

    const fullFormattedMsg = 
      `🏛️ SOLICITUD DE ASESORÍA DE LICENCIA DE CONSTRUCCIÓN\n\n` +
      `👤 Nombre: ${fullName}\n` +
      `📧 Correo: ${email}\n` +
      `📞 Teléfono / WhatsApp: ${phone}\n` +
      `🏗️ Modalidad de Licencia: ${modality}\n` +
      `📍 Dirección / Ubicación: ${address || 'No especificada'}\n` +
      `${fileDetailsText}\n\n` +
      `📝 Consulta / Detalles del Proyecto:\n${message}`;

    let dbSaved = false;
    let emailSent = false;

    // 1. Guardar consulta en Supabase
    try {
      const { error: dbError } = await supabase
        .from('mensajes_contacto')
        .insert([
          {
            nombre: `${fullName} [LICENCIA: ${modality}]`,
            email: email,
            mensaje: fullFormattedMsg
          }
        ]);

      if (!dbError) {
        dbSaved = true;
      } else {
        console.warn('[Supabase] No se pudo guardar:', dbError.message);
      }
    } catch (err) {
      console.warn('[Supabase] Error de red o conexión:', err);
    }

    // 2. Intentar enviar con EmailJS
    try {
      const serviceId  = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      if (serviceId && templateId && publicKey) {
        await emailjs.send(
          serviceId,
          templateId,
          {
            from_name: `${fullName} (${modality})`,
            reply_to: email,
            phone: phone,
            message: fullFormattedMsg,
          },
          publicKey
        );
        emailSent = true;
      }
    } catch (err) {
      console.error('[EmailJS] Error al enviar email:', err);
    }

    setLoading(false);

    if (emailSent || dbSaved) {
      toast.success('¡Consulta de Licencia enviada correctamente! Un arquitecto revisará tu caso.');
      // Open mailto as helper if user wants native mail receipt, or reset and close
      onClose();
    } else {
      // Fallback if services are offline: open direct mailto link
      const mailtoSubject = encodeURIComponent(`Solicitud de Licencia de Construcción: ${modality} - ${fullName}`);
      const mailtoBody = encodeURIComponent(fullFormattedMsg);
      window.location.href = `mailto:inalumh@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`;
      toast.info('Se ha abierto tu aplicación de correo para enviar la consulta.');
      onClose();
    }
  };

  const handleDirectMailto = () => {
    const fileDetailsText = attachedFile 
      ? `📄 Archivo para adjuntar: ${attachedFile.name} (${(attachedFile.size / 1024).toFixed(0)} KB)`
      : '';

    const bodyText = 
      `Solicitud de Licencia de Construcción - INALUMH S.A.S.\n\n` +
      `Nombre: ${fullName || '---'}\n` +
      `Teléfono: ${phone || '---'}\n` +
      `Modalidad: ${modality}\n` +
      `Dirección: ${address || '---'}\n` +
      `${fileDetailsText}\n\n` +
      `Consulta:\n${message || '---'}\n\n` +
      `(Recuerda adjuntar el archivo ${attachedFile?.name || 'técnico'} en este correo)`;

    const mailtoSubject = encodeURIComponent(`Consulta Licencia de Construcción: ${modality}`);
    const mailtoBody = encodeURIComponent(bodyText);
    window.location.href = `mailto:inalumh@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`;
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
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 my-auto z-10 text-gray-800"
        >
          {/* Top Decorative Gradient Accent */}
          <div className="h-3 bg-gradient-to-r from-[#E63946] via-[#F77F00] to-[#00A8E8]" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 text-gray-400 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors z-20"
            aria-label="Cerrar"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Header */}
          <div className="p-6 sm:p-8 pb-4 border-b border-gray-100">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-11 h-11 rounded-2xl bg-[#E63946]/10 text-[#E63946] flex items-center justify-center font-bold shadow-sm">
                <Building2 className="w-6 h-6 text-[#E63946]" />
              </div>
              <div>
                <span className="text-xs font-extrabold uppercase tracking-wider text-[#E63946] flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Curaduría Urbana & Norma POT
                </span>
                <h2 className="text-2xl font-extrabold text-[#1a1a1a]">
                  Consulta por Correo — Licencias de Construcción
                </h2>
              </div>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed">
              Completa el formulario y adjunta tus planos o requerimientos para realizar la revisión previa de norma técnica y viabilidad de tu proyecto.
            </p>
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-4 max-h-[75vh] overflow-y-auto">
            {errorMsg && (
              <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2.5">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                <span>{errorMsg}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                  placeholder="Ej: Ing. Carlos Rodríguez"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#E63946] focus:ring-2 focus:ring-[#E63946]/20 outline-none text-sm bg-gray-50/30"
                />
              </div>

              {/* Field 2: Email */}
              <div>
                <label className="text-xs font-bold text-gray-700 mb-1 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-[#E63946]" /> Correo Electrónico *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ejemplo@correo.com"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#E63946] focus:ring-2 focus:ring-[#E63946]/20 outline-none text-sm bg-gray-50/30"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Field 3: Phone / WhatsApp */}
              <div>
                <label className="text-xs font-bold text-gray-700 mb-1 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#E63946]" /> Teléfono / WhatsApp *
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Ej: +57 310 123 4567"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#E63946] focus:ring-2 focus:ring-[#E63946]/20 outline-none text-sm bg-gray-50/30"
                />
              </div>

              {/* Field 4: Modality Selection */}
              <div>
                <label className="text-xs font-bold text-gray-700 mb-1 flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-[#E63946]" /> Modalidad de Licencia *
                </label>
                <select
                  required
                  value={modality}
                  onChange={(e) => setModality(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:border-[#E63946] focus:ring-2 focus:ring-[#E63946]/20 outline-none text-xs sm:text-sm bg-white font-medium text-gray-800"
                >
                  {modalitiesList.map((m, idx) => (
                    <option key={idx} value={m}>{m}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Field 5: Property Address */}
            <div>
              <label className="text-xs font-bold text-gray-700 mb-1 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#E63946]" /> Dirección o Ubicación del Inmueble / Ciudad
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Ej: Cra 15 #93-40, Bogotá D.C."
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#E63946] focus:ring-2 focus:ring-[#E63946]/20 outline-none text-sm bg-gray-50/30"
              />
            </div>

            {/* Field 6: Consultation Message */}
            <div>
              <label className="text-xs font-bold text-gray-700 mb-1 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-[#E63946]" /> Descripción del Proyecto o Consulta Técnica *
              </label>
              <textarea
                rows={3}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Describe tu proyecto, metros cuadrados aproximados, uso previsto (residencial, comercial) o estado actual..."
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#E63946] focus:ring-2 focus:ring-[#E63946]/20 outline-none text-sm resize-none bg-gray-50/30"
              />
            </div>

            {/* Field 7: Attachment Input */}
            <div>
              <label className="text-xs font-bold text-gray-700 mb-1 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Paperclip className="w-3.5 h-3.5 text-[#E63946]" /> Adjuntar Archivos o Planos (Opcional)
                </span>
                <span className="text-[10px] text-gray-400 font-normal">PDF, DWG, ZIP, JPG, PNG (Hasta 15MB)</span>
              </label>
              
              {attachedFile ? (
                <div className="flex items-center justify-between p-3.5 bg-emerald-50 border border-emerald-200 rounded-2xl">
                  <div className="flex items-center gap-2.5 overflow-hidden">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    <div className="truncate">
                      <p className="text-xs font-bold text-emerald-800 truncate">{attachedFile.name}</p>
                      <p className="text-[10px] text-emerald-600">{(attachedFile.size / 1024).toFixed(0)} KB</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={removeFile}
                    className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors ml-2"
                    title="Eliminar archivo"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="relative border-2 border-dashed border-gray-200 hover:border-[#E63946] rounded-2xl p-4 text-center transition-colors bg-gray-50/40 group">
                  <input
                    type="file"
                    accept=".pdf,.dwg,.doc,.docx,.zip,.rar,.png,.jpg,.jpeg"
                    onChange={handleFileChange}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
                  />
                  <div className="space-y-1 pointer-events-none">
                    <Paperclip className="w-6 h-6 text-gray-400 group-hover:text-[#E63946] transition-colors mx-auto" />
                    <p className="text-xs font-semibold text-gray-700">Selecciona o arrastra tus planos aquí</p>
                    <p className="text-[10px] text-gray-400">Archivos permitidos: PDF, AutoCAD (DWG), Word, imágenes o ZIP</p>
                  </div>
                </div>
              )}
            </div>

            {/* Submit & Action Buttons */}
            <div className="pt-3 space-y-2.5">
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-[#E63946] hover:bg-[#d32f3c] text-white font-bold rounded-xl text-sm shadow-lg shadow-[#E63946]/25 transition-all disabled:opacity-50 cursor-pointer"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Enviando consulta...
                  </span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Enviar Consulta Técnica por Correo</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleDirectMailto}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl text-xs transition-all border border-gray-200 cursor-pointer"
              >
                <ExternalLink className="w-3.5 h-3.5 text-gray-500" />
                <span>Abrir pre-llenado en mi cliente de correo local (`mailto`)</span>
              </button>

              <p className="text-[10px] text-gray-400 text-center leading-tight">
                Al enviar, tu consulta se remite directamente al departamento de arquitectura e ingeniería de INALUMH S.A.S.
              </p>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
