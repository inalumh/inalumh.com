import { useState, useCallback, useEffect } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import useEmblaCarousel from 'embla-carousel-react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export interface GalleryImage {
  src: string;
  alt: string;
}

interface GalleryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  images: GalleryImage[];
  title: string;
  accentColor: string;
}

export function GalleryModal({
  open,
  onOpenChange,
  images,
  title,
  accentColor,
}: GalleryModalProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, dragFree: false });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

  // Reset to first slide when modal opens
  useEffect(() => {
    if (open && emblaApi) {
      emblaApi.scrollTo(0, true);
      setSelectedIndex(0);
    }
  }, [open, emblaApi]);

  // Keyboard navigation
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') scrollPrev();
      if (e.key === 'ArrowRight') scrollNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, scrollPrev, scrollNext]);

  if (images.length === 0) return null;

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        {/* Overlay */}
        <Dialog.Overlay 
          className="gallery-overlay"
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.85)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            zIndex: 9998,
            animation: 'galleryFadeIn 0.3s ease-out',
          }}
        />

        {/* Content */}
        <Dialog.Content
          className="gallery-content"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            outline: 'none',
            animation: 'gallerySlideIn 0.3s ease-out',
          }}
          onPointerDownOutside={(e) => e.preventDefault()}
        >
          {/* Header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '16px 24px',
              flexShrink: 0,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div
                style={{
                  width: '4px',
                  height: '28px',
                  backgroundColor: accentColor,
                  borderRadius: '2px',
                }}
              />
              <Dialog.Title
                style={{
                  color: '#ffffff',
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  margin: 0,
                }}
              >
                {title}
              </Dialog.Title>
              <span
                style={{
                  color: 'rgba(255,255,255,0.5)',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                }}
              >
                {selectedIndex + 1} / {images.length}
              </span>
            </div>

            <Dialog.Close asChild>
              <button
                style={{
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  borderRadius: '8px',
                  color: '#ffffff',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)';
                }}
                aria-label="Cerrar galería"
              >
                <X size={20} />
              </button>
            </Dialog.Close>
          </div>

          {/* Main Carousel Area */}
          <div
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              minHeight: 0,
              padding: '0 60px',
            }}
          >
            {/* Previous Button */}
            <button
              onClick={scrollPrev}
              disabled={!canScrollPrev}
              style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '44px',
                height: '44px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '50%',
                color: '#ffffff',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                zIndex: 10,
                opacity: canScrollPrev ? 1 : 0.3,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = accentColor;
                e.currentTarget.style.borderColor = accentColor;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
              }}
              aria-label="Imagen anterior"
            >
              <ChevronLeft size={22} />
            </button>

            {/* Carousel */}
            <div
              ref={emblaRef}
              style={{
                overflow: 'hidden',
                width: '100%',
                height: '100%',
                borderRadius: '8px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  height: '100%',
                }}
              >
                {images.map((image, index) => (
                  <div
                    key={index}
                    style={{
                      flex: '0 0 100%',
                      minWidth: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '8px',
                    }}
                  >
                    <img
                      src={image.src}
                      alt={image.alt}
                      loading={index <= 1 ? 'eager' : 'lazy'}
                      style={{
                        maxWidth: '100%',
                        maxHeight: '100%',
                        objectFit: 'contain',
                        borderRadius: '4px',
                        boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Next Button */}
            <button
              onClick={scrollNext}
              disabled={!canScrollNext}
              style={{
                position: 'absolute',
                right: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '44px',
                height: '44px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '50%',
                color: '#ffffff',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                zIndex: 10,
                opacity: canScrollNext ? 1 : 0.3,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = accentColor;
                e.currentTarget.style.borderColor = accentColor;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
              }}
              aria-label="Siguiente imagen"
            >
              <ChevronRight size={22} />
            </button>
          </div>

          {/* Dots Indicator */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '6px',
              padding: '12px 0 8px',
              flexShrink: 0,
            }}
          >
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                aria-label={`Ir a imagen ${index + 1}`}
                style={{
                  width: selectedIndex === index ? '24px' : '8px',
                  height: '8px',
                  borderRadius: '4px',
                  border: 'none',
                  backgroundColor:
                    selectedIndex === index ? accentColor : 'rgba(255,255,255,0.3)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  padding: 0,
                }}
              />
            ))}
          </div>

          {/* Thumbnails */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '8px',
              padding: '8px 24px 20px',
              flexShrink: 0,
              overflowX: 'auto',
              maxWidth: '100%',
            }}
          >
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                aria-label={`Ver ${image.alt}`}
                style={{
                  width: '64px',
                  height: '48px',
                  flexShrink: 0,
                  borderRadius: '6px',
                  overflow: 'hidden',
                  border:
                    selectedIndex === index
                      ? `2px solid ${accentColor}`
                      : '2px solid rgba(255,255,255,0.15)',
                  opacity: selectedIndex === index ? 1 : 0.5,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  padding: 0,
                  background: 'none',
                }}
                onMouseEnter={(e) => {
                  if (selectedIndex !== index) {
                    e.currentTarget.style.opacity = '0.8';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedIndex !== index) {
                    e.currentTarget.style.opacity = '0.5';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
                  }
                }}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  loading="lazy"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </button>
            ))}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
