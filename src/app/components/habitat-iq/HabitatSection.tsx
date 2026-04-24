import { Cpu, ShieldCheck, Wifi, Home, MousePointer2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';

export function HabitatSection() {
  const techServices = [
    {
      icon: Home,
      title: 'Domótica Avanzada',
      description: 'Controla iluminación, clima y accesos desde tu smartphone con sistemas inteligentes integrados.'
    },
    {
      icon: ShieldCheck,
      title: 'Seguridad & CCTV',
      description: 'Sistemas de vigilancia de alta definición con monitoreo remoto y alertas inteligentes en tiempo real.'
    },
    {
      icon: Wifi,
      title: 'Redes & Conectividad',
      description: 'Infraestructura de red de alta velocidad y cobertura total para hogares y oficinas inteligentes.'
    }
  ];

  return (
    <section id="habitat-iq" className="py-24 bg-[#0a192f] text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-blue-500/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-cyan-500/10 blur-[120px] rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content Side */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1 bg-blue-500/20 border border-blue-500/50 rounded-full mb-6">
              <Cpu className="w-4 h-4 text-cyan-400" />
              <span className="text-cyan-400 font-semibold text-xs tracking-widest uppercase">Tecnología & Confort</span>
            </div>
            
            <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
              Habitat <span className="text-[#00A8E8]">IQ</span>: 
              <br />
              El futuro de tu espacio
            </h2>
            
            <p className="text-xl text-gray-300 mb-12 leading-relaxed max-w-xl">
              Integramos soluciones tecnológicas de vanguardia para transformar 
              tu hogar u oficina en un ecosistema inteligente, seguro y eficiente. 
              La tecnología al servicio de tu bienestar.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
              {techServices.map((service, idx) => {
                const Icon = service.icon;
                return (
                  <div key={idx} className="p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all group">
                    <Icon className="w-8 h-8 text-cyan-400 mb-4 group-hover:scale-110 transition-transform" />
                    <h3 className="font-bold mb-2 text-sm">{service.title}</h3>
                    <p className="text-xs text-gray-400 leading-relaxed">{service.description}</p>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/habitat-iq">
                <Button className="w-full sm:w-auto h-12 px-8 bg-[#00A8E8] hover:bg-[#007EA7] text-white font-bold rounded-lg shadow-lg shadow-blue-500/20 transition-all">
                  Explorar Servicios IQ
                  <MousePointer2 className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link to="/cotizador-iq" className="inline-flex items-center justify-center px-8 h-12 text-gray-300 hover:text-white transition-colors border border-white/10 hover:border-white/20 hover:bg-white/5 rounded-lg">
                Cotizar Servicios IQ
              </Link>
            </div>
          </div>

          {/* Visual Side */}
          <div className="relative">
            <div className="aspect-square bg-gradient-to-br from-blue-600/20 to-cyan-400/20 rounded-3xl border border-white/10 p-2 relative overflow-hidden group">
              <img 
                src="https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=1000&auto=format&fit=crop" 
                alt="Smart Home Technology" 
                className="w-full h-full object-cover rounded-2xl opacity-80 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a192f] via-transparent to-transparent" />
              
              {/* Floating Badge */}
              <div className="absolute bottom-8 left-8 right-8 p-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#00A8E8] rounded-full flex items-center justify-center">
                    <MousePointer2 className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-400 uppercase tracking-widest mb-1 font-bold">Lanzamiento</div>
                    <div className="text-lg font-bold">Control total en tus manos</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
