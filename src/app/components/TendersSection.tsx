import React from 'react';
import { 
  Building2, 
  FileCheck, 
  Award, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  FileText, 
  Briefcase, 
  Users, 
  PhoneCall, 
  HardHat,
  Sparkles
} from 'lucide-react';
import { motion } from 'motion/react';

export function TendersSection() {
  const tenderHighlights = [
    {
      icon: FileCheck,
      title: 'Pliegos & Normatividad',
      description: 'Cumplimiento riguroso de pliegos de condiciones técnicos, jurídicos y financieros para el sector público y privado.'
    },
    {
      icon: Award,
      title: 'Capacidad RUP & Experiencia',
      description: 'Registro Único de Proponentes (RUP) al día con indicadores de capacidad técnica y financiera comprobada.'
    },
    {
      icon: HardHat,
      title: 'Ejecución Industrial & Obra Civil',
      description: 'Capacidad de respuesta para producción masiva de ventanería, fachadas flotantes y desarrollo de obras civiles.'
    },
    {
      icon: ShieldCheck,
      title: 'Garantía & Pólizas de Cumplimiento',
      description: 'Respaldo asegurador completo, pólizas de calidad, responsabilidad civil extracontractual y salud ocupacional (SST).'
    }
  ];

  const tenderCapabilities = [
    'Convocatorias SECOP I y SECOP II',
    'Contratación Corporativa e Institucional',
    'Proyectos Educativos y de Salud',
    'Fachadas & Ventanería a Gran Escala',
    'Remodelación de Edificaciones Públicas',
    'Suministro e Instalación Nacional'
  ];

  const tenderWhatsAppMessage = encodeURIComponent(
    '¡Hola equipo INALUMH! Estoy interesado en invitarlos a participar en una licitación / convocatoria de proyecto. ¿Podemos conversar?'
  );

  return (
    <section id="licitaciones" className="py-24 bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white relative overflow-hidden">
      {/* Background Subtle Elements */}
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
            <Briefcase className="w-4 h-4 text-[#E63946]" />
            <span className="text-[#E63946] font-semibold text-sm tracking-wide uppercase">Licitaciones & Contratos Institucionales</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4"
          >
            Participamos en <span className="bg-gradient-to-r from-[#E63946] via-[#ff6b6b] to-[#F77F00] bg-clip-text text-transparent">Licitaciones Públicas y Privadas</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            Ofrecemos respaldo integral, experiencia en el sector corporativo y estatal, y la capacidad operativa requerida para proyectos de alta complejidad técnica en carpintería metálica, vidrio, obra civil y tecnología.
          </motion.p>
        </div>

        {/* Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {tenderHighlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white/5 backdrop-blur-md border border-white/10 hover:border-[#E63946]/40 p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#E63946]/10 group flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#E63946] to-[#b91c1c] flex items-center justify-center mb-5 text-white shadow-lg shadow-[#E63946]/30 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-white group-hover:text-[#E63946] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Big Banner Box for Bidding invitations */}
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
                <Sparkles className="w-3.5 h-3.5" /> Solidez & Responsabilidad Garantizada
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight">
                ¿Tienes una convocatoria o pliego de condiciones en curso?
              </h3>
              <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                Revisamos tus requerimientos técnicos, memorias descriptivas y cuadro de cantidades para estructurar ofertas altamente competitivas con estrictos estándares de ingeniería.
              </p>

              {/* Capabilities checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {tenderCapabilities.map((cap, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-gray-200">
                    <CheckCircle2 className="w-4 h-4 text-[#06D6A0] shrink-0" />
                    <span>{cap}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Action Callout */}
            <div className="lg:col-span-5 bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col justify-between gap-6 text-center lg:text-left">
              <div>
                <div className="flex items-center justify-center lg:justify-start gap-3 mb-3">
                  <Building2 className="w-7 h-7 text-[#E63946]" />
                  <span className="font-bold text-lg text-white">Canal para Licitaciones</span>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed mb-4">
                  Envíanos tus pliegos, planos o solicitudes de cotización institucional. Nuestro departamento comercial e ingenieros de proyectos se pondrán en contacto de inmediato.
                </p>
              </div>

              <div className="space-y-3">
                <a
                  href={`https://wa.me/573133540258?text=${tenderWhatsAppMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-[#25D366] hover:bg-[#1ebe57] text-white font-bold rounded-xl transition-all shadow-lg shadow-[#25D366]/20 text-sm"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Enviar Pliego por WhatsApp</span>
                </a>
                <a
                  href="mailto:comercial@inalumh.com?subject=Invitación%20a%20Licitación%20/%20Proyecto%20Corporativo"
                  className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold rounded-xl transition-all text-sm"
                >
                  <FileText className="w-4 h-4" />
                  <span>Enviar por Correo Electrónico</span>
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
