import { useState } from 'react';
import { Mail, Phone, MapPin, Send, Loader2 } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { supabase } from '../../lib/supabase';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { toast } from 'sonner';

export function Contact() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    mensaje: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Guardar en Base de Datos Supabase
      const { error: dbError } = await supabase
        .from('mensajes_contacto')
        .insert([
          {
            nombre: formData.nombre,
            email: formData.email,
            mensaje: formData.mensaje,
          }
        ]);

      if (dbError) throw new Error('Error al guardar en base de datos: ' + dbError.message);

      // 2. Enviar por EmailJS
      const serviceId  = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      if (serviceId && templateId && publicKey) {
        await emailjs.send(
          serviceId,
          templateId,
          {
            from_name: formData.nombre,
            reply_to: formData.email,
            message: formData.mensaje,
          },
          publicKey
        );
      } else {
        console.warn("EmailJS credentials faltantes. Revisa tu .env");
      }

      toast.success('Mensaje enviado correctamente. Te contactaremos pronto.');
      setFormData({ nombre: '', email: '', mensaje: '' });

    } catch (error) {
      console.error(error);
      toast.error('Hubo un error al enviar el mensaje. Reintenta más tarde.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contacto" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Info Side */}
          <div className="flex flex-col justify-center">
            <h2 className="text-4xl md:text-5xl font-bold text-[#1a1a1a] mb-6">
              Construyamos juntos tu
              <span className="block text-[#E63946]">próximo gran proyecto</span>
            </h2>
            <p className="text-xl text-gray-600 mb-12">
              Estamos listos para asesorarte y brindarte la mejor solución técnica y económica para tus necesidades.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white rounded-lg shadow-sm flex items-center justify-center text-[#E63946]">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#1a1a1a]">Nuestra sede</h3>
                  <p className="text-gray-600">Cra 28 #71-89, Bogotá, Colombia</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white rounded-lg shadow-sm flex items-center justify-center text-[#E63946]">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#1a1a1a]">Líneas de atención</h3>
                  <p className="text-gray-600">+57 313 3540258 | +57 311 8561914</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white rounded-lg shadow-sm flex items-center justify-center text-[#E63946]">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#1a1a1a]">Correo electrónico</h3>
                  <p className="text-gray-600">inalumh@gmail.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="bg-white p-8 md:p-12 rounded-2xl shadow-xl border border-gray-100">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="nombre" className="text-sm font-semibold text-gray-700">Nombre completo</label>
                <Input
                  id="nombre"
                  placeholder="Tu nombre aquí"
                  value={formData.nombre}
                  onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-semibold text-gray-700">Correo electrónico</label>
                <Input
                  id="email"
                  type="email"
                  placeholder="ejemplo@correo.com"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="mensaje" className="text-sm font-semibold text-gray-700">Mensaje o descripción del proyecto</label>
                <Textarea
                  id="mensaje"
                  placeholder="Cuéntanos sobre tu proyecto..."
                  rows={4}
                  value={formData.mensaje}
                  onChange={(e) => setFormData({...formData, mensaje: e.target.value})}
                  required
                />
              </div>
              <Button type="submit" disabled={loading} className="w-full h-12 bg-[#E63946] hover:bg-[#d32f3c] text-white">
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  <>
                    Enviar mensaje
                    <Send className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}