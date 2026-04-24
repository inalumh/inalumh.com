import { useState } from 'react';
import { LucideIcon } from 'lucide-react';
import { ArrowRight } from 'lucide-react';
import { GalleryModal, GalleryImage } from './GalleryModal';

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  features: string[];
  accentColor: string;
  imageSrc: string;
  galleryImages: GalleryImage[];
}

export function ServiceCard({  
  icon: Icon, 
  title, 
  description, 
  features, 
  accentColor,
  imageSrc,
  galleryImages 
}: ServiceCardProps) {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  return (
    <>
      <div className="group bg-white border border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-2xl overflow-hidden h-full flex flex-col">
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <img 
            src={imageSrc}
            alt={title}
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          
          {/* Icon Badge */}
          <div 
            className="absolute top-4 left-4 w-12 h-12 flex items-center justify-center"
            style={{ backgroundColor: accentColor }}
          >
            <Icon className="w-6 h-6 text-white" />
          </div>
        </div>
        
        {/* Content */}
        <div className="p-6 flex-1 flex flex-col">
          <h3 className="text-2xl font-bold text-[#1a1a1a] mb-3">{title}</h3>
          <p className="text-gray-600 mb-4 leading-relaxed">{description}</p>
          
          {/* Features List */}
          <ul className="space-y-2 mb-6 flex-1">
            {features.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                <div 
                  className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                  style={{ backgroundColor: accentColor }}
                />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
          
          {/* CTA */}
          <button 
            className="flex items-center gap-2 font-semibold group-hover:gap-3 transition-all cursor-pointer"
            style={{ color: accentColor }}
            onClick={() => setIsGalleryOpen(true)}
          >
            Más información
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Gallery Modal */}
      <GalleryModal
        open={isGalleryOpen}
        onOpenChange={setIsGalleryOpen}
        images={galleryImages}
        title={title}
        accentColor={accentColor}
      />
    </>
  );
}
