/**
 * habitatPricingData.ts
 * Precios para servicios de sistematización Habitat IQ
 * Márgenes: Admin 7% / Imprevistos 3% / Utilidad 5% / IVA 19% sobre utilidad
 */

import type { TechCategoryDef } from './habitat.types';

export const techCategories: TechCategoryDef[] = [
  {
    id: 'domotica',
    label: 'Domótica (Automatización)',
    icon: '🧠',
    description: 'Automatización de iluminación, clima, accesos y entretenimiento.',
    margin: { min: 0.30, max: 0.50 },
    m2Pricing: { baja: 115_000, media: 240_000, alta: 475_000 },
    services: [
      {
        id: 'iluminacion',
        label: 'Iluminación inteligente',
        unit: 'unidad',
        pricing: { baja: 500_000, media: 1_000_000, alta: 2_000_000 },
      },
      {
        id: 'control_voz',
        label: 'Control por voz (Alexa / Google)',
        unit: 'unidad',
        pricing: { baja: 300_000, media: 800_000, alta: 1_500_000 },
      },
      {
        id: 'automatizacion_apto',
        label: 'Automatización completa apartamento',
        unit: 'proyecto',
        pricing: { baja: 800_000, media: 3_000_000, alta: 10_000_000 },
      },
      {
        id: 'sensores',
        label: 'Sensores y automatización',
        unit: 'unidad',
        pricing: { baja: 400_000, media: 1_000_000, alta: 2_500_000 },
      },
    ],
  },
  {
    id: 'seguridad',
    label: 'Seguridad Inteligente (CCTV + Acceso)',
    icon: '🔐',
    description: 'Monitoreo 24/7, control de acceso biométrico y alarmas.',
    margin: { min: 0.25, max: 0.40 },
    services: [
      {
        id: 'camara',
        label: 'Cámara individual instalada',
        unit: 'unidad',
        pricing: { baja: 150_000, media: 400_000, alta: 800_000 },
      },
      {
        id: 'cctv_completo',
        label: 'Sistema CCTV completo',
        unit: 'proyecto',
        pricing: { baja: 1_000_000, media: 2_500_000, alta: 6_000_000 },
      },
      {
        id: 'biometrico',
        label: 'Control biométrico de acceso',
        unit: 'proyecto',
        pricing: { baja: 800_000, media: 2_000_000, alta: 5_000_000 },
      },
      {
        id: 'alarmas',
        label: 'Alarmas inteligentes',
        unit: 'proyecto',
        pricing: { baja: 500_000, media: 1_500_000, alta: 3_000_000 },
      },
    ],
  },
  {
    id: 'redes',
    label: 'Conectividad & Redes',
    icon: '🌐',
    description: 'Infraestructura de red profesional para señal estable.',
    margin: { min: 0.20, max: 0.35 },
    m2Pricing: { baja: 75_000, media: 140_000, alta: 240_000 },
    services: [
      {
        id: 'cableado',
        label: 'Cableado estructurado',
        unit: 'm2',
        pricing: { baja: 40_000, media: 80_000, alta: 150_000 },
      },
      {
        id: 'wifi_empresarial',
        label: 'Red WiFi empresarial',
        unit: 'proyecto',
        pricing: { baja: 500_000, media: 2_000_000, alta: 5_000_000 },
      },
      {
        id: 'vpn',
        label: 'VPN / Seguridad de red',
        unit: 'proyecto',
        pricing: { baja: 300_000, media: 1_000_000, alta: 3_000_000 },
      },
      {
        id: 'redes_edificio',
        label: 'Redes completas edificio',
        unit: 'proyecto',
        pricing: { baja: 5_000_000, media: 15_000_000, alta: 40_000_000 },
      },
    ],
  },
  {
    id: 'datacenter',
    label: 'Servidores & Datacenter',
    icon: '🖥️',
    description: 'Instalación y mantenimiento de racks y servidores físicos.',
    margin: { min: 0.30, max: 0.60 },
    services: [
      {
        id: 'rack',
        label: 'Rack básico',
        unit: 'proyecto',
        pricing: { baja: 2_000_000, media: 5_000_000, alta: 12_000_000 },
      },
      {
        id: 'servidor',
        label: 'Servidor físico',
        unit: 'proyecto',
        pricing: { baja: 3_000_000, media: 10_000_000, alta: 30_000_000 },
      },
      {
        id: 'backup',
        label: 'Backup nube / local',
        unit: 'proyecto',
        pricing: { baja: 500_000, media: 2_000_000, alta: 8_000_000 },
      },
      {
        id: 'enfriamiento',
        label: 'Sistema de enfriamiento',
        unit: 'proyecto',
        pricing: { baja: 1_000_000, media: 5_000_000, alta: 15_000_000 },
      },
    ],
  },
];

// Paquetes predefinidos
export const HABITAT_PACKAGES = [
  {
    id: 'basico',
    label: '🏠 Paquete Básico — Residencial',
    description: 'Domótica básica + CCTV',
    rangeMin: 2_000_000,
    rangeMax: 5_000_000,
  },
  {
    id: 'intermedio',
    label: '🏢 Paquete Intermedio — Edificio pequeño',
    description: 'CCTV + Accesos + Red',
    rangeMin: 8_000_000,
    rangeMax: 20_000_000,
  },
  {
    id: 'premium',
    label: '🏢 Paquete Premium — 7+ pisos',
    description: 'Todo integrado',
    rangeMin: 120_000_000,
    rangeMax: 180_000_000,
  },
];

// Tasas de costos indirectos (mismo esquema que construcción)
export const IQ_ADMIN_RATE        = 0.07;
export const IQ_IMPREVISTOS_RATE  = 0.03;
export const IQ_UTILIDAD_RATE     = 0.05;
export const IQ_IVA_RATE          = 0.19; // solo sobre utilidad
