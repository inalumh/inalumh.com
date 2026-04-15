import { ArrowLeft, Cpu, ShieldCheck, Wifi, Home, Zap, Server, Database, Phone, Mail, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { HabitatContact } from '../components/habitat-iq/HabitatContact';
import { Button } from '../components/ui/button';
import { WhatsAppButton } from '../components/WhatsAppButton';

export default function HabitatPage() {
  const allServices = [
    {
      icon: Home,
      title: 'Domótica Premium',
      description: 'Automatización total de iluminación, persianas, y sistemas de entretenimiento.',
      details: ['Control por voz (Alexa/Siri)', 'Escenas personalizadas', 'Gestión energética eficiente']
    },
    {
      icon: ShieldCheck,
      title: 'Seguridad Inteligente',
      description: 'Monitoreo 24/7 con cámaras 4K, sensores de movimiento y alertas al celular.',
      details: ['CCTV HD Noctu rno', 'Cierres biométricos', 'Alarmas perimetrales']
    },
    {
      icon: Wifi,
      title: 'Conectividad & Redes',
      description: 'Infraestructura de red profesional para señal estable en cada rincón.',
      details: ['Routers Mesh Empresariales', 'Cableado Estructurado', 'VPNs Seguras']
    },
    {
      icon: Server,
      title: 'Servidores & Datacenters',
      description: 'Instalación y mantenimiento de racks de comunicaciones y servidores físicos.',
      details: ['Gestión de Racks', 'Backup local y nube', 'Sistemas de enfriamiento']
    }
  ];

  return (
    <div className="min-h-screen bg-[#0a192f] text-white">
      {/* Navigation / Header */}
      <nav className="fixed top-0 w-full z-50 bg-[#020617]/80 backdrop-blur-md border-b border-white/5 py-4 px-6 md:px-12 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Link to="/" className="w-10 h-10 bg-[#00A8E8] flex items-center justify-center text-white rounded-md">
            <Cpu className="w-6 h-6" />
          </Link>
          <span className="text-xl font-bold tracking-tighter">HABITAT <span className="text-[#00A8E8]">IQ</span></span>
        </div>
        <Link to="/">
          <Button variant="ghost" className="text-gray-400 hover:text-white border border-white/10">
            <ArrowLeft className="mr-2 w-4 h-4" /> Volver a Inalumh
          </Button>
        </Link>
      </nav>

      {/* Hero Section */}
      <header className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full mb-8">
          <Zap className="w-4 h-4 text-cyan-400" />
          <span className="text-cyan-400 font-bold text-xs uppercase tracking-widest">Especialistas en Tecnología</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
          Soluciones Tecnológicas <br />
          <span className="text-[#00A8E8]">Hechas a Medida</span>
        </h1>
        <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
          En Habitat IQ, fusionamos ingeniería de vanguardia con las necesidades cotidianas 
          para crear espacios que no solo funcionan, sino que anticipan tus necesidades.
        </p>
      </header>

      {/* Detailed Services */}
      <section className="py-24 px-6 md:px-12 bg-[#020617]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Portafolio de Servicios IQ</h2>
            <p className="text-gray-400">Excelencia técnica en cada integración.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {allServices.map((s, i) => {
              const Icon = s.icon;
              return (
                <div key={i} className="p-8 bg-white/5 border border-white/10 rounded-3xl hover:bg-white/10 transition-colors group">
                  <div className="w-16 h-16 bg-[#00A8E8]/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Icon className="w-8 h-8 text-[#00A8E8]" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{s.title}</h3>
                  <p className="text-gray-400 mb-6 leading-relaxed">{s.description}</p>
                  <ul className="space-y-3">
                    {s.details.map((d, ci) => (
                      <li key={ci} className="flex items-center gap-3 text-sm text-gray-300">
                        <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full" />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trust / Stats Section */}
      <section className="py-24 px-6 md:px-12 text-center border-t border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <div className="text-5xl font-bold text-[#00A8E8] mb-2">+100</div>
            <div className="text-gray-400 font-bold uppercase tracking-widest text-sm">Proyectos Smart</div>
          </div>
          <div>
            <div className="text-5xl font-bold text-[#00A8E8] mb-2">24/7</div>
            <div className="text-gray-400 font-bold uppercase tracking-widest text-sm">Soporte Técnico</div>
          </div>
          <div>
            <div className="text-5xl font-bold text-[#00A8E8] mb-2">100%</div>
            <div className="text-gray-400 font-bold uppercase tracking-widest text-sm">Satisfacción IQ</div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <HabitatContact />

      <WhatsAppButton
        theme="cyan"
        message="¡Hola! Me interesa conocer más sobre los servicios de Habitat IQ (domótica, seguridad inteligente y redes)."
      />

      {/* Mini Footer */}
      <footer className="py-12 border-t border-white/5 text-center text-gray-500 text-sm">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <Cpu className="w-5 h-5 text-[#00A8E8]" />
            <span className="font-bold text-white tracking-tighter">HABITAT IQ</span>
          </div>
          <div className="flex gap-8">
            <a href="tel:+573133540258" className="hover:text-white transition-colors flex items-center gap-2">
              <Phone className="w-4 h-4" /> +57 313 3540258
            </a>
            <a href="mailto:info@inalumh.com" className="hover:text-white transition-colors flex items-center gap-2">
              <Mail className="w-4 h-4" /> info@inalumh.com
            </a>
          </div>
          <p>© 2024 Inalumh S.A.S. - División Tecnológica</p>
        </div>
      </footer>
    </div>
  );
}
