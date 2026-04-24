import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  const services = [
    'Vidrio - Aluminio',
    'Obra Civil y Acabados',
    'Mantenimiento',
    'Proyectos Especiales'
  ];
  
  const links = [
    'Sobre nosotros',
    'Proyectos',
    'Certificaciones',
    'Blog',
    'Trabaja con nosotros'
  ];
  
  const social = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' }
  ];
  
  return (
    <footer id="contacto" className="bg-[#1a1a1a] text-gray-300">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-[#E63946] flex items-center justify-center">
                <span className="text-white font-bold text-xl">I</span>
              </div>
              <div>
                <div className="text-xl font-bold text-white leading-none">INALUMH</div>
                <div className="text-xs text-gray-400 leading-none mt-0.5">Construcción & Renovación</div>
              </div>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Más de 10 años transformando espacios con profesionalismo, 
              experiencia técnica y compromiso con la excelencia.
            </p>
            <div className="flex gap-3">
              {social.map((item) => {
                const Icon = item.icon;
                return (
                  <a 
                    key={item.label}
                    href={item.href}
                    className="w-10 h-10 bg-[#2a2a2a] hover:bg-[#E63946] flex items-center justify-center transition-colors"
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
            <h3 className="text-white font-bold text-lg mb-6">Servicios</h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <a href="#servicios" className="text-gray-400 hover:text-[#E63946] transition-colors">
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Enlaces</h3>
            <ul className="space-y-3">
              {links.map((link) => (
                <li key={link}>
                  <a href="#" className="text-gray-400 hover:text-[#E63946] transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Contacto</h3>
            <ul className="space-y-4">
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
                  +57 313 3540258
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
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              © {currentYear} INALUMH. Todos los derechos reservados.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-gray-500 hover:text-[#E63946] transition-colors">
                Política de privacidad
              </a>
              <a href="#" className="text-gray-500 hover:text-[#E63946] transition-colors">
                Términos y condiciones
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
