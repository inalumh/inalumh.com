import React, { useState } from 'react';
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, FileText, Briefcase, ChevronRight } from 'lucide-react';
import { PrivacyPolicyModal } from './modals/PrivacyPolicyModal';
import { TermsConditionsModal } from './modals/TermsConditionsModal';
import { WorkWithUsModal } from './modals/WorkWithUsModal';
import { BrochureModal } from './modals/BrochureModal';

export function Footer() {
  const currentYear = new Date().getFullYear();

  // Modal states
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [isWorkOpen, setIsWorkOpen] = useState(false);
  const [isBrochureOpen, setIsBrochureOpen] = useState(false);

  const services = [
    { label: 'Vidrio - Aluminio', href: '#servicios' },
    { label: 'Obra Civil y Acabados', href: '#servicios' },
    { label: 'Mantenimiento', href: '#servicios' },
    { label: 'Proyectos Especiales', href: '#servicios' },
    { label: 'Licencias de Construcción', href: '#licencias' }
  ];

  const social = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' }
  ];

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const elem = document.getElementById(targetId);
    if (elem) {
      const headerOffset = 80;
      const elementPosition = elem.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <footer id="contacto" className="bg-[#1a1a1a] text-gray-300 relative">
        {/* Main Footer */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Company Info */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-[#E63946] p-1.5 rounded-md flex items-center justify-center">
                  <img src="/images/logo_b_150.png" alt="Inalumh Logo" className="h-8 w-auto object-contain" />
                </div>
                <div>
                  <div className="text-xl font-bold text-white leading-none">INALUMH</div>
                  <div className="text-xs text-gray-400 leading-none mt-1">Construcción & Renovación</div>
                </div>
              </div>
              <p className="text-gray-400 mb-6 leading-relaxed text-sm">
                Más de 10 años transformando espacios con profesionalismo, 
                experiencia técnica y compromiso con la excelencia en construcción, vidrio y tecnología.
              </p>
              <div className="flex gap-3">
                {social.map((item) => {
                  const Icon = item.icon;
                  return (
                    <a 
                      key={item.label}
                      href={item.href}
                      className="w-10 h-10 bg-[#2a2a2a] hover:bg-[#E63946] rounded-xl flex items-center justify-center transition-colors text-white"
                      aria-label={item.label}
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#E63946]" /> Servicios
              </h3>
              <ul className="space-y-3 text-sm">
                {services.map((svc) => (
                  <li key={svc.label}>
                    <a
                      href={svc.href}
                      onClick={(e) => handleScroll(e, svc.href)}
                      className="text-gray-400 hover:text-[#E63946] transition-colors flex items-center gap-1.5 group"
                    >
                      <ChevronRight className="w-3.5 h-3.5 text-gray-600 group-hover:text-[#E63946] transition-colors" />
                      <span>{svc.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Links (Enlaces) */}
            <div>
              <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#E63946]" /> Enlaces
              </h3>
              <ul className="space-y-3.5 text-sm">
                {/* 1. Sobre nosotros -> Abre el Brochure */}
                <li>
                  <button
                    onClick={() => setIsBrochureOpen(true)}
                    className="text-gray-400 hover:text-[#E63946] transition-colors flex items-center gap-2 text-left group"
                  >
                    <FileText className="w-4 h-4 text-[#E63946] group-hover:scale-110 transition-transform" />
                    <span>Sobre nosotros (Brochure)</span>
                  </button>
                </li>

                {/* 2. Proyectos -> Dirige al apartado de servicios */}
                <li>
                  <a
                    href="#servicios"
                    onClick={(e) => handleScroll(e, '#servicios')}
                    className="text-gray-400 hover:text-[#E63946] transition-colors flex items-center gap-2 group"
                  >
                    <ChevronRight className="w-4 h-4 text-[#E63946] group-hover:translate-x-1 transition-transform" />
                    <span>Proyectos (Servicios)</span>
                  </a>
                </li>

                {/* 3. Trabaja con nosotros -> Abre modal emergente con adjunto WhatsApp */}
                <li>
                  <button
                    onClick={() => setIsWorkOpen(true)}
                    className="text-gray-400 hover:text-[#E63946] transition-colors flex items-center gap-2 text-left group"
                  >
                    <Briefcase className="w-4 h-4 text-[#E63946] group-hover:scale-110 transition-transform" />
                    <span>Trabaja con nosotros</span>
                  </button>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#E63946]" /> Contacto
              </h3>
              <ul className="space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#E63946] flex-shrink-0 mt-0.5" />
                  <span className="text-gray-400">
                    Cra 28 #71-89<br />
                    Bogotá, Colombia
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-[#E63946] flex-shrink-0" />
                  <a href="tel:+573133540258" className="text-gray-400 hover:text-[#E63946] transition-colors">
                    +57 313 354 0258
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-[#E63946] flex-shrink-0" />
                  <a href="mailto:inalumh@gmail.com" className="text-gray-400 hover:text-[#E63946] transition-colors">
                    inalumh@gmail.com
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 bg-[#141414]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
              <p className="text-gray-500">
                © {currentYear} INALUMH S.A.S. Todos los derechos reservados.
              </p>
              <div className="flex gap-6">
                <button
                  onClick={() => setIsPrivacyOpen(true)}
                  className="text-gray-400 hover:text-[#E63946] transition-colors underline-offset-4 hover:underline"
                >
                  Política de privacidad
                </button>
                <button
                  onClick={() => setIsTermsOpen(true)}
                  className="text-gray-400 hover:text-[#E63946] transition-colors underline-offset-4 hover:underline"
                >
                  Términos y condiciones
                </button>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Render Modals */}
      <PrivacyPolicyModal isOpen={isPrivacyOpen} onClose={() => setIsPrivacyOpen(false)} />
      <TermsConditionsModal isOpen={isTermsOpen} onClose={() => setIsTermsOpen(false)} />
      <WorkWithUsModal isOpen={isWorkOpen} onClose={() => setIsWorkOpen(false)} />
      <BrochureModal isOpen={isBrochureOpen} onClose={() => setIsBrochureOpen(false)} />
    </>
  );
}
