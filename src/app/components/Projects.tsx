import { ExternalLink, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  span: string;
}

export function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data, error } = await supabase
          .from('proyectos')
          .select('id, nombre_proyecto, descripcion_proyecto, imagenes(imagen)');
          
        if (error) throw error;
        
        // Formatear la respuesta de Supabase a lo que el UI espera (con spans por defecto)
        const formattedProjects = data?.map((p: any, idx: number) => ({
          id: p.id.toString(),
          title: p.nombre_proyecto,
          description: p.descripcion_proyecto,
          image: p.imagenes && p.imagenes.length > 0 ? "images/" + p.imagenes[0].imagen : "images/default.jpg",
          span: idx === 0 ? 'md:col-span-2 md:row-span-2' : (idx === 3 ? 'md:col-span-2 md:row-span-1' : 'md:col-span-1 md:row-span-1')
        })) || [];
        
        setProjects(formattedProjects);
      } catch (err) {
        console.error('Error fetching projects:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProjects();
  }, []);
  
  return (
    <section id="proyectos" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1 bg-[#F77F00]/10 border border-[#F77F00]/30 rounded-sm mb-4">
            <span className="text-[#F77F00] font-semibold text-sm">PORTAFOLIO</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-[#1a1a1a] mb-4">
            Proyectos que nos
            <span className="block text-[#E63946]">enorgullecen</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Cada proyecto refleja nuestro compromiso con la calidad y la excelencia
          </p>
          <br />
          <iframe src="./docs/brochure.pdf" width="100%" height="800px"></iframe>
          <a href="./docs/brochure.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center 
          px-6 py-3 mt-6 text-base font-semibold text-white transition-colors duration-300 bg-[#E63946] rounded-md shadow-sm hover:bg-[#d32f3c] 
          hover:shadow-md">
            Ver Brochure
          </a>
        </div>
        
        {/* Projects Grid */}
        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-[#E63946]" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 auto-rows-fr">
            {projects.map((project, idx) => (
              <div 
                key={project.id || idx}
                className={`group relative overflow-hidden ${project.span || 'md:col-span-1'} min-h-[250px] cursor-pointer`}
              >
                {/* Image */}
                <img 
                  src={'/' + project.image}
                  alt={project.title}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />
                
                {/* Content */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <h3 className="text-white text-2xl font-bold mb-3">
                    {project.title}
                  </h3>
                  <button className="flex items-center gap-2 text-white font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                    Ver proyecto
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
