import { Frame, Building2, Wrench, Sparkles } from 'lucide-react';
import { ServiceCard } from './ServiceCard';

export function Services() {
  const services = [
    {
      icon: Frame,
      title: 'Vidrio - Aluminio',
      description: 'Instalación y diseño de sistemas de vidrio templado, ventanas y fachadas de aluminio.',
      features: [
        'Ventanas y puertas de aluminio',
        'Fachadas flotantes',
        'Divisiones de vidrio templado',
        'Barandas y pasamanos'
      ],
      accentColor: '#E63946',
      imageSrc: 'https://images.unsplash.com/photo-1652366643487-a432187cbff8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnbGFzcyUyMGFsdW1pbnVtJTIwd2luZG93cyUyMGZhY2FkZXxlbnwxfHx8fDE3NzQ3NTk1Mjd8MA&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      icon: Building2,
      title: 'Obra Civil - Acabados',
      description: 'Construcción completa y acabados de alta calidad para proyectos residenciales y comerciales.',
      features: [
        'Construcción de estructura',
        'Mampostería y concreto',
        'Acabados interiores y exteriores',
        'Pisos y enchapes'
      ],
      accentColor: '#F77F00',
      imageSrc: 'https://images.unsplash.com/photo-1760775850558-68e24f4c621f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXZpbCUyMGVuZ2luZWVyaW5nJTIwY29uY3JldGUlMjB3b3JrfGVufDF8fHx8MTc3NDc1OTUyN3ww&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      icon: Wrench,
      title: 'Mantenimiento',
      description: 'Servicios integrales de mantenimiento preventivo y correctivo para edificaciones.',
      features: [
        'Mantenimiento preventivo',
        'Reparaciones generales',
        'Pintura y restauración',
        'Impermeabilización'
      ],
      accentColor: '#06D6A0',
      imageSrc: 'https://images.unsplash.com/photo-1763665814605-a6489a3bf2a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidWlsZGluZyUyMG1haW50ZW5hbmNlJTIwcmVub3ZhdGlvbnxlbnwxfHx8fDE3NzQ3NTk1Mjh8MA&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      icon: Sparkles,
      title: 'Especiales',
      description: 'Proyectos personalizados con diseño exclusivo y personal altamente especializado.',
      features: [
        'Diseño arquitectónico personalizado',
        'Proyectos de alta complejidad',
        'Consultoría técnica',
        'Personal especializado certificado'
      ],
      accentColor: '#457B9D',
      imageSrc: 'https://images.unsplash.com/photo-1722274971007-cb39c12a091e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcmNoaXRlY3R1cmFsJTIwZGVzaWduJTIwaW5kdXN0cmlhbHxlbnwxfHx8fDE3NzQ3NTk1Mjh8MA&ixlib=rb-4.1.0&q=80&w=1080'
    }
  ];
  
  return (
    <section id="servicios" className="py-24 bg-[#f5f5f5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1 bg-[#E63946]/10 border border-[#E63946]/30 rounded-sm mb-4">
            <span className="text-[#E63946] font-semibold text-sm">NUESTROS SERVICIOS</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-[#1a1a1a] mb-4">
            Soluciones integrales para
            <span className="block text-[#E63946]">cada necesidad</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Ofrecemos servicios especializados con los más altos estándares de calidad y seguridad
          </p>
        </div>
        
        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, idx) => (
            <ServiceCard key={idx} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
}
