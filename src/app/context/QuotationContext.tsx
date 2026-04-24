/**
 * QuotationContext.tsx
 * Contexto compartido entre las dos cotizadoras.
 * Persiste datos del cliente en sessionStorage (solo durante la sesión activa)
 * para que al cruzar entre /cotizador y /cotizador-iq no se pierda la información.
 * Al cerrar el tab o navegador, los datos se borran automáticamente.
 */

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';

interface ClientData {
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  projectLocation: string;
  wantsContact: boolean;
}

interface QuotationContextValue {
  clientData: ClientData;
  setClientData: (data: Partial<ClientData>) => void;
  clearClientData: () => void;
}

const defaultClient: ClientData = {
  clientName: '',
  clientPhone: '',
  clientEmail: '',
  projectLocation: '',
  wantsContact: false,
};

const STORAGE_KEY = 'inalumh_client_data';

const QuotationContext = createContext<QuotationContextValue>({
  clientData: defaultClient,
  setClientData: () => {},
  clearClientData: () => {},
});

export function QuotationProvider({ children }: { children: ReactNode }) {
  const [clientData, setClientDataState] = useState<ClientData>(() => {
    try {
      const stored = sessionStorage.getItem(STORAGE_KEY);
      return stored ? { ...defaultClient, ...JSON.parse(stored) } : defaultClient;
    } catch {
      return defaultClient;
    }
  });

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(clientData));
    } catch { /* ignorar errores de storage */ }
  }, [clientData]);

  // useCallback garantiza referencia estable → evita loops infinitos en useEffect de los hijos
  const setClientData = useCallback((data: Partial<ClientData>) => {
    setClientDataState((prev) => ({ ...prev, ...data }));
  }, []);

  const clearClientData = useCallback(() => {
    setClientDataState(defaultClient);
    try { sessionStorage.removeItem(STORAGE_KEY); } catch { /* ignore */ }
  }, []);

  return (
    <QuotationContext.Provider value={{ clientData, setClientData, clearClientData }}>
      {children}
    </QuotationContext.Provider>
  );
}

export const useQuotationContext = () => useContext(QuotationContext);
