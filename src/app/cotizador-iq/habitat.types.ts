// ─── Tech Categories ────────────────────────────────────────────────
export type TechCategory = 'domotica' | 'seguridad' | 'redes' | 'datacenter';

export type QualityTier = 'baja' | 'media' | 'alta';

// ─── Pricing for a tech service item ────────────────────────────────
export interface TechServiceItem {
  id: string;
  label: string;
  unit: 'unidad' | 'm2' | 'proyecto';
  pricing: {
    baja: number;
    media: number;
    alta: number;
  };
}

// ─── Category definition ─────────────────────────────────────────────
export interface TechCategoryDef {
  id: TechCategory;
  label: string;
  icon: string;
  description: string;
  margin: { min: number; max: number };
  services: TechServiceItem[];
  /** Optional m² pricing for categories that support area-based pricing */
  m2Pricing?: {
    baja: number;
    media: number;
    alta: number;
  };
}

// ─── Selection made by the user ──────────────────────────────────────
export interface TechServiceSelection {
  categoryId: TechCategory;
  serviceId: string;
  quantity: number;      // number of units / m² / 1 for project
  qualityTier: QualityTier;
}

// ─── Line item in the result ─────────────────────────────────────────
export interface HabitatLineItem {
  category: string;
  service: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  subtotal: number;
}

// ─── Final quotation result ──────────────────────────────────────────
export interface HabitatQuotationResult {
  lineItems: HabitatLineItem[];
  subtotalServices: number;

  // Márgenes (mismo esquema que cotizador construcción)
  adminRate: number;
  adminAmount: number;
  imprevistosRate: number;
  imprevistosAmount: number;
  utilidadRate: number;
  utilidadAmount: number;
  ivaRate: number;
  ivaAmount: number;

  // Totals
  subtotalBeforeMargin: number;
  subtotalBeforeTax: number;
  grandTotal: number;

  // Compat
  margin: number;
  marginAmount: number;
  iva: number;
}
