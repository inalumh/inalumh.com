import React, { useState } from 'react';
import { LicenseEmailModal } from './modals/LicenseEmailModal';
import { 
  Building2, 
  FileCheck, 
  Ruler, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  PhoneCall, 
  Sparkles,
  Home,
  Maximize2,
  Settings2,
  PenTool,
  Landmark,
  ShieldAlert,
  Trash2,
  Grid,
  RotateCcw,
  FileText
} from 'lucide-react';
import { motion } from 'motion/react';

export function LicensingSection() {
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);

  const licenseModalities = [
    {
      number: '01',
      icon: Home,
      title: 'Obra Nueva',
      color: '#E63946',
      badge: 'Construcción Total',
      description: 'Autorización para desarrollar construcciones desde cero en predios no edificados o lotes urbanizados.'
    },
    {
      number: '02',
      icon: Maximize2,
      title: 'Ampliación',
      color: '#F77F00',
      badge: 'Mayor Área',
      description: 'Incremento del área construida en edificaciones existentes cumpliendo índices de ocupación y altura.'
    },
    {
      number: '03',
      icon: Settings2,
      title: 'Adecuación',
      color: '#00A8E8',
      badge: 'Cambio de Uso',
      description: 'Adaptación del uso de un inmueble (residencial, comercial, oficinas o servicios) manteniendo la estructura.'
    },
    {
      number: '04',
      icon: PenTool,
      title: 'Modificación',
      color: '#7B2CBF',
      badge: 'Diseño Interior',
      description: 'Variación del diseño arquitectónico o estructural interno/externo sin incrementar el área construida.'
    },
    {
      number: '05',
      icon: Landmark,
      title: 'Restauración',
      color: '#457B9D',
      badge: 'Patrimonio',
      description: 'Intervención técnica para recuperar y conservar edificaciones con valor histórico o patrimonial.'
    },
    {
      number: '06',
      icon: ShieldAlert,
      title: 'Reforzamiento Estructural',
      color: '#06D6A0',
      badge: 'Norma NSR-10',
      description: 'Adecuación de la estructura existente a las normas técnicas sismorresistentes colombianas (NSR-10).'
    },
    {
      number: '07',
      icon: Trash2,
      title: 'Demolición',
      color: '#E63946',
      badge: 'Total o Parcial',
      description: 'Derribo total o parcial de edificaciones existentes para la preparación de nuevos desarrollos.'
    },
    {
      number: '08',
      icon: Grid,
      title: 'Cerramiento',
      color: '#F77F00',
      badge: 'Delimitación',
      description: 'Autorización técnica para cercar de forma permanente predios de propiedad privada.'
    },
    {
      number: '09',
      icon: RotateCcw,
      title: 'Reconstrucción',
      color: '#00A8E8',
      badge: 'Recuperación',
      description: 'Volver a edificar estructuras destruidas total o parcialmente por causa de sinistros o eventos de fuerza mayor.'
    }
  ];

  const managementServices = [
    'Elaboración de Planos Arquitectónicos y Estructurales (NSR-10)',
    'Radicación y Tramitología completa ante Curadurías Urbanas',
    'Levantamientos Arquitectónicos y Peritajes de Estado Actual',
    'Estudios de Suelos y Cálculo Estructural Firmado por Ingenieros',
    'Gestión de Reconocimiento de Edificaciones (Legalización)',
    'Asesoría en Viabilidad Urbanística y Uso del Suelo (POT)'
  ];

  const whatsappMessage = encodeURIComponent(
    '¡Hola equipo INALUMH! Quisiera solicitar asesoría técnica para tramitar una Licencia de Construcción ante Curaduría Urbana.'
  );

  return (
    <section id="licencias" className="py-24 bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white relative overflow-hidden">
      {/* Subtle Glowing Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#E63946]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#00A8E8]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#E63946]/15 border border-[#E63946]/30 rounded-full mb-4"
          >
            <Building2 className="w-4 h-4 text-[#E63946]" />
            <span className="text-[#E63946] font-semibold text-sm tracking-wide uppercase">Tramitología & Gestión ante Curaduría Urbana</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4"
          >
            Gestionamos tu <span className="bg-gradient-to-r from-[#E63946] via-[#ff6b6b] to-[#F77F00] bg-clip-text text-transparent">Licencia de Construcción</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            Ofrecemos acompañamiento técnico, arquitectónico y legal completo para la formulación, radicación y aprobación de Licencias de Construcción en Colombia bajo sus <strong>9 modalidades normativas</strong>.
          </motion.p>
        </div>

        {/* Grid of the 9 Modalities */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {licenseModalities.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="bg-white/5 backdrop-blur-md border border-white/10 hover:border-[#E63946]/40 p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#E63946]/10 group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform"
                      style={{ backgroundColor: item.color }}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-white/10 text-gray-300 border border-white/10">
                        Modalidad {item.number}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-xl font-bold text-white group-hover:text-[#E63946] transition-colors">
                      {item.title}
                    </h3>
                  </div>

                  <p className="text-xs text-gray-400 leading-relaxed mt-2">
                    {item.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-semibold text-gray-400">
                  <span>Asesoría ante Curaduría</span>
                  <span style={{ color: item.color }}>{item.badge}</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Big Banner Box for Management & Consulting */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-[#1e293b] via-[#0f172a] to-[#1e293b] border border-white/15 rounded-3xl p-8 md:p-10 shadow-2xl relative overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded-lg text-amber-400 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" /> Equipo Profesional Certificado
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight">
                ¿Necesitas planos, levantamientos o aprobación para tu proyecto?
              </h3>
              <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                Nuestros ingenieros y arquitectos se encargan de la memoria técnica, estudios estructurales, levantamiento de información y seguimiento continuo ante Curadurías Urbanas hasta la expedición final del acto administrativo.
              </p>

              {/* Management services checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {managementServices.map((service, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs sm:text-sm text-gray-200">
                    <CheckCircle2 className="w-4 h-4 text-[#06D6A0] shrink-0" />
                    <span>{service}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Action Callout */}
            <div className="lg:col-span-5 bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col justify-between gap-6 text-center lg:text-left">
              <div>
                <div className="flex items-center justify-center lg:justify-start gap-3 mb-3">
                  <Ruler className="w-7 h-7 text-[#E63946]" />
                  <span className="font-bold text-lg text-white">Canal de Licencias de Construcción</span>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed mb-4">
                  Envíanos la dirección de tu inmueble, plano o requerimiento de obra. Realizamos el estudio preliminar de norma urbana (POT) y viabilidad de la licencia.
                </p>
              </div>

              <div className="space-y-3">
                <a
                  href={`https://wa.me/573133540258?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-[#25D366] hover:bg-[#1ebe57] text-white font-bold rounded-xl transition-all shadow-lg shadow-[#25D366]/20 text-sm"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Consultar Licencia por WhatsApp</span>
                </a>
                <button
                  type="button"
                  onClick={() => setIsEmailModalOpen(true)}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold rounded-xl transition-all text-sm cursor-pointer"
                >
                  <FileText className="w-4 h-4" />
                  <span>Enviar Consulta por Correo</span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* License Consultation Email Modal */}
      <LicenseEmailModal 
        isOpen={isEmailModalOpen} 
        onClose={() => setIsEmailModalOpen(false)} 
      />
    </section>
  );
}
