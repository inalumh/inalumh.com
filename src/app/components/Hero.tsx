import { ArrowRight } from 'lucide-react';
import { Button } from './Button';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function Hero() {
  return (
    <section id="inicio" className="relative h-screen min-h-[600px] flex items-center">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <ImageWithFallback
          src="/images/construction_bg_Grande.jpg"
          alt="Modern Construction"
          className="w-full h-full object-cover"
        />
        {/* Grayscale + Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" 
             style={{ mixBlendMode: 'normal' }} />
        <div className="absolute inset-0 bg-black/20" style={{ backdropFilter: 'grayscale(100%)' }} />
      </div>
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-[#E63946]/10 border border-[#E63946]/30 px-4 py-2 rounded-sm mb-6">
            <div className="w-2 h-2 bg-[#E63946] rounded-full animate-pulse" />
            <span className="text-white text-sm font-medium">+10 años de experiencia</span>
          </div>
          
          {/* Main Heading */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Construcción y renovación 
            <span className="block text-[#E63946] mt-2">de excelencia</span>
          </h1>
          
          {/* Description */}
          <p className="text-xl text-gray-300 mb-8 max-w-2xl leading-relaxed">
            Especialistas en vidrio-aluminio, obra civil y proyectos especiales. 
            Transformamos espacios con profesionalismo y experiencia técnica.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="primary" size="lg" onClick={() => window.open('/cotizador', '_self')}>
              Solicitar cotización
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button 
            variant="outline" 
            size="lg"
            onClick={() => window.open('./docs/brochure.pdf', '_blank')}
            >
              Ver Proyectos
            </Button>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-16 pt-8 border-t border-white/20">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-white mb-1">+10</div>
              <div className="text-sm text-gray-400">Años de experiencia</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-white mb-1">+500</div>
              <div className="text-sm text-gray-400">Proyectos completados</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-white mb-1">100%</div>
              <div className="text-sm text-gray-400">Clientes satisfechos</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
