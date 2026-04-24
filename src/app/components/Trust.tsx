import { Shield, Users, Award, Clock } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function Trust() {
  const stats = [
    {
      icon: Clock,
      value: '+10',
      label: 'Años de experiencia',
      color: '#E63946'
    },
    {
      icon: Users,
      value: '50+',
      label: 'Profesionales certificados',
      color: '#F77F00'
    },
    {
      icon: Award,
      value: '+500',
      label: 'Proyectos completados',
      color: '#06D6A0'
    },
    {
      icon: Shield,
      value: '100%',
      label: 'Garantía de calidad',
      color: '#457B9D'
    }
  ];
  
  const certifications = [
    'ISO 9001:2015 - Gestión de Calidad',
    'ISO 14001 - Gestión Ambiental',
    'OHSAS 18001 - Seguridad y Salud',
    'Certificación en Construcción Sostenible'
  ];
  
  return (
    <section className="py-24 bg-[#1a1a1a] text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(45deg, #404040 25%, transparent 25%), linear-gradient(-45deg, #404040 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #404040 75%), linear-gradient(-45deg, transparent 75%, #404040 75%)',
          backgroundSize: '20px 20px',
          backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
        }} />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Side - Content */}
          <div>
            <div className="inline-block px-4 py-1 bg-[#06D6A0]/10 border border-[#06D6A0]/30 rounded-sm mb-6">
              <span className="text-[#06D6A0] font-semibold text-sm">CONFIANZA Y EXPERIENCIA</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Una década construyendo
              <span className="block text-[#E63946]">el futuro</span>
            </h2>
            
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              En INALUMH, cada proyecto es un compromiso con la excelencia. Nuestro equipo de 
              profesionales altamente capacitados garantiza resultados que superan expectativas.
            </p>
            
            {/* Certifications */}
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4">Certificaciones y estándares</h3>
              <ul className="space-y-3">
                {certifications.map((cert, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-[#06D6A0] flex-shrink-0" />
                    <span className="text-gray-300">{cert}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          {/* Right Side - Stats & Image */}
          <div>
            {/* Team Image */}
            <div className="relative mb-8 overflow-hidden rounded-sm">
              <ImageWithFallback
                src="/images/mantenimiento_y_especiales_Pequeno.jpg"
                alt="Equipo INALUMH"
                className="w-full h-64 object-cover grayscale hover:grayscale-0 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] to-transparent" />
            </div>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <div 
                    key={idx}
                    className="bg-[#2a2a2a] p-6 border-l-4 hover:bg-[#333333] transition-colors"
                    style={{ borderColor: stat.color }}
                  >
                    <Icon className="w-8 h-8 mb-3" style={{ color: stat.color }} />
                    <div className="text-3xl font-bold mb-1">{stat.value}</div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
