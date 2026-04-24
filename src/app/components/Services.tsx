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
      imageSrc: '/images/vidrio.jpeg',
      galleryImages: [
        { src: '/images/argenta1.jpg', alt: 'Proyecto Argenta - Fachada de aluminio' },
        { src: '/images/argenta2.jpg', alt: 'Proyecto Argenta - Ventanales' },
        { src: '/images/argenta3.jpg', alt: 'Proyecto Argenta - Detalle de vidrio' },
        { src: '/images/argenta4.jpg', alt: 'Proyecto Argenta - Vista exterior' },
        { src: '/images/argenta5.jpg', alt: 'Proyecto Argenta - Acabados' },
        { src: '/images/torre_markis1.jpg', alt: 'Torre Markis - Fachada' },
        { src: '/images/torre_markis2.jpg', alt: 'Torre Markis - Ventanería' },
        { src: '/images/torre_markis3.jpg', alt: 'Torre Markis - Detalle' },
        { src: '/images/torre_markis4.jpg', alt: 'Torre Markis - Vista general' },
        { src: '/images/torre_markis5.jpg', alt: 'Torre Markis - Acabados' },
        { src: '/images/ovale_markis1.jpg', alt: 'Ovale Markis - Fachada de vidrio' },
        { src: '/images/ovale_markis2.jpg', alt: 'Ovale Markis - Instalación' },
        { src: '/images/ovale_markis3.jpg', alt: 'Ovale Markis - Detalle' },
        { src: '/images/ovale_markis4.jpg', alt: 'Ovale Markis - Vista exterior' },
        { src: '/images/ovale_markis5.jpg', alt: 'Ovale Markis - Acabados' },
      ]
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
      imageSrc: '/images/conjunto_maipore1.jpg',
      galleryImages: [
        { src: '/images/conjunto_maipore1.jpg', alt: 'Conjunto Maipore - Vista general' },
        { src: '/images/conjunto_maipore2.jpg', alt: 'Conjunto Maipore - Estructura' },
        { src: '/images/conjunto_maipore3.jpg', alt: 'Conjunto Maipore - Acabados' },
        { src: '/images/conjunto_maipore4.jpg', alt: 'Conjunto Maipore - Detalle' },
        { src: '/images/conjunto_maipore5.jpg', alt: 'Conjunto Maipore - Exterior' },
        { src: '/images/casa_chia1.jpg', alt: 'Casa Chía - Fachada' },
        { src: '/images/casa_chia2.jpg', alt: 'Casa Chía - Interior' },
        { src: '/images/casa_chia3.jpg', alt: 'Casa Chía - Acabados' },
        { src: '/images/casa_chia4.jpg', alt: 'Casa Chía - Detalle' },
        { src: '/images/casa_chia5.jpg', alt: 'Casa Chía - Vista general' },
        { src: '/images/torre_bucaramanga1.jpg', alt: 'Torre Bucaramanga - Fachada' },
        { src: '/images/torre_bucaramanga2.jpg', alt: 'Torre Bucaramanga - Estructura' },
        { src: '/images/torre_bucaramanga3.jpg', alt: 'Torre Bucaramanga - Detalle' },
        { src: '/images/torre_bucaramanga4.jpg', alt: 'Torre Bucaramanga - Interior' },
        { src: '/images/torre_bucaramanga5.jpg', alt: 'Torre Bucaramanga - Vista general' },
      ]
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
      imageSrc: '/images/conjunto_maipore4.jpg',
      galleryImages: [
        { src: '/images/gran_reserva1.jpg', alt: 'Gran Reserva - Mantenimiento exterior' },
        { src: '/images/gran_reserva2.jpg', alt: 'Gran Reserva - Restauración' },
        { src: '/images/gran_reserva3.jpg', alt: 'Gran Reserva - Detalle' },
        { src: '/images/gran_reserva4.jpg', alt: 'Gran Reserva - Acabados' },
        { src: '/images/gran_reserva5.jpg', alt: 'Gran Reserva - Vista general' },
        { src: '/images/la_montana1.jpg', alt: 'La Montaña - Mantenimiento' },
        { src: '/images/la_montana2.jpg', alt: 'La Montaña - Reparación' },
        { src: '/images/la_montana3.jpg', alt: 'La Montaña - Detalle' },
        { src: '/images/la_montana4.jpg', alt: 'La Montaña - Restauración' },
        { src: '/images/la_montana5.jpg', alt: 'La Montaña - Vista general' },
        { src: '/images/guasca1.jpg', alt: 'Guasca - Mantenimiento' },
        { src: '/images/guasca2.jpg', alt: 'Guasca - Reparación' },
        { src: '/images/guasca3.jpg', alt: 'Guasca - Detalle' },
        { src: '/images/guasca4.jpg', alt: 'Guasca - Restauración' },
        { src: '/images/guasca5.jpg', alt: 'Guasca - Vista general' },
      ]
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
      imageSrc: '/images/especiales.jpeg',
      galleryImages: [
        { src: '/images/multiimpresos1.jpg', alt: 'Multiimpresos - Proyecto especial' },
        { src: '/images/multiimpresos2.jpg', alt: 'Multiimpresos - Diseño personalizado' },
        { src: '/images/multiimpresos3.jpg', alt: 'Multiimpresos - Detalle' },
        { src: '/images/multiimpresos4.jpg', alt: 'Multiimpresos - Interior' },
        { src: '/images/multiimpresos5.jpg', alt: 'Multiimpresos - Vista general' },
        { src: '/images/oficina_credito1.jpg', alt: 'Oficina de Crédito - Diseño' },
        { src: '/images/oficina_credito2.jpg', alt: 'Oficina de Crédito - Interior' },
        { src: '/images/oficina_credito3.jpg', alt: 'Oficina de Crédito - Detalle' },
        { src: '/images/oficina_credito4.jpg', alt: 'Oficina de Crédito - Acabados' },
        { src: '/images/oficina_credito5.jpg', alt: 'Oficina de Crédito - Vista general' },
        { src: '/images/mesa_yeguas1.jpg', alt: 'Mesa de Yeguas - Proyecto especial' },
        { src: '/images/mesa_yeguas2.jpg', alt: 'Mesa de Yeguas - Construcción' },
        { src: '/images/mesa_yeguas3.jpg', alt: 'Mesa de Yeguas - Detalle' },
        { src: '/images/mesa_yeguas4.jpg', alt: 'Mesa de Yeguas - Acabados' },
        { src: '/images/mesa_yeguas5.jpg', alt: 'Mesa de Yeguas - Vista general' },
      ]
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
