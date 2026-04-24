/**
 * useHabitatCalculator.ts
 * Motor de cálculo para servicios Habitat IQ.
 * Mismo esquema de márgenes: Admin 7% / Imprevistos 3% / Utilidad 5% / IVA 19% sobre utilidad.
 */

import type { TechServiceSelection, HabitatLineItem, HabitatQuotationResult } from './habitat.types';
import {
  techCategories,
  IQ_ADMIN_RATE,
  IQ_IMPREVISTOS_RATE,
  IQ_UTILIDAD_RATE,
  IQ_IVA_RATE,
} from './habitatPricingData';

export function calculateHabitatQuotation(
  selections: TechServiceSelection[]
): HabitatQuotationResult {
  // ── 1. Build line items ────────────────────────────────────────────
  const lineItems: HabitatLineItem[] = selections.map((sel) => {
    const category = techCategories.find((c) => c.id === sel.categoryId);
    const service = category?.services.find((s) => s.id === sel.serviceId);

    if (!category || !service) {
      return {
        category: sel.categoryId,
        service: sel.serviceId,
        quantity: sel.quantity,
        unit: 'unidad',
        unitPrice: 0,
        subtotal: 0,
      };
    }

    const unitPrice = service.pricing[sel.qualityTier];
    return {
      category: category.label,
      service: service.label,
      quantity: sel.quantity,
      unit: service.unit,
      unitPrice,
      subtotal: unitPrice * sel.quantity,
    };
  });

  // ── 2. Subtotal ────────────────────────────────────────────────────
  const subtotalServices = lineItems.reduce((acc, li) => acc + li.subtotal, 0);
  const subtotalBeforeMargin = subtotalServices;

  // ── 3. Márgenes ────────────────────────────────────────────────────
  const adminAmount       = subtotalBeforeMargin * IQ_ADMIN_RATE;
  const imprevistosAmount = subtotalBeforeMargin * IQ_IMPREVISTOS_RATE;
  const utilidadAmount    = subtotalBeforeMargin * IQ_UTILIDAD_RATE;
  const ivaAmount         = utilidadAmount * IQ_IVA_RATE; // solo sobre utilidad

  // ── 4. Totals ──────────────────────────────────────────────────────
  const subtotalBeforeTax = subtotalBeforeMargin + adminAmount + imprevistosAmount + utilidadAmount;
  const grandTotal = subtotalBeforeTax + ivaAmount;

  return {
    lineItems,
    subtotalServices,
    subtotalBeforeMargin,
    adminRate: IQ_ADMIN_RATE,
    adminAmount,
    imprevistosRate: IQ_IMPREVISTOS_RATE,
    imprevistosAmount,
    utilidadRate: IQ_UTILIDAD_RATE,
    utilidadAmount,
    ivaRate: IQ_IVA_RATE,
    ivaAmount,
    subtotalBeforeTax,
    grandTotal,
    margin: IQ_ADMIN_RATE + IQ_IMPREVISTOS_RATE + IQ_UTILIDAD_RATE,
    marginAmount: adminAmount + imprevistosAmount + utilidadAmount,
    iva: IQ_IVA_RATE,
  };
}
