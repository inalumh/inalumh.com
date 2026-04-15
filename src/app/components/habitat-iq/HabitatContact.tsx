import { useState } from 'react';
import { Send, Loader2, Sparkles } from 'lucide-react';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { toast } from 'sonner';

export function HabitatContact() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    mensaje: '',
    area: 'Habitat IQ'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/contact.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        toast.success("Consulta enviada. Un especialista de Habitat IQ te contactará.");
        setFormData({ nombre: '', email: '', mensaje: '', area: 'Habitat IQ' });
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error('Error al conectar con el servidor.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-24 bg-[#020617] relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_rgba(0,168,232,0.1),_transparent)]" />
      
      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-12 rounded-3xl shadow-2xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full mb-4">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span className="text-cyan-400 font-bold text-xs uppercase tracking-tighter">Consulta Técnica</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Inicia tu transformación digital</h2>
            <p className="text-gray-400">Cuéntanos tu idea y nuestro equipo de ingeniería la hará realidad.</p>
          </div>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">Nombre</label>
              <Input 
                className="bg-white/5 border-white/10 text-white h-12"
                placeholder="Ej: Juan Pérez"
                value={formData.nombre}
                onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                required 
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">Email Corporativo</label>
              <Input 
                className="bg-white/5 border-white/10 text-white h-12"
                type="email"
                placeholder="juan@empresa.com"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required 
              />
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">Sobre el Proyecto</label>
              <Textarea 
                className="bg-white/5 border-white/10 text-white min-h-[120px]"
                placeholder="¿Qué soluciones tecnológicas necesitas?"
                value={formData.mensaje}
                onChange={(e) => setFormData({...formData, mensaje: e.target.value})}
                required 
              />
            </div>
            <div className="md:col-span-2 pt-4">
              <Button type="submit" disabled={loading} className="w-full h-14 bg-gradient-to-r from-[#00A8E8] to-[#007EA7] hover:scale-[1.02] transition-transform text-lg font-bold">
                {loading ? <Loader2 className="animate-spin" /> : <><Send className="mr-2 w-5 h-5" /> Solicitar Consultoría IQ</>}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
