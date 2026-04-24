// ─── Quality Tiers ─────────────────────────────────────────────────
export type QualityTier = 'baja' | 'media' | 'alta';

// ─── Construction Categories ───────────────────────────────────────
export type ConstructionCategory =
  | 'mamposteria'
  | 'ventaneria'
  | 'fachadas'
  | 'divisiones_bano'
  | 'carpinteria'
  | 'remodelacion'
  | 'electrico'
  | 'hidraulico'
  | 'acabados_pisos'
  | 'acabados_pintura';

// ─── Tech / Systematization Categories ─────────────────────────────
export type TechCategory =
  | 'domotica'
  | 'seguridad'
  | 'redes'
  | 'datacenter';

export type ProjectType = 'construccion' | 'tecnologia';

// ─── Pricing shape per m² ──────────────────────────────────────────
export interface PricingPerM2 {
  manoDeObra: number;    // COP per m²
  materiales: number;    // COP per m²
  totalM2: number;       // COP per m² (reference point we use)
}

// ─── Pricing shape per unit/project (tech services) ────────────────
export interface TechServicePricing {
  label: string;
  bajo: number;
  medio: number;
  alto: number;
  unit: 'unidad' | 'm2' | 'proyecto';
}

// ─── Construction service definition ───────────────────────────────
export interface ConstructionService {
  id: ConstructionCategory;
  label: string;
  icon: string;
  pricing: Record<QualityTier, PricingPerM2>;
  unit: 'm2' | 'ml';
}

// ─── Tech service definition ───────────────────────────────────────
export interface TechService {
  id: TechCategory;
  label: string;
  icon: string;
  services: TechServicePricing[];
  margin: { min: number; max: number };
}

// ─── Difficulty multipliers ────────────────────────────────────────
export type DifficultyLevel = 'normal' | 'moderada' | 'alta';

// ─── Wizard form data ──────────────────────────────────────────────
export interface QuotationFormData {
  // Step 1 — Info
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  projectLocation: string;
  projectType: ProjectType;

  // Step 2 — Scope
  selectedServices: ConstructionCategory[] | TechCategory[];
  areaM2: number;

  // Step 3 — Quality
  qualityTier: QualityTier;

  // Step 4 — Extras
  difficulty: DifficultyLevel;
  includesDemolition: boolean;
  includesDebrisRemoval: boolean;
  additionalNotes: string;
}

// ─── Line item in the result ───────────────────────────────────────
export interface QuotationLineItem {
  service: string;
  area: number;
  unitPrice: number;
  subtotal: number;
}

// ─── Final result ──────────────────────────────────────────────────
export interface QuotationResult {
  lineItems: QuotationLineItem[];
  subtotalServices: number;
  difficultyMultiplier: number;
  difficultyAmount: number;
  demolitionCost: number;
  debrisRemovalCost: number;
  subtotalBeforeMargin: number;

  // Desglose de márgenes (nuevo esquema)
  adminRate: number;          // 0.07
  adminAmount: number;        // 7% del subtotalBeforeMargin
  imprevistosRate: number;    // 0.03
  imprevistosAmount: number;  // 3% del subtotalBeforeMargin
  utilidadRate: number;       // 0.05
  utilidadAmount: number;     // 5% del subtotalBeforeMargin
  ivaRate: number;            // 0.19
  ivaAmount: number;          // 19% sobre utilidadAmount (solo sobre utilidad)

  // Para compatibilidad con renderizado
  margin: number;             // suma total de tasas aplicadas (0.15 + IVA parcial)
  marginAmount: number;       // admin + imprevistos + utilidad

  subtotalBeforeTax: number;  // subtotalBeforeMargin + admin + imprevistos + utilidad
  iva: number;                // alias de ivaRate (0.19)
  grandTotal: number;
  estimatedDays: number;
}
