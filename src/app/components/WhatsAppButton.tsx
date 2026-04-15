import { useState } from 'react';

interface WhatsAppButtonProps {
  /** Mensaje pre-cargado al abrir WhatsApp */
  message?: string;
  /** Color del botón: 'green' para el sitio principal, 'cyan' para Habitat IQ */
  theme?: 'green' | 'cyan';
}

export function WhatsAppButton({
  message = '¡Hola! Me gustaría obtener más información sobre sus servicios.',
  theme = 'green',
}: WhatsAppButtonProps) {
  const [hovered, setHovered] = useState(false);

  const phoneNumber = '573133540258';
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  const isGreen = theme === 'green';

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'fixed',
        bottom: '28px',
        right: '28px',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        textDecoration: 'none',
      }}
    >
      {/* Tooltip */}
      <span
        style={{
          background: isGreen ? '#25D366' : '#00A8E8',
          color: '#fff',
          fontSize: '13px',
          fontWeight: 600,
          padding: '6px 14px',
          borderRadius: '20px',
          whiteSpace: 'nowrap',
          boxShadow: '0 4px 16px rgba(0,0,0,0.18)',
          opacity: hovered ? 1 : 0,
          transform: hovered ? 'translateX(0) scale(1)' : 'translateX(8px) scale(0.95)',
          transition: 'opacity 0.22s ease, transform 0.22s ease',
          pointerEvents: 'none',
        }}
      >
        ¡Escríbenos!
      </span>

      {/* Pulse ring */}
      <span
        style={{
          position: 'absolute',
          right: 0,
          bottom: 0,
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: isGreen ? '#25D366' : '#00A8E8',
          opacity: 0.35,
          animation: 'waPulse 2s ease-out infinite',
          pointerEvents: 'none',
        }}
      />

      {/* Main button */}
      <span
        style={{
          position: 'relative',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: isGreen ? '#25D366' : '#00A8E8',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: hovered
            ? `0 8px 32px ${isGreen ? 'rgba(37,211,102,0.55)' : 'rgba(0,168,232,0.55)'}`
            : `0 4px 18px ${isGreen ? 'rgba(37,211,102,0.35)' : 'rgba(0,168,232,0.35)'}`,
          transform: hovered ? 'scale(1.12)' : 'scale(1)',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          flexShrink: 0,
        }}
      >
        {/* WhatsApp SVG icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          width="30"
          height="30"
          fill="white"
        >
          <path d="M16.004 2.667C8.64 2.667 2.667 8.64 2.667 16c0 2.347.641 4.64 1.853 6.64L2.667 29.333l6.88-1.813A13.29 13.29 0 0 0 16.004 29.333C23.36 29.333 29.333 23.36 29.333 16S23.36 2.667 16.004 2.667zm0 24.267a11.01 11.01 0 0 1-5.6-1.52l-.4-.24-4.093 1.08 1.093-4-0.267-.413A10.96 10.96 0 0 1 5.04 16c0-6.053 4.92-10.973 10.973-10.973S27 9.947 27 16c-.013 6.053-4.947 10.933-10.996 10.933zM22.4 18.88c-.32-.16-1.893-.947-2.187-1.053-.293-.107-.507-.16-.72.16s-.827 1.053-1.013 1.267c-.187.213-.373.24-.693.08-1.76-.88-2.92-1.573-4.08-3.573-.307-.533.307-.493.88-1.64.093-.213.053-.4-.027-.56-.08-.16-.72-1.733-.987-2.373-.253-.64-.52-.547-.72-.547-.187 0-.4-.027-.613-.027s-.56.08-.853.4c-.293.32-1.12 1.093-1.12 2.667s1.147 3.093 1.307 3.307c.16.213 2.253 3.44 5.467 4.827 2.027.88 2.827.96 3.84.8.613-.093 1.893-.773 2.16-1.52.267-.747.267-1.387.187-1.52-.08-.133-.293-.213-.613-.373z" />
        </svg>
      </span>

      {/* Keyframe animation injected once */}
      <style>{`
        @keyframes waPulse {
          0%   { transform: scale(1);   opacity: 0.35; }
          70%  { transform: scale(1.7); opacity: 0; }
          100% { transform: scale(1.7); opacity: 0; }
        }
      `}</style>
    </a>
  );
}
