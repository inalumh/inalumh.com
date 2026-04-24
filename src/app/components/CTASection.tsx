import { ArrowRight, Phone, Mail, Calculator } from 'lucide-react';
import { Link } from 'react-router-dom';

export function CTASection() {
  return (
    <section className="py-24 bg-gradient-to-br from-[#E63946] to-[#d32f3c] text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
      </div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          ¿Listo para iniciar tu proyecto?
        </h2>
        
        <p className="text-xl mb-12 text-white/90 max-w-2xl mx-auto">
          Nuestro equipo está preparado para convertir tu visión en realidad. 
          Solicita una cotización sin compromiso y descubre por qué somos líderes en construcción.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link
            to="/cotizador"
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold bg-white text-[#E63946]
             hover:bg-white/90 transition-all duration-300 rounded-sm shadow-lg hover:shadow-xl gap-2"
          >
            <Calculator className="w-5 h-5" />
            Cotizar mi proyecto
            <ArrowRight className="w-5 h-5" />
          </Link>
          <button className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold bg-white/10 text-white
           hover:bg-white/20 transition-all duration-300 rounded-sm backdrop-blur-sm border border-white/30"
           onClick={() => window.location.href = './docs/brochure.pdf'}
           >
            Ver catálogo de servicios
          </button>
        </div>
        
        {/* Contact Info */}
        <div className="flex flex-col sm:flex-row gap-8 justify-center items-center pt-8 border-t border-white/20">
          <a href="tel:+123456789" className="flex items-center gap-3 text-white hover:text-white/80 transition-colors">
            <div className="w-12 h-12 bg-white/10 rounded-sm flex items-center justify-center backdrop-blur-sm">
              <Phone className="w-6 h-6" />
            </div>
            <div className="text-left">
              <div className="text-sm text-white/70">Llámanos</div>
              <div className="font-semibold">+57 (313) 354-0258</div>
            </div>
          </a>
          
          <a href="mailto:contacto@inalumh.com" className="flex items-center gap-3 text-white hover:text-white/80 transition-colors">
            <div className="w-12 h-12 bg-white/10 rounded-sm flex items-center justify-center backdrop-blur-sm">
              <Mail className="w-6 h-6" />
            </div>
            <div className="text-left">
              <div className="text-sm text-white/70">Escríbenos</div>
              <div className="font-semibold">inalumh@gmail.com</div>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
