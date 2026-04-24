/**
 * saveQuotation.ts
 * Guarda cotizaciones en Supabase con manejo graceful de errores.
 * Si la BD no está disponible, la app sigue funcionando normalmente.
 */

import { supabase } from '../../lib/supabase';

export interface QuotationPayload {
  type: 'construccion' | 'habitat_iq' | 'combinada';
  client_name: string;
  client_phone: string;
  client_email?: string;
  project_location?: string;
  wants_contact: boolean;
  services: object[];
  grand_total: number;
  result_json: object;
}

/**
 * Intenta guardar la cotización en Supabase.
 * Retorna `true` si se guardó, `false` si falló (sin lanzar error).
 */
export async function saveQuotationToSupabase(payload: QuotationPayload): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('quotations')
      .insert([{
        type: payload.type,
        client_name: payload.client_name,
        client_phone: payload.client_phone,
        client_email: payload.client_email || null,
        project_location: payload.project_location || null,
        wants_contact: payload.wants_contact,
        services: payload.services,
        grand_total: payload.grand_total,
        result_json: payload.result_json,
      }]);

    if (error) {
      console.warn('[Supabase] No se pudo guardar la cotización:', error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.warn('[Supabase] Error inesperado al guardar:', err);
    return false;
  }
}

/**
 * Prueba la conexión con Supabase haciendo un select simple.
 * Retorna `true` si la conexión es exitosa.
 */
export async function testSupabaseConnection(): Promise<boolean> {
  try {
    const { error } = await supabase.from('quotations').select('id').limit(1);
    if (error) {
      console.warn('[Supabase] Conexión fallida:', error.message);
      return false;
    }
    console.info('[Supabase] ✓ Conexión exitosa');
    return true;
  } catch (err) {
    console.warn('[Supabase] Error de conexión:', err);
    return false;
  }
}
