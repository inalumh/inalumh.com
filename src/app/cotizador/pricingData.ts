/**
 * pricingData.ts
 * ─────────────────────────────────────────────────────────────────────
 * Extracted from costos_estimados.docx — Colombia 2025-2026
 *
 * Strategy:  We pick an intermediate "sweet spot" between the low-end
 *            and high-end of each range, leaning slightly above the
 *            midpoint to ensure a healthy margin.  All values are COP.
 * ─────────────────────────────────────────────────────────────────────
 */

import type {
  ConstructionService,
  TechService,
  DifficultyLevel,
} from './quotation.types';

// ═══════════════════════════════════════════════════════════════════════
//  1.  CONSTRUCTION SERVICES  (price per m²)
// ═══════════════════════════════════════════════════════════════════════

export const constructionServices: ConstructionService[] = [
  {
    id: 'mamposteria',
    label: 'Mampostería (Obra gris)',
    icon: '🧱',
    unit: 'm2',
    pricing: {
      // Range: 90k–110k | 110k–140k | 140k–180k
      baja:  { manoDeObra:  20_000, materiales:  80_000, totalM2: 100_000 },
      media: { manoDeObra:  25_000, materiales: 100_000, totalM2: 125_000 },
      alta:  { manoDeObra:  30_000, materiales: 130_000, totalM2: 160_000 },
    },
  },
  {
    id: 'ventaneria',
    label: 'Ventanería en Aluminio',
    icon: '🪟',
    unit: 'm2',
    pricing: {
      // Range: 250k–350k | 350k–450k | 700k–1.2M
      baja:  { manoDeObra:  50_000, materiales: 250_000, totalM2: 300_000 },
      media: { manoDeObra:  70_000, materiales: 330_000, totalM2: 400_000 },
      alta:  { manoDeObra: 100_000, materiales: 800_000, totalM2: 900_000 },
    },
  },
  {
    id: 'fachadas',
    label: 'Fachadas (Mantenimiento)',
    icon: '🏢',
    unit: 'm2',
    pricing: {
      // Range: 80k–100k | 100k–130k | 130k–180k
      baja:  { manoDeObra: 40_000, materiales: 50_000, totalM2:  90_000 },
      media: { manoDeObra: 50_000, materiales: 70_000, totalM2: 120_000 },
      alta:  { manoDeObra: 70_000, materiales: 80_000, totalM2: 150_000 },
    },
  },
  {
    id: 'divisiones_bano',
    label: 'Divisiones de Baño',
    icon: '🚿',
    unit: 'm2',
    pricing: {
      // Range: 400k–500k | 500k–700k | 700k–1.2M
      baja:  { manoDeObra: 100_000, materiales: 350_000, totalM2: 450_000 },
      media: { manoDeObra: 120_000, materiales: 480_000, totalM2: 600_000 },
      alta:  { manoDeObra: 150_000, materiales: 750_000, totalM2: 900_000 },
    },
  },
  {
    id: 'carpinteria',
    label: 'Carpintería',
    icon: '🪵',
    unit: 'm2',
    pricing: {
      // Range: 400k–700k | 700k–1.2M | 1.2M–2M+
      baja:  { manoDeObra: 150_000, materiales: 350_000, totalM2: 500_000 },
      media: { manoDeObra: 200_000, materiales: 700_000, totalM2: 900_000 },
      alta:  { manoDeObra: 400_000, materiales: 1_100_000, totalM2: 1_500_000 },
    },
  },
  {
    id: 'remodelacion',
    label: 'Remodelación Integral',
    icon: '🏠',
    unit: 'm2',
    pricing: {
      // Range: 400k–700k | 700k–1.5M | 1.5M–2.8M
      baja:  { manoDeObra: 120_000, materiales: 400_000, totalM2: 550_000 },
      media: { manoDeObra: 200_000, materiales: 800_000, totalM2: 1_000_000 },
      alta:  { manoDeObra: 400_000, materiales: 1_600_000, totalM2: 2_000_000 },
    },
  },
  {
    id: 'electrico',
    label: 'Instalaciones Eléctricas',
    icon: '⚡',
    unit: 'm2',
    pricing: {
      // Range: 80k–150k | 150k–300k | 300k–600k
      baja:  { manoDeObra:  40_000, materiales:  75_000, totalM2: 115_000 },
      media: { manoDeObra:  70_000, materiales: 150_000, totalM2: 220_000 },
      alta:  { manoDeObra: 130_000, materiales: 320_000, totalM2: 450_000 },
    },
  },
  {
    id: 'hidraulico',
    label: 'Instalaciones Hidráulicas',
    icon: '🚰',
    unit: 'm2',
    pricing: {
      // Range: 80k–120k | 120k–180k | 180k–300k
      baja:  { manoDeObra:  35_000, materiales:  65_000, totalM2: 100_000 },
      media: { manoDeObra:  55_000, materiales: 100_000, totalM2: 150_000 },
      alta:  { manoDeObra:  90_000, materiales: 150_000, totalM2: 240_000 },
    },
  },
  {
    id: 'acabados_pisos',
    label: 'Acabados - Pisos',
    icon: '🎨',
    unit: 'm2',
    pricing: {
      // Range: 70k–110k | 110k–160k | 160k–250k
      baja:  { manoDeObra:  30_000, materiales:  60_000, totalM2:  90_000 },
      media: { manoDeObra:  45_000, materiales:  90_000, totalM2: 135_000 },
      alta:  { manoDeObra:  70_000, materiales: 140_000, totalM2: 200_000 },
    },
  },
  {
    id: 'acabados_pintura',
    label: 'Acabados - Pintura',
    icon: '🖌️',
    unit: 'm2',
    pricing: {
      // Range: 80k–150k | 150k–300k | 300k–600k
      baja:  { manoDeObra:  40_000, materiales:  75_000, totalM2: 115_000 },
      media: { manoDeObra:  70_000, materiales: 150_000, totalM2: 220_000 },
      alta:  { manoDeObra: 130_000, materiales: 320_000, totalM2: 450_000 },
    },
  },
];

