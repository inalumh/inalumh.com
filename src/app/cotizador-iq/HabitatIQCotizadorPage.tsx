import { useState, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import {
  ArrowLeft, ArrowRight, CheckCircle2, MapPin, User, Phone, Mail,
  Sparkles, AlertTriangle, Trash2, Truck, Calculator, Send, Home,
  ChevronRight, FileDown, PhoneCall, MessageCircle, CalendarCheck
} from 'lucide-react';
import { WhatsAppButton } from '../components/WhatsAppButton';
import { techCategories, HABITAT_PACKAGES } from './habitatPricingData';
import { calculateHabitatQuotation } from './useHabitatCalculator';
import type { QualityTier, TechCategory, TechServiceSelection, HabitatQuotationResult } from './habitat.types';
import { useQuotationContext } from '../context/QuotationContext';
import { saveQuotationToSupabase } from './saveQuotation';

const fmt = (n: number) =>
  new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(n);

const TOTAL_STEPS = 4;

const QUALITY_OPTIONS: { value: QualityTier; label: string; desc: string; color: string }[] = [
  { value: 'baja', label: 'Esencial', desc: 'Funcional y confiable. Ideal para presupuestos ajustados.', color: '#00A8E8' },
  { value: 'media', label: 'Avanzado', desc: 'Alta tecnología y durabilidad. Excelente relación costo-beneficio.', color: '#3366FF' },
  { value: 'alta', label: 'Premium', desc: 'Equipos de última generación, máxima seguridad y exclusividad.', color: '#7B2CBF' },
];

export default function HabitatIQCotizadorPage() {
  const { clientData, setClientData } = useQuotationContext();
  const [step, setStep] = useState(1);

  // Step 1
  const [clientName, setClientName] = useState(clientData.clientName || '');
  const [clientPhone, setClientPhone] = useState(clientData.clientPhone || '');
  const [clientEmail, setClientEmail] = useState(clientData.clientEmail || '');
  const [projectLocation, setProjectLocation] = useState(clientData.projectLocation || '');
  const [wantsContact, setWantsContact] = useState(clientData.wantsContact || false);

  // Sync back to context when step 1 changes
  useEffect(() => {
    setClientData({ clientName, clientPhone, clientEmail, projectLocation, wantsContact });
  }, [clientName, clientPhone, clientEmail, projectLocation, wantsContact, setClientData]);

  // Step 2
  const [selections, setSelections] = useState<TechServiceSelection[]>([]);
  // Stores the preferred quality tier per service even when quantity = 0
  const [qualityPrefs, setQualityPrefs] = useState<Record<string, QualityTier>>({});

  // Step 3
  const [additionalNotes, setAdditionalNotes] = useState('');

  // Result
  const [result, setResult] = useState<HabitatQuotationResult | null>(null);

  const canProceed = useCallback(() => {
    switch (step) {
      case 1:
        return clientName.trim() !== '' && clientPhone.trim() !== '';
      case 2:
        return selections.length > 0;
      case 3:
        return true;
      default:
        return false;
    }
  }, [step, clientName, clientPhone, selections]);

  const goNext = () => {
    if (step === 3) {
      const res = calculateHabitatQuotation(selections);
      setResult(res);
    }
    setStep((s) => Math.min(s + 1, TOTAL_STEPS));
  };

  const goBack = () => setStep((s) => Math.max(s - 1, 1));

  const updateSelection = (categoryId: TechCategory, serviceId: string, quantity: number, qualityTier: QualityTier) => {
    // Always persist the quality preference
    const prefKey = `${categoryId}__${serviceId}`;
    setQualityPrefs((prev) => ({ ...prev, [prefKey]: qualityTier }));
    setSelections((prev) => {
      const filtered = prev.filter((s) => !(s.categoryId === categoryId && s.serviceId === serviceId));
      if (quantity > 0) {
        return [...filtered, { categoryId, serviceId, quantity, qualityTier }];
      }
      return filtered;
    });
  };

  // Called when the user changes the quality dropdown.
  // If the item has no quantity yet, auto-set it to 1 so the selection registers.
  const handleQualityChange = (categoryId: TechCategory, serviceId: string, newTier: QualityTier) => {
    const currentSel = selections.find((s) => s.categoryId === categoryId && s.serviceId === serviceId);
    const qty = currentSel?.quantity ?? 0;
    updateSelection(categoryId, serviceId, qty === 0 ? 1 : qty, newTier);
  };

  const buildWhatsAppMessage = () => {
    if (!result) return '';
    const services = result.lineItems.map((li) => `• ${li.service} (${li.category})`).join('\n');
    return `✅ *Cotización Habitat IQ — inalumh.com*\n\n` +
      `Hola equipo Inalumh, acabo de cotizar servicios tecnológicos:\n\n` +
      `👤 *${clientName}*\n📞 ${clientPhone}\n` +
      (projectLocation ? `📍 ${projectLocation}\n` : '') +
      `\n*Servicios IQ:*\n${services}\n\n` +
      `💰 *Total estimado: ${fmt(result.grandTotal)}*\n\n` +
      `Me gustaría agendar una asesoría para confirmar el proyecto.`;
  };

  const notifyBusinessWhatsApp = () => {
    if (!result) return;
    const services = result.lineItems.map((li) => `• ${li.service}`).join('\n');
    const msg =
      `🔔 *Nueva cotización Habitat IQ — inalumh.com*\n\n` +
      `👤 *Cliente:* ${clientName}\n` +
      `📞 *Teléfono:* ${clientPhone}\n` +
      (clientEmail ? `✉️ *Email:* ${clientEmail}\n` : '') +
      (projectLocation ? `📍 *Ubicación:* ${projectLocation}\n` : '') +
      `\n*Servicios cotizados:*\n${services}\n\n` +
      `💰 *Total:* ${fmt(result.grandTotal)}\n\n` +
      (wantsContact
        ? `✅ *El cliente DESEA ser contactado al:* ${clientPhone}`
        : `⏸ El cliente no solicitó contacto directo.`);
    window.open(`https://wa.me/573133540258?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const generatePDF = async () => {
    if (!result) return;
    const doc = new jsPDF();

    try {
      const resp = await fetch('/images/LOGO-HABITAT-IQ.png');
      const blob = await resp.blob();
      const logoDataUrl = await new Promise<string>((res) => {
        const reader = new FileReader();
        reader.onloadend = () => res(reader.result as string);
        reader.readAsDataURL(blob);
      });
      doc.addImage(logoDataUrl, 'PNG', 155, 6, 42, 22);
    } catch { /* continuar sin logo */ }

    doc.setFontSize(20);
    doc.setTextColor(0, 168, 232); // #00A8E8
    doc.text('Cotización Habitat IQ', 14, 20);

    doc.setFontSize(9);
    doc.setTextColor(60, 60, 60);
    doc.text('Inalumh S.A.S. - División Tecnológica', 14, 28);
    doc.text('Domótica · Seguridad Inteligente · Redes · Datacenters', 14, 33);
    doc.setTextColor(130, 130, 130);
    doc.text('Tel: +57 313 354 0258  |  www.inalumh.com  |  Bogotá, Colombia', 14, 38);

    doc.setDrawColor(0, 168, 232);
    doc.setLineWidth(0.5);
    doc.line(14, 42, 196, 42);

    doc.setFontSize(9);
    doc.setTextColor(130, 130, 130);
    const now = new Date();
    doc.text(`Fecha: ${now.toLocaleDateString('es-CO')}  |  Hora: ${now.toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' })}`, 14, 48);
    if (wantsContact) {
      doc.setTextColor(6, 150, 100);
      doc.text(`✓ Cliente solicita ser contactado — ${clientPhone}`, 100, 48);
    }

    doc.setFontSize(9);
    doc.setTextColor(80, 80, 80);
    doc.text('En Habitat IQ fusionamos ingeniería de vanguardia con las necesidades cotidianas', 14, 54);
    doc.text('para crear espacios que anticipan tus necesidades.', 14, 59);

    doc.setFontSize(11);
    doc.setTextColor(40, 40, 40);
    doc.text('Información del Cliente', 14, 68);
    doc.setFontSize(10);
    doc.text(`Nombre: ${clientName}`, 14, 75);
    doc.text(`Teléfono: ${clientPhone}`, 14, 81);
    if (clientEmail) doc.text(`Email: ${clientEmail}`, 14, 87);
    if (projectLocation) doc.text(`Ubicación: ${projectLocation}`, 14, clientEmail ? 93 : 87);

    let currentY = clientEmail && projectLocation ? 101 : (clientEmail || projectLocation) ? 95 : 89;

    const tableBody = result.lineItems.map(li => [
      li.category, li.service, `${li.quantity} ${li.unit}`, fmt(li.unitPrice), fmt(li.subtotal)
    ]);

    autoTable(doc, {
      startY: currentY,
      head: [['Categoría', 'Servicio', 'Cantidad', 'Precio Unit.', 'Subtotal']],
      body: tableBody,
      theme: 'grid',
      headStyles: { fillColor: [0, 168, 232] },
      styles: { fontSize: 9 },
    });

    // @ts-ignore
    currentY = doc.lastAutoTable.finalY + 10;

    const totalsBody: [string, string][] = [
      ['Subtotal servicios', fmt(result.subtotalServices)],
      ['', ''],
      ['Subtotal neto', fmt(result.subtotalBeforeMargin)],
      [`Administración (${(result.adminRate * 100).toFixed(0)}%)`, `+${fmt(result.adminAmount)}`],
      [`Imprevistos (${(result.imprevistosRate * 100).toFixed(0)}%)`, `+${fmt(result.imprevistosAmount)}`],
      [`Utilidad (${(result.utilidadRate * 100).toFixed(0)}%)`, `+${fmt(result.utilidadAmount)}`],
      [`IVA sobre utilidad (${(result.ivaRate * 100).toFixed(0)}%)`, `+${fmt(result.ivaAmount)}`],
    ];

    autoTable(doc, {
      startY: currentY,
      body: totalsBody,
      theme: 'plain',
      styles: { fontSize: 10, halign: 'right' },
      columnStyles: { 0: { fontStyle: 'bold', halign: 'left' } },
      margin: { left: 90 },
    });

    // @ts-ignore
    currentY = doc.lastAutoTable.finalY + 6;

    doc.setFontSize(13);
    doc.setTextColor(0, 168, 232);
    doc.text(`TOTAL ESTIMADO: ${fmt(result.grandTotal)}`, 143, currentY, { align: 'center' });

    doc.setFontSize(8);
    doc.setTextColor(170, 170, 170);
    doc.text('Este documento es un estimado calculado automáticamente y no representa un contrato final.', 105, 278, { align: 'center' });
    doc.text('Se requiere visita técnica para confirmar el presupuesto definitivo. | Habitat IQ by Inalumh S.A.S.', 105, 283, { align: 'center' });
    doc.setTextColor(100, 100, 100);
    doc.text('Contáctenos: +57 313 354 0258  |  www.inalumh.com', 105, 288, { align: 'center' });

    doc.save(`Cotizacion_Habitat_IQ_${clientName.replace(/\s+/g, '_')}.pdf`);

    saveQuotationToSupabase({
      type: 'habitat_iq',
      client_name: clientName,
      client_phone: clientPhone,
      client_email: clientEmail,
      project_location: projectLocation,
      wants_contact: wantsContact,
      services: result.lineItems,
      grand_total: result.grandTotal,
      result_json: result
    });

    setTimeout(() => notifyBusinessWhatsApp(), 800);
  };

  return (
    <div className="min-h-screen bg-[#0a192f] text-white">
      {/* ── Top bar ─────────────────────────────────────────────────── */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#020617]/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link to="/habitat-iq" className="flex items-center gap-2 text-gray-300 hover:text-[#00A8E8] transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-semibold text-sm hidden sm:inline">Volver a Habitat IQ</span>
          </Link>
          <div className="bg-[#ffffffd7] p-1.5 rounded-md flex items-center justify-center">
            <img
              src="/images/LOGO-HABITAT-IQ.png"
              alt="Habitat IQ"
              className="h-9 w-auto"
            />
          </div>
          <div className="w-20" /> {/* spacer */}
        </div>
      </header>

      <main className="pt-24 pb-16 px-4 sm:px-6 max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#00A8E8]/10 border border-[#00A8E8]/30 rounded-full mb-4">
            <img
              src="/images/LOGO-HABITAT-IQ.png"
              alt="Habitat IQ"
              className="h-8 w-auto"
            />
            <span className="text-[#00A8E8] font-semibold text-sm">COTIZADOR INTELIGENTE</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
            Cotiza tecnología para tu <span className="text-[#00A8E8]">espacio</span>
          </h1>
          <p className="text-gray-400 max-w-lg mx-auto">
            Configura tus servicios de domótica, seguridad y redes en pocos pasos.
          </p>
        </motion.div>

        {/* ── Progress bar ────────────────────────────────────────── */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-2 px-1">
            {Array.from({ length: TOTAL_STEPS }).map((_, i) => {
              const s = i + 1;
              const done = s < step;
              const active = s === step;
              return (
                <div key={s} className="flex items-center gap-1 flex-1 last:flex-none">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold shrink-0 transition-all duration-300 ${done ? 'bg-[#00A8E8] text-white shadow-lg shadow-[#00A8E8]/30' : ''} ${active ? 'bg-[#00A8E8] text-white ring-4 ring-[#00A8E8]/20 shadow-lg shadow-[#00A8E8]/30' : ''} ${!done && !active ? 'bg-white/10 text-gray-500' : ''}`}>
                    {done ? <CheckCircle2 className="w-5 h-5" /> : s}
                  </div>
                  {s < TOTAL_STEPS && <div className={`h-1 flex-1 rounded-full transition-all duration-500 mx-1 ${s < step ? 'bg-[#00A8E8]' : 'bg-white/10'}`} />}
                </div>
              );
            })}
          </div>
          <div className="text-center text-sm text-gray-400 font-medium">Paso {step} de {TOTAL_STEPS}</div>
        </div>

        {/* ── Steps ───────────────────────────────────────────────── */}
        <AnimatePresence mode="wait">
          <motion.div key={step} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.3 }}>
            
            {step === 1 && (
              <Card title="Información del proyecto" subtitle="Cuéntanos sobre ti y tu proyecto">
                <div className="grid sm:grid-cols-2 gap-5">
                  <InputField icon={<User className="w-4 h-4" />} label="Nombre completo *" placeholder="Tu nombre" value={clientName} onChange={setClientName} />
                  <InputField icon={<Phone className="w-4 h-4" />} label="Teléfono *" placeholder="300 123 4567" value={clientPhone} onChange={setClientPhone} type="tel" />
                  <InputField icon={<Mail className="w-4 h-4" />} label="Correo electrónico" placeholder="correo@ejemplo.com" value={clientEmail} onChange={setClientEmail} type="email" />
                  <InputField icon={<MapPin className="w-4 h-4" />} label="Ubicación del proyecto" placeholder="Bogotá, Chía, etc." value={projectLocation} onChange={setProjectLocation} />
                </div>
                <button
                  onClick={() => setWantsContact(!wantsContact)}
                  className={`mt-5 w-full flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all duration-200 ${wantsContact ? 'border-[#00A8E8] bg-[#00A8E8]/10' : 'border-white/10 bg-white/5 hover:border-white/20'}`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${wantsContact ? 'bg-[#00A8E8] text-white' : 'bg-white/10 text-gray-400'}`}>
                    <PhoneCall className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className={`font-semibold text-sm ${ wantsContact ? 'text-[#00A8E8]' : 'text-gray-300' }`}>Deseo ser contactado por un asesor de Habitat IQ</div>
                    <div className="text-xs text-gray-500 mt-0.5">{clientPhone ? `Te contactaremos al ${clientPhone}` : 'Ingresa tu teléfono arriba para activar esta opción'}</div>
                  </div>
                  <div className={`w-10 h-6 rounded-full p-0.5 transition-all duration-300 ${ wantsContact ? 'bg-[#00A8E8]' : 'bg-white/20' }`}>
                    <div className={`w-5 h-5 rounded-full bg-white shadow transition-transform duration-300 ${ wantsContact ? 'translate-x-4' : 'translate-x-0' }`} />
                  </div>
                </button>
              </Card>
            )}

            {step === 2 && (
              <Card title="Selección de Servicios" subtitle="Configura los servicios tecnológicos que necesitas">
                <div className="space-y-8">
                  {techCategories.map(category => (
                    <div key={category.id} className="border border-white/10 rounded-2xl p-6 bg-white/5">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-2xl">{category.icon}</span>
                        <div>
                          <h3 className="font-bold text-lg text-white">{category.label}</h3>
                          <p className="text-sm text-gray-400">{category.description}</p>
                        </div>
                      </div>
                      <div className="space-y-4">
                        {category.services.map(service => {
                          const prefKey = `${category.id}__${service.id}`;
                          const currentSelection = selections.find(s => s.categoryId === category.id && s.serviceId === service.id);
                          const quantity = currentSelection?.quantity ?? 0;
                          // quality shown is: active selection tier > saved pref > default 'media'
                          const quality: QualityTier = currentSelection?.qualityTier ?? qualityPrefs[prefKey] ?? 'media';
                          const isActive = quantity > 0;

                          return (
                            <div key={service.id} className={`p-4 rounded-xl border flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all duration-200 ${
                              isActive
                                ? 'border-[#00A8E8]/40 bg-[#00A8E8]/5'
                                : 'border-white/5 bg-[#020617]/50'
                            }`}>
                              <div className="flex-1">
                                <div className={`font-semibold text-sm ${isActive ? 'text-white' : 'text-gray-200'}`}>{service.label}</div>
                                <div className="text-xs text-gray-500 mt-1">Unidad: {service.unit} | Desde {fmt(service.pricing.baja)}</div>
                              </div>
                              <div className="flex items-center gap-4">
                                <select 
                                  value={quality}
                                  onChange={(e) => handleQualityChange(category.id, service.id, e.target.value as QualityTier)}
                                  className="bg-white/10 border border-white/20 text-white text-sm rounded-lg px-3 py-1.5 focus:outline-none focus:border-[#00A8E8] cursor-pointer"
                                >
                                  <option value="baja" className="text-black">Esencial</option>
                                  <option value="media" className="text-black">Avanzado</option>
                                  <option value="alta" className="text-black">Premium</option>
                                </select>
                                <div className="flex items-center bg-white/10 rounded-lg">
                                  <button
                                    onClick={() => updateSelection(category.id, service.id, Math.max(0, quantity - 1), quality)}
                                    className="px-3 py-1.5 text-gray-400 hover:text-white disabled:opacity-30"
                                    disabled={quantity === 0}
                                  >-</button>
                                  <span className={`w-8 text-center text-sm font-semibold ${isActive ? 'text-[#00A8E8]' : ''}`}>{quantity}</span>
                                  <button
                                    onClick={() => updateSelection(category.id, service.id, quantity + 1, quality)}
                                    className="px-3 py-1.5 text-gray-400 hover:text-white"
                                  >+</button>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {step === 3 && (
              <Card title="Condiciones adicionales" subtitle="Factores que pueden afectar el presupuesto final">
                <label className="text-sm font-semibold text-gray-300 mb-2 block">Notas adicionales (opcional)</label>
                <textarea
                  value={additionalNotes}
                  onChange={(e) => setAdditionalNotes(e.target.value)}
                  rows={4}
                  placeholder="Describe cualquier detalle adicional sobre el proyecto (ej. planos existentes, restricciones del edificio, etc.)..."
                  className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white focus:border-[#00A8E8] focus:ring-2 focus:ring-[#00A8E8]/20 outline-none transition-all resize-none text-sm"
                />
              </Card>
            )}

            {step === 4 && result && (
              <div className="space-y-6">
                <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center">
                  <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-[#00A8E8] to-[#007EA7] flex items-center justify-center mb-4 shadow-xl shadow-[#00A8E8]/30">
                    <CheckCircle2 className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">¡Cotización lista!</h2>
                  <p className="text-gray-400 text-sm mt-1">Este es un estimado basado en los datos suministrados.</p>
                </motion.div>

                <Card title="Desglose de servicios" subtitle="Servicios seleccionados">
                  <div className="divide-y divide-white/10">
                    {result.lineItems.map((li, i) => (
                      <div key={i} className="flex items-center justify-between py-3">
                        <div>
                          <div className="font-medium text-gray-200 text-sm">{li.service}</div>
                          <div className="text-xs text-gray-500">{li.category} | {li.quantity} {li.unit} × {fmt(li.unitPrice)}</div>
                        </div>
                        <div className="font-semibold text-white">{fmt(li.subtotal)}</div>
                      </div>
                    ))}
                  </div>
                </Card>

                <Card title="Resumen financiero" subtitle="">
                  <div className="space-y-2 text-sm">
                    <Row label="Subtotal servicios" value={fmt(result.subtotalServices)} />
                    <div className="border-t border-white/10 pt-2 mt-2" />
                    <Row label="Subtotal neto" value={fmt(result.subtotalBeforeMargin)} bold />

                    <div className="mt-3 rounded-xl border border-white/10 bg-white/5 p-3 space-y-1.5">
                      <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Desglose de costos indirectos</div>
                      <Row label={`Administración (${(result.adminRate * 100).toFixed(0)}%)`} value={`+${fmt(result.adminAmount)}`} />
                      <Row label={`Imprevistos (${(result.imprevistosRate * 100).toFixed(0)}%)`} value={`+${fmt(result.imprevistosAmount)}`} />
                      <Row label={`Utilidad (${(result.utilidadRate * 100).toFixed(0)}%)`} value={`+${fmt(result.utilidadAmount)}`} />
                      <div className="border-t border-dashed border-white/10 pt-1.5">
                        <Row label={`IVA sobre utilidad (${(result.ivaRate * 100).toFixed(0)}%)`} value={`+${fmt(result.ivaAmount)}`} accent />
                      </div>
                    </div>

                    <div className="border-t-2 border-[#00A8E8]/30 pt-3 mt-3" />
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-white">TOTAL ESTIMADO</span>
                      <span className="text-2xl font-extrabold text-[#00A8E8]">{fmt(result.grandTotal)}</span>
                    </div>
                  </div>
                </Card>

                {/* Banner Cross-sell back to Inalumh */}
                <div className="mt-6 bg-gradient-to-r from-[#E63946]/20 to-transparent border border-[#E63946]/30 rounded-2xl p-6 relative overflow-hidden">
                  <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-bold text-white flex items-center gap-2">
                        <Home className="w-5 h-5 text-[#E63946]" /> ¿También necesitas obra civil?
                      </h3>
                      <p className="text-sm text-gray-300 mt-1">Cotiza remodelación, fachadas y carpintería con Inalumh.</p>
                    </div>
                    <Link to="/cotizador" className="px-6 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-sm font-semibold transition-colors whitespace-nowrap">
                      Ir a Cotizador Inalumh →
                    </Link>
                  </div>
                </div>

                {/* ── Tutorial de próximos pasos ── */}
                <NextStepsTutorial theme="cyan" />

                <div className="flex flex-col sm:flex-row gap-3 flex-wrap mt-6">
                  <button onClick={generatePDF} className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-[#00A8E8] hover:bg-[#007EA7] text-white font-bold rounded-2xl transition-all shadow-lg shadow-[#00A8E8]/20">
                    <FileDown className="w-5 h-5" /> Descargar PDF
                  </button>
                  <a href={`https://wa.me/573133540258?text=${encodeURIComponent(buildWhatsAppMessage())}`} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-[#25D366] hover:bg-[#1ebe57] text-white font-bold rounded-2xl transition-all shadow-lg shadow-[#25D366]/30">
                    <Send className="w-5 h-5" /> Enviar WhatsApp
                  </a>
                  <button onClick={() => { setStep(1); setResult(null); setSelections([]); }} className="flex-none sm:flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-white/5 border border-white/10 hover:border-white/20 text-gray-300 hover:text-white font-bold rounded-2xl transition-all">
                    <Calculator className="w-5 h-5" /> Nueva
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {step < TOTAL_STEPS && (
          <div className="flex items-center justify-between mt-8 gap-4">
            {step > 1 ? (
              <button onClick={goBack} className="flex items-center gap-2 px-5 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all font-semibold text-sm">
                <ArrowLeft className="w-4 h-4" /> Anterior
              </button>
            ) : <div />}
            <button onClick={goNext} disabled={!canProceed()} className={`flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold transition-all text-sm ${canProceed() ? 'bg-[#00A8E8] text-white hover:bg-[#007EA7] shadow-lg shadow-[#00A8E8]/30' : 'bg-white/5 text-gray-500 cursor-not-allowed'}`}>
              {step === 3 ? 'Generar cotización' : 'Siguiente'}
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </main>
      <WhatsAppButton theme="cyan" message="¡Hola! Estoy usando el cotizador de Habitat IQ y tengo dudas." />
    </div>
  );
}

function Card({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <div className="bg-[#020617]/50 backdrop-blur-xl rounded-2xl border border-white/10 shadow-lg p-6 sm:p-8">
      <h2 className="text-xl font-bold text-white mb-1">{title}</h2>
      {subtitle && <p className="text-sm text-gray-400 mb-6">{subtitle}</p>}
      {children}
    </div>
  );
}

function InputField({ icon, label, placeholder, value, onChange, type = 'text' }: {
  icon: React.ReactNode; label: string; placeholder: string; value: string; onChange: (v: string) => void; type?: string;
}) {
  return (
    <div>
      <label className="text-sm font-semibold text-gray-300 mb-1.5 flex items-center gap-1.5">
        <span className="text-[#00A8E8]">{icon}</span> {label}
      </label>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white focus:border-[#00A8E8] focus:ring-2 focus:ring-[#00A8E8]/20 outline-none transition-all text-sm placeholder:text-gray-600" />
    </div>
  );
}

function Row({ label, value, bold, accent }: { label: string; value: string; bold?: boolean; accent?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className={`${bold ? 'font-semibold text-white' : 'text-gray-400'}`}>{label}</span>
      <span className={`font-semibold ${accent ? 'text-[#00A8E8]' : bold ? 'text-white' : 'text-gray-200'}`}>{value}</span>
    </div>
  );
}

function NextStepsTutorial({ theme }: { theme: 'red' | 'cyan' }) {
  const accent = theme === 'red' ? '#E63946' : '#00A8E8';
  const accentBorder = theme === 'red' ? 'rgba(230,57,70,0.2)' : 'rgba(0,168,232,0.2)';
  const textAccent = theme === 'red' ? 'text-[#E63946]' : 'text-[#00A8E8]';
  const bgLight = theme === 'red' ? 'bg-[#E63946]/5' : 'bg-[#00A8E8]/5';
  const borderLight = theme === 'red' ? 'border-[#E63946]/15' : 'border-[#00A8E8]/15';
  const shadowAccent = theme === 'red' ? 'shadow-[#E63946]/10' : 'shadow-[#00A8E8]/10';

  const steps = [
    {
      num: '1',
      icon: <FileDown className="w-5 h-5" />,
      title: 'Descarga tu PDF',
      desc: 'Guarda o imprime tu cotización. Este documento tiene la fecha, tus datos y el desglose completo.',
    },
    {
      num: '2',
      icon: <MessageCircle className="w-5 h-5" />,
      title: 'Escríbenos por WhatsApp',
      desc: 'Envíanos el PDF y dinos que quieres confirmar tu proyecto. Respondemos en menos de 2 horas hábiles.',
      highlight: '+57 313 354 0258',
    },
    {
      num: '3',
      icon: <CalendarCheck className="w-5 h-5" />,
      title: 'Agenda la visita técnica',
      desc: 'Un experto visitará tu espacio para confirmar los requerimientos y ajustar el presupuesto final.',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15, duration: 0.4 }}
      className={`rounded-2xl border p-6 sm:p-7 mt-6 ${bgLight} ${borderLight} shadow-lg ${shadowAccent}`}
    >
      <div className="flex items-center gap-2 mb-5">
        <div className="w-1 h-6 rounded-full" style={{ backgroundColor: accent }} />
        <h3 className={`font-bold text-base ${textAccent}`}>¿Qué sigue después de tu cotización?</h3>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        {steps.map((s, idx) => (
          <div key={idx} className="flex-1 flex flex-col gap-2">
            <div className="flex items-start gap-3">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0 shadow-md"
                style={{ backgroundColor: accent }}
              >
                {s.num}
              </div>
              <div className="pt-0.5 flex-1">
                <div className="flex items-center gap-1.5 mb-1">
                  <span style={{ color: accent }}>{s.icon}</span>
                  <span className="font-semibold text-sm"
                    style={{ color: theme === 'red' ? '#1a1a1a' : '#ffffff' }}
                  >{s.title}</span>
                </div>
                <p className="text-xs leading-relaxed"
                  style={{ color: theme === 'red' ? '#6b7280' : '#94a3b8' }}
                >{s.desc}</p>
                {s.highlight && (
                  <span
                    className="inline-block mt-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold text-white"
                    style={{ backgroundColor: accent }}
                  >{s.highlight}</span>
                )}
              </div>
            </div>
            {idx < steps.length - 1 && (
              <div className="hidden sm:flex justify-end items-center pr-1 pt-1">
                <ArrowRight className="w-4 h-4" style={{ color: accent, opacity: 0.4 }} />
              </div>
            )}
          </div>
        ))}
      </div>

      <div
        className="mt-5 pt-4 border-t text-xs"
        style={{ borderColor: accentBorder, color: theme === 'red' ? '#9ca3af' : '#64748b' }}
      >
        💡 Este estimado no es un contrato. La visita técnica confirma requerimientos y precios definitivos.
      </div>
    </motion.div>
  );
}
