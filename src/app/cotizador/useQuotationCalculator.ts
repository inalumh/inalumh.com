/**
 * useQuotationCalculator.ts
 * ─────────────────────────────────────────────────────────────────────
 * Pure calculation engine — no side effects, no API calls.
 * Takes form data and returns a fully-broken-down quotation result.
 *
 * Esquema de márgenes (actualizado):
 *   - Administración : 7%  del subtotal neto
 *   - Imprevistos    : 3%  del subtotal neto
 *   - Utilidad       : 5%  del subtotal neto
 *   - IVA            : 19% SOLO sobre la utilidad
 * ─────────────────────────────────────────────────────────────────────
 */

import { useMemo } from 'react';
import type {
  ConstructionCategory,
  QualityTier,
  DifficultyLevel,
  QuotationResult,
  QuotationLineItem,
} from './quotation.types';
import {
  constructionServices,
  DIFFICULTY_FACTORS,
  DEMOLITION_COST_PER_M2,
  DEBRIS_REMOVAL_COST_PER_M2,
  ADMIN_RATE,
  IMPREVISTOS_RATE,
  UTILIDAD_RATE,
  IVA_RATE,
  M2_PER_DAY_ESTIMATE,
} from './pricingData';

interface CalculatorInput {
  selectedServices: ConstructionCategory[];
  areaM2: number;
  /** Per-service custom m² (for ventaneria, fachadas, carpinteria, hidraulico) */
  serviceAreas: Partial<Record<ConstructionCategory, number>>;
  /** Number of bathrooms for divisiones_bano */
  bathroomCount: number;
  qualityTier: QualityTier;
  difficulty: DifficultyLevel;
  includesDemolition: boolean;
  includesDebrisRemoval: boolean;
}

export function calculateQuotation(input: CalculatorInput): QuotationResult {
  const {
    selectedServices,
    areaM2,
    serviceAreas,
    bathroomCount,
    qualityTier,
    difficulty,
    includesDemolition,
    includesDebrisRemoval,
  } = input;

  // Services that use their own independent m² (not the global project area)
  const CUSTOM_AREA_SERVICES: ConstructionCategory[] = [
    'ventaneria', 'fachadas', 'carpinteria', 'hidraulico',
  ];
  // Average m² per bathroom division (used when bathroomCount is provided)
  const M2_PER_BATHROOM = 4;

  // ── 1. Build line items ────────────────────────────────────────────
  const lineItems: QuotationLineItem[] = selectedServices.map((svcId) => {
    const svc = constructionServices.find((s) => s.id === svcId);
    if (!svc) {
      return { service: svcId, area: areaM2, unitPrice: 0, subtotal: 0 };
    }
    const unitPrice = svc.pricing[qualityTier].totalM2;

    // Determine effective area for this service
    let effectiveArea: number;
    if (svcId === 'divisiones_bano') {
      effectiveArea = (bathroomCount > 0 ? bathroomCount : 1) * M2_PER_BATHROOM;
    } else if (CUSTOM_AREA_SERVICES.includes(svcId) && (serviceAreas[svcId] ?? 0) > 0) {
      effectiveArea = serviceAreas[svcId]!;
    } else {
      effectiveArea = areaM2;
    }

    return {
      service: svc.label,
      area: effectiveArea,
      unitPrice,
      subtotal: effectiveArea * unitPrice,
    };
  });

  // ── 2. Subtotal of services ────────────────────────────────────────
  const subtotalServices = lineItems.reduce((acc, li) => acc + li.subtotal, 0);

  // ── 3. Difficulty surcharge ────────────────────────────────────────
  const difficultyMultiplier = DIFFICULTY_FACTORS[difficulty];
  const difficultyAmount = subtotalServices * (difficultyMultiplier - 1);

  // ── 4. Optional extras ─────────────────────────────────────────────
  const demolitionCost = includesDemolition ? areaM2 * DEMOLITION_COST_PER_M2 : 0;
  const debrisRemovalCost = includesDebrisRemoval ? areaM2 * DEBRIS_REMOVAL_COST_PER_M2 : 0;

  // ── 5. Subtotal before margin ──────────────────────────────────────
  const subtotalBeforeMargin =
    subtotalServices + difficultyAmount + demolitionCost + debrisRemovalCost;

  // ── 6. Desglose de márgenes ────────────────────────────────────────
  const adminAmount       = subtotalBeforeMargin * ADMIN_RATE;        // 7%
  const imprevistosAmount = subtotalBeforeMargin * IMPREVISTOS_RATE;  // 3%
  const utilidadAmount    = subtotalBeforeMargin * UTILIDAD_RATE;     // 5%

  // ── 7. IVA — se aplica SOLO sobre la utilidad ─────────────────────
  const ivaAmount = utilidadAmount * IVA_RATE;                        // 19% de utilidad

  // ── 8. Subtotal antes de IVA (base = neto + admin + imprevistos + utilidad)
  const subtotalBeforeTax = subtotalBeforeMargin + adminAmount + imprevistosAmount + utilidadAmount;

  // ── 9. Grand total ─────────────────────────────────────────────────
  const grandTotal = subtotalBeforeTax + ivaAmount;

  // ── 10. Rough timeline ─────────────────────────────────────────────
  const estimatedDays = Math.ceil(areaM2 / M2_PER_DAY_ESTIMATE) * selectedServices.length;

  return {
    lineItems,
    subtotalServices,
    difficultyMultiplier,
    difficultyAmount,
    demolitionCost,
    debrisRemovalCost,
    subtotalBeforeMargin,

    adminRate: ADMIN_RATE,
    adminAmount,
    imprevistosRate: IMPREVISTOS_RATE,
    imprevistosAmount,
    utilidadRate: UTILIDAD_RATE,
    utilidadAmount,
    ivaRate: IVA_RATE,
    ivaAmount,

    // Campos de compatibilidad
    margin: ADMIN_RATE + IMPREVISTOS_RATE + UTILIDAD_RATE,
    marginAmount: adminAmount + imprevistosAmount + utilidadAmount,
    subtotalBeforeTax,
    iva: IVA_RATE,
    grandTotal,
    estimatedDays,
  };
}

/** React hook wrapper — recalculates reactively. */
export function useQuotationCalculator(input: CalculatorInput): QuotationResult {
  return useMemo(() => calculateQuotation(input), [
    input.selectedServices,
    input.areaM2,
    input.qualityTier,
    input.difficulty,
    input.includesDemolition,
    input.includesDebrisRemoval,
  ]);
}