// ═══════════════════════════════════════════════════════════════════════
//  2.  TECH / SYSTEMATIZATION SERVICES  (per-unit / per-project)
// ═══════════════════════════════════════════════════════════════════════

export const techServices: TechService[] = [
  {
    id: 'domotica',
    label: 'Domótica (Automatización)',
    icon: '🤖',
    margin: { min: 0.30, max: 0.50 },
    services: [
      { label: 'Iluminación inteligente', bajo: 500_000, medio: 1_000_000, alto: 2_000_000, unit: 'unidad' },
      { label: 'Control por voz (Alexa / Google)', bajo: 300_000, medio: 800_000, alto: 1_500_000, unit: 'unidad' },
      { label: 'Automatización completa apto', bajo: 800_000, medio: 3_000_000, alto: 10_000_000, unit: 'proyecto' },
      { label: 'Sensores y automatización', bajo: 400_000, medio: 1_000_000, alto: 2_500_000, unit: 'unidad' },
    ],
  },
  {
    id: 'seguridad',
    label: 'Seguridad Inteligente (CCTV + Acceso)',
    icon: '🔐',
    margin: { min: 0.25, max: 0.40 },
    services: [
      { label: 'Cámara individual instalada', bajo: 150_000, medio: 400_000, alto: 800_000, unit: 'unidad' },
      { label: 'Sistema CCTV completo', bajo: 1_000_000, medio: 2_500_000, alto: 6_000_000, unit: 'proyecto' },
      { label: 'Control biométrico acceso', bajo: 800_000, medio: 2_000_000, alto: 5_000_000, unit: 'proyecto' },
      { label: 'Alarmas inteligentes', bajo: 500_000, medio: 1_500_000, alto: 3_000_000, unit: 'proyecto' },
    ],
  },
  {
    id: 'redes',
    label: 'Conectividad & Redes',
    icon: '🌐',
    margin: { min: 0.20, max: 0.35 },
    services: [
      { label: 'Cableado estructurado', bajo: 40_000, medio: 80_000, alto: 150_000, unit: 'm2' },
      { label: 'Red WiFi empresarial', bajo: 500_000, medio: 2_000_000, alto: 5_000_000, unit: 'proyecto' },
      { label: 'VPN / seguridad de red', bajo: 300_000, medio: 1_000_000, alto: 3_000_000, unit: 'proyecto' },
      { label: 'Redes completas edificio', bajo: 5_000_000, medio: 15_000_000, alto: 40_000_000, unit: 'proyecto' },
    ],
  },
  {
    id: 'datacenter',
    label: 'Servidores & Datacenter',
    icon: '🖥️',
    margin: { min: 0.30, max: 0.60 },
    services: [
      { label: 'Rack básico', bajo: 2_000_000, medio: 5_000_000, alto: 12_000_000, unit: 'proyecto' },
      { label: 'Servidor físico', bajo: 3_000_000, medio: 10_000_000, alto: 30_000_000, unit: 'proyecto' },
      { label: 'Backup nube/local', bajo: 500_000, medio: 2_000_000, alto: 8_000_000, unit: 'proyecto' },
      { label: 'Enfriamiento', bajo: 1_000_000, medio: 5_000_000, alto: 15_000_000, unit: 'proyecto' },
    ],
  },
];

// ═══════════════════════════════════════════════════════════════════════
//  3.  MULTIPLIERS & CONSTANTS
// ═══════════════════════════════════════════════════════════════════════

/** Difficulty factor adds a surcharge */
export const DIFFICULTY_FACTORS: Record<DifficultyLevel, number> = {
  normal:   1.00,
  moderada: 1.10,   // +10%
  alta:     1.20,   // +20%
};

/** Fixed demolition flat-rate per m² */
export const DEMOLITION_COST_PER_M2 = 45_000; // COP

/** Debris removal flat-rate per m² */
export const DEBRIS_REMOVAL_COST_PER_M2 = 30_000; // COP

/** Administración: 7% del subtotal neto */
export const ADMIN_RATE = 0.07;

/** Imprevistos: 3% del subtotal neto */
export const IMPREVISTOS_RATE = 0.03;

/** Utilidad: 5% del subtotal neto */
export const UTILIDAD_RATE = 0.05;

/** IVA Colombia: se aplica SOLO sobre el valor de la utilidad */
export const IVA_RATE = 0.19;

/** @deprecated — Usar ADMIN_RATE + IMPREVISTOS_RATE + UTILIDAD_RATE */
export const DEFAULT_MARGIN = ADMIN_RATE + IMPREVISTOS_RATE + UTILIDAD_RATE; // 0.15

/** Rough estimate: m² a worker can finish per day (for timeline estimate) */
export const M2_PER_DAY_ESTIMATE = 5;
