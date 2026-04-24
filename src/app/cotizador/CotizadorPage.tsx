/**
 * CotizadorPage.tsx
 * ─────────────────────────────────────────────────────────────────────
 * Full-page quotation wizard with 5 steps:
 *   1. Project Info   2. Area & Services   3. Quality
 *   4. Extras         5. Summary / Result
 *
 * Self-contained — uses Tailwind + Lucide + Framer Motion
 * to match the existing Inalumh visual language.
 * ─────────────────────────────────────────────────────────────────────
 */

import { useState, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  MapPin,
  User,
  Phone,
  Mail,
  Ruler,
  Sparkles,
  AlertTriangle,
  Trash2,
  Truck,
  Calculator,
  Send,
  Home,
  ChevronRight,
  FileDown,
  PhoneCall,
  MessageCircle,
  CalendarCheck,
} from 'lucide-react';
import { WhatsAppButton } from '../components/WhatsAppButton';
import { constructionServices, DIFFICULTY_FACTORS } from './pricingData';
import { calculateQuotation } from './useQuotationCalculator';
import type {
  ConstructionCategory,
  QualityTier,
  DifficultyLevel,
  QuotationResult,
} from './quotation.types';
import { useQuotationContext } from '../context/QuotationContext';
import { saveQuotationToSupabase } from '../cotizador-iq/saveQuotation';

// ═══════════════════════════════════════════════════════════════════════
//  HELPERS
// ═══════════════════════════════════════════════════════════════════════

const fmt = (n: number) =>
  new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(n);

const TOTAL_STEPS = 5;

const QUALITY_OPTIONS: { value: QualityTier; label: string; desc: string; color: string }[] = [
  { value: 'baja', label: 'Estándar', desc: 'Materiales funcionales con buena relación costo-beneficio', color: '#06D6A0' },
  { value: 'media', label: 'Premium', desc: 'Materiales de primera calidad y acabados superiores', color: '#F77F00' },
  { value: 'alta', label: 'Luxury', desc: 'Materiales importados, diseño exclusivo, alta gama', color: '#E63946' },
];

const DIFFICULTY_OPTIONS: { value: DifficultyLevel; label: string; desc: string; factor: string }[] = [
  { value: 'normal', label: 'Acceso normal', desc: 'Sin restricciones de acceso', factor: '+0%' },
  { value: 'moderada', label: 'Acceso moderado', desc: 'Espacios reducidos, zonas parciales', factor: '+10%' },
  { value: 'alta', label: 'Acceso difícil', desc: 'Alturas, zonas restringidas, estructuras antiguas', factor: '+20%' },
];

// ═══════════════════════════════════════════════════════════════════════
//  COMPONENT
// ═══════════════════════════════════════════════════════════════════════

export default function CotizadorPage() {
  // ── Wizard state ───────────────────────────────────────────────────
  const [step, setStep] = useState(1);

  const { clientData, setClientData } = useQuotationContext();

  // Step 1
  const [clientName, setClientName] = useState(clientData.clientName || '');
  const [clientPhone, setClientPhone] = useState(clientData.clientPhone || '');
  const [clientEmail, setClientEmail] = useState(clientData.clientEmail || '');
  const [projectLocation, setProjectLocation] = useState(clientData.projectLocation || '');

  // Step 2
  const [selectedServices, setSelectedServices] = useState<ConstructionCategory[]>([]);
  const [areaM2, setAreaM2] = useState<number>(0);
  // Custom m² per service (ventaneria, fachadas, carpinteria, hidraulico)
  const [serviceAreas, setServiceAreas] = useState<Partial<Record<ConstructionCategory, number>>>({});
  // Bathroom count for divisiones_bano
  const [bathroomCount, setBathroomCount] = useState<number>(1);

  // Services that need their own m² input
  const CUSTOM_AREA_SERVICES: ConstructionCategory[] = ['ventaneria', 'fachadas', 'carpinteria', 'hidraulico'];

  // Step 3
  const [qualityTier, setQualityTier] = useState<QualityTier>('media');

  // Step 4
  const [difficulty, setDifficulty] = useState<DifficultyLevel>('normal');
  const [includesDemolition, setIncludesDemolition] = useState(false);
  const [includesDebrisRemoval, setIncludesDebrisRemoval] = useState(false);
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [wantsContact, setWantsContact] = useState(clientData.wantsContact || false);

  useEffect(() => {
    setClientData({ clientName, clientPhone, clientEmail, projectLocation, wantsContact });
  }, [clientName, clientPhone, clientEmail, projectLocation, wantsContact, setClientData]);

  // Result
  const [result, setResult] = useState<QuotationResult | null>(null);

  // ── Navigation validation ──────────────────────────────────────────
  const canProceed = useCallback(() => {
    switch (step) {
      case 1:
        return clientName.trim() !== '' && clientPhone.trim() !== '';
      case 2: {
        if (selectedServices.length === 0 || areaM2 <= 0) return false;
        // All selected custom-area services must have their own m² filled in
        const missingCustomArea = selectedServices
          .filter(id => CUSTOM_AREA_SERVICES.includes(id))
          .some(id => !(serviceAreas[id] && serviceAreas[id]! > 0));
        if (missingCustomArea) return false;
        // divisiones_bano needs at least 1 bathroom
        if (selectedServices.includes('divisiones_bano') && bathroomCount < 1) return false;
        return true;
      }
      case 3:
        return true;
      case 4:
        return true;
      default:
        return false;
    }
  }, [step, clientName, clientPhone, selectedServices, areaM2, serviceAreas, bathroomCount, CUSTOM_AREA_SERVICES]);

  const goNext = () => {
    if (step === 4) {
      const res = calculateQuotation({
        selectedServices,
        areaM2,
        serviceAreas,
        bathroomCount,
        qualityTier,
        difficulty,
        includesDemolition,
        includesDebrisRemoval,
      });
      setResult(res);
    }
    setStep((s) => Math.min(s + 1, TOTAL_STEPS));
  };

  const goBack = () => setStep((s) => Math.max(s - 1, 1));

  const toggleService = (id: ConstructionCategory) => {
    setSelectedServices((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  // ── WhatsApp message builder (cliente → Inalumh) ───────────────────
  const buildWhatsAppMessage = () => {
    if (!result) return '';
    const services = result.lineItems.map((li) => `• ${li.service}`).join('\n');
    return `✅ *Confirmación de cotización — inalumh.com*\n\n` +
      `Hola equipo Inalumh, acabo de descargar mi cotización:\n\n` +
      `👤 *${clientName}*\n📞 ${clientPhone}\n` +
      (projectLocation ? `📍 ${projectLocation}\n` : '') +
      `📐 ${areaM2} m²\n\n` +
      `*Servicios:*\n${services}\n\n` +
      `💰 *Total estimado: ${fmt(result.grandTotal)}*\n\n` +
      `Me gustaría agendar una visita técnica para confirmar el presupuesto.`;
  };

  // ── Notificación al negocio vía WhatsApp ───────────────────────────
  const notifyBusinessWhatsApp = () => {
    if (!result) return;
    const services = result.lineItems.map((li) => `• ${li.service}`).join('\n');
    const msg =
      `🔔 *Nueva cotización generada — inalumh.com*\n\n` +
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

  // ── PDF generation ───────────────────────────────────────────────────
  const generatePDF = async () => {
    if (!result) return;
    const doc = new jsPDF();

    // ── Logo (carga async desde public) ─────────────────────────────
    try {
      const resp = await fetch('/images/LOGO-INALUMH.png');
      const blob = await resp.blob();
      const logoDataUrl = await new Promise<string>((res) => {
        const reader = new FileReader();
        reader.onloadend = () => res(reader.result as string);
        reader.readAsDataURL(blob);
      });
      doc.addImage(logoDataUrl, 'PNG', 155, 6, 42, 22);
    } catch { /* continuar sin logo */ }

    // ── Encabezado empresa ───────────────────────────────────────────
    doc.setFontSize(20);
    doc.setTextColor(230, 57, 70);
    doc.text('Cotización de Proyecto', 14, 20);

    doc.setFontSize(9);
    doc.setTextColor(60, 60, 60);
    doc.text('Inalumh S.A.S.', 14, 28);
    doc.text('Construcción · Ventanería en Aluminio · Fachadas · Remodelaciones · Domótica', 14, 33);
    doc.setTextColor(130, 130, 130);
    doc.text('Tel: +57 313 354 0258  |  www.inalumh.com  |  Bogotá, Colombia', 14, 38);

    doc.setDrawColor(230, 57, 70);
    doc.setLineWidth(0.5);
    doc.line(14, 42, 196, 42);

    doc.setFontSize(9);
    doc.setTextColor(130, 130, 130);
    const now = new Date();
    doc.text(
      `Fecha: ${now.toLocaleDateString('es-CO')}  |  Hora: ${now.toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' })}`,
      14, 48
    );
    if (wantsContact) {
      doc.setTextColor(6, 150, 100);
      doc.text(`✓ Cliente solicita ser contactado — ${clientPhone}`, 100, 48);
    }

    // ── Descripción de la empresa ─────────────────────────────────
    doc.setFontSize(9);
    doc.setTextColor(80, 80, 80);
    doc.text(
      'En INALUMH S.A.S. nos especializamos en brindar soluciones integrales para la construcción y',
      14, 54
    );
    doc.text('renovación de espacios arquitectónicos.', 14, 59);

    // ── Info del cliente ─────────────────────────────────────────────
    doc.setFontSize(11);
    doc.setTextColor(40, 40, 40);
    doc.text('Información del Cliente', 14, 68);
    doc.setFontSize(10);
    doc.text(`Nombre: ${clientName}`, 14, 75);
    doc.text(`Teléfono: ${clientPhone}`, 14, 81);
    if (clientEmail) doc.text(`Email: ${clientEmail}`, 14, 87);
    if (projectLocation) doc.text(`Ubicación: ${projectLocation}`, 14, clientEmail ? 93 : 87);

    let currentY = clientEmail && projectLocation ? 101 : (clientEmail || projectLocation) ? 95 : 89;

    // ── Tabla de servicios ───────────────────────────────────────────
    const tableBody = result.lineItems.map(li => [
      li.service, `${li.area} m²`, fmt(li.unitPrice), fmt(li.subtotal)
    ]);

    autoTable(doc, {
      startY: currentY,
      head: [['Servicio', 'Área', 'Precio/m²', 'Subtotal']],
      body: tableBody,
      theme: 'grid',
      headStyles: { fillColor: [230, 57, 70] },
      styles: { fontSize: 9 },
    });

    // @ts-ignore
    currentY = doc.lastAutoTable.finalY + 10;

    // ── Desglose de costos ───────────────────────────────────────────
    const totalsBody: [string, string][] = [
      ['Subtotal servicios', fmt(result.subtotalServices)],
    ];
    if (result.difficultyAmount > 0)
      totalsBody.push([`Dificultad de acceso (×${result.difficultyMultiplier})`, `+${fmt(result.difficultyAmount)}`]);
    if (result.demolitionCost > 0)
      totalsBody.push(['Demolición previa', `+${fmt(result.demolitionCost)}`]);
    if (result.debrisRemovalCost > 0)
      totalsBody.push(['Retiro de escombros', `+${fmt(result.debrisRemovalCost)}`]);

    totalsBody.push(['', '']);
    totalsBody.push(['Subtotal neto', fmt(result.subtotalBeforeMargin)]);
    totalsBody.push([`Administración (${(result.adminRate * 100).toFixed(0)}%)`, `+${fmt(result.adminAmount)}`]);
    totalsBody.push([`Imprevistos (${(result.imprevistosRate * 100).toFixed(0)}%)`, `+${fmt(result.imprevistosAmount)}`]);
    totalsBody.push([`Utilidad (${(result.utilidadRate * 100).toFixed(0)}%)`, `+${fmt(result.utilidadAmount)}`]);
    totalsBody.push([`IVA sobre utilidad (${(result.ivaRate * 100).toFixed(0)}%)`, `+${fmt(result.ivaAmount)}`]);

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
    doc.setTextColor(230, 57, 70);
    doc.text(`TOTAL ESTIMADO: ${fmt(result.grandTotal)}`, 143, currentY, { align: 'center' });

    doc.setFontSize(9);
    doc.setTextColor(150, 150, 150);
    doc.text(`Tiempo estimado: ~${result.estimatedDays} días hábiles`, 143, currentY + 7, { align: 'center' });

    // ── Pie de página ────────────────────────────────────────────────
    doc.setFontSize(8);
    doc.setTextColor(170, 170, 170);
    doc.text('Este documento es un estimado calculado automáticamente y no representa un contrato final.', 105, 278, { align: 'center' });
    doc.text('Se requiere visita técnica para confirmar el presupuesto definitivo. | Inalumh S.A.S.', 105, 283, { align: 'center' });
    doc.setTextColor(100, 100, 100);
    doc.text('Contáctenos: +57 313 354 0258  |  www.inalumh.com', 105, 288, { align: 'center' });

    doc.save(`Cotizacion_Inalumh_${clientName.replace(/\s+/g, '_')}.pdf`);

    saveQuotationToSupabase({
      type: 'construccion',
      client_name: clientName,
      client_phone: clientPhone,
      client_email: clientEmail,
      project_location: projectLocation,
      wants_contact: wantsContact,
      services: result.lineItems,
      grand_total: result.grandTotal,
      result_json: result
    });

    // ── Notificar a Inalumh por WhatsApp (auto, con delay) ──────────
    setTimeout(() => notifyBusinessWhatsApp(), 800);
  };

  // ═══════════════════════════════════════════════════════════════════
  //  RENDER
  // ═══════════════════════════════════════════════════════════════════

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8f8f8] via-white to-[#fdf2f2]">
      {/* ── Top bar ─────────────────────────────────────────────────── */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200/60">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-[#1a1a1a] hover:text-[#E63946] transition-colors">
            <Home className="w-5 h-5" />
            <span className="font-semibold text-sm hidden sm:inline">Volver al inicio</span>
          </Link>
          <div className="flex items-center gap-2">
            <div className="bg-[#E63946] p-1 rounded-md">
              <img src="/images/logo_b_150.png" alt="Inalumh" className="h-7 w-auto" />
            </div>
            <span className="font-bold text-lg tracking-tight">INALUMH</span>
          </div>
          <div className="w-20" /> {/* spacer */}
        </div>
      </header>

      <main className="pt-24 pb-16 px-4 sm:px-6 max-w-4xl mx-auto">
        {/* ── Page title ──────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#E63946]/10 border border-[#E63946]/30 rounded-full mb-4">
            <Calculator className="w-4 h-4 text-[#E63946]" />
            <span className="text-[#E63946] font-semibold text-sm">COTIZADOR INTELIGENTE</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#1a1a1a] mb-2">
            Cotiza tu proyecto <span className="text-[#E63946]">al instante</span>
          </h1>
          <p className="text-gray-500 max-w-lg mx-auto">
            Responde unas preguntas sencillas y obtén un estimado profesional en minutos.
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
                  <div
                    className={`
                      w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold shrink-0 transition-all duration-300
                      ${done ? 'bg-[#E63946] text-white shadow-lg shadow-[#E63946]/30' : ''}
                      ${active ? 'bg-[#E63946] text-white ring-4 ring-[#E63946]/20 shadow-lg shadow-[#E63946]/30' : ''}
                      ${!done && !active ? 'bg-gray-200 text-gray-500' : ''}
                    `}
                  >
                    {done ? <CheckCircle2 className="w-5 h-5" /> : s}
                  </div>
                  {s < TOTAL_STEPS && (
                    <div className={`h-1 flex-1 rounded-full transition-all duration-500 mx-1 ${
                      s < step ? 'bg-[#E63946]' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              );
            })}
          </div>
          <div className="text-center text-sm text-gray-400 font-medium">
            Paso {step} de {TOTAL_STEPS}
          </div>
        </div>

        {/* ── Steps ───────────────────────────────────────────────── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.3 }}
          >
            {/* ──────── STEP 1: Project Info ──────── */}
            {step === 1 && (
              <Card title="Información del proyecto" subtitle="Cuéntanos sobre ti y tu proyecto">
                <div className="grid sm:grid-cols-2 gap-5">
                  <InputField icon={<User className="w-4 h-4" />} label="Nombre completo *" placeholder="Tu nombre" value={clientName} onChange={setClientName} />
                  <InputField icon={<Phone className="w-4 h-4" />} label="Teléfono *" placeholder="300 123 4567" value={clientPhone} onChange={setClientPhone} type="tel" />
                  <InputField icon={<Mail className="w-4 h-4" />} label="Correo electrónico" placeholder="correo@ejemplo.com" value={clientEmail} onChange={setClientEmail} type="email" />
                  <InputField icon={<MapPin className="w-4 h-4" />} label="Ubicación del proyecto" placeholder="Bogotá, Chía, etc." value={projectLocation} onChange={setProjectLocation} />
                </div>

                {/* Toggle quiero ser contactado */}
                <button
                  onClick={() => setWantsContact(!wantsContact)}
                  className={`mt-5 w-full flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                    wantsContact ? 'border-[#E63946] bg-[#E63946]/5' : 'border-gray-200 bg-gray-50 hover:border-gray-300'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                    wantsContact ? 'bg-[#E63946] text-white' : 'bg-gray-200 text-gray-400'
                  }`}>
                    <PhoneCall className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className={`font-semibold text-sm ${ wantsContact ? 'text-[#E63946]' : 'text-gray-700' }`}>
                      Deseo ser contactado por un asesor de Inalumh
                    </div>
                    <div className="text-xs text-gray-400 mt-0.5">
                      {clientPhone ? `Te contactaremos al ${clientPhone}` : 'Ingresa tu teléfono arriba para activar esta opción'}
                    </div>
                  </div>
                  <div className={`w-10 h-6 rounded-full p-0.5 transition-all duration-300 ${ wantsContact ? 'bg-[#E63946]' : 'bg-gray-300' }`}>
                    <div className={`w-5 h-5 rounded-full bg-white shadow transition-transform duration-300 ${ wantsContact ? 'translate-x-4' : 'translate-x-0' }`} />
                  </div>
                </button>
              </Card>
            )}

            {/* ──────── STEP 2: Services & Area ──────── */}
            {step === 2 && (
              <Card title="Servicios y área" subtitle="Selecciona los servicios que necesitas y el área estimada">
                <div className="mb-6">
                  <label className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    <Ruler className="w-4 h-4 text-[#E63946]" />
                    Área total del proyecto (m²)
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={areaM2 || ''}
                    onChange={(e) => setAreaM2(Number(e.target.value))}
                    placeholder="Ej: 50"
                    className="w-full sm:w-48 px-4 py-3 rounded-xl border border-gray-200 bg-white focus:border-[#E63946] focus:ring-2 focus:ring-[#E63946]/20 outline-none transition-all text-lg font-semibold"
                  />
                  <p className="text-xs text-gray-400 mt-1.5">Metraje general del proyecto. Algunos servicios tienen su propio m² independiente.</p>
                </div>

                <label className="text-sm font-semibold text-gray-700 mb-3 block">
                  Selecciona los servicios requeridos
                </label>
                <div className="grid sm:grid-cols-2 gap-3">
                  {constructionServices.map((svc) => {
                    const selected = selectedServices.includes(svc.id);
                    const needsCustomArea = CUSTOM_AREA_SERVICES.includes(svc.id);
                    const needsBathrooms = svc.id === 'divisiones_bano';

                    return (
                      <div key={svc.id} className="flex flex-col gap-0">
                        <button
                          onClick={() => toggleService(svc.id)}
                          className={`
                            flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-all duration-200
                            ${selected
                              ? needsCustomArea || needsBathrooms
                                ? 'border-[#E63946] bg-[#E63946]/5 shadow-md shadow-[#E63946]/10 rounded-b-none border-b-0'
                                : 'border-[#E63946] bg-[#E63946]/5 shadow-md shadow-[#E63946]/10'
                              : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'}
                          `}
                        >
                          <span className="text-2xl">{svc.icon}</span>
                          <div className="flex-1 min-w-0">
                            <div className={`font-semibold text-sm ${selected ? 'text-[#E63946]' : 'text-gray-800'}`}>
                              {svc.label}
                            </div>
                            <div className="text-xs text-gray-400 mt-0.5">
                              Desde {fmt(svc.pricing.baja.totalM2)}/m²
                              {needsCustomArea && <span className="text-[#E63946] ml-1">· m² propios</span>}
                              {needsBathrooms && <span className="text-[#E63946] ml-1">· por baño</span>}
                            </div>
                          </div>
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                            selected ? 'border-[#E63946] bg-[#E63946]' : 'border-gray-300'
                          }`}>
                            {selected && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                          </div>
                        </button>

                        {/* Extra input — m² propios */}
                        {selected && needsCustomArea && (
                          <div className="px-4 py-3 bg-[#E63946]/5 border-2 border-[#E63946] border-t-0 rounded-b-xl">
                            <label className="text-xs font-semibold text-[#E63946] mb-1.5 flex items-center gap-1">
                              <Ruler className="w-3 h-3" />
                              ¿Cuántos m² de {svc.label.toLowerCase()}?
                            </label>
                            <input
                              type="number"
                              min={1}
                              value={serviceAreas[svc.id] || ''}
                              onChange={(e) => setServiceAreas(prev => ({ ...prev, [svc.id]: Number(e.target.value) }))}
                              placeholder="Ej: 12"
                              className="w-36 px-3 py-2 rounded-lg border border-[#E63946]/30 bg-white focus:border-[#E63946] focus:ring-2 focus:ring-[#E63946]/20 outline-none text-sm font-semibold"
                              onClick={(e) => e.stopPropagation()}
                            />
                            <span className="text-xs text-gray-500 ml-2">m²</span>
                          </div>
                        )}

                        {/* Extra input — cantidad de baños */}
                        {selected && needsBathrooms && (
                          <div className="px-4 py-3 bg-[#E63946]/5 border-2 border-[#E63946] border-t-0 rounded-b-xl">
                            <label className="text-xs font-semibold text-[#E63946] mb-1.5 block">
                              ¿Cuántos baños tiene el proyecto?
                            </label>
                            <div className="flex items-center gap-3">
                              <button
                                onClick={(e) => { e.stopPropagation(); setBathroomCount(c => Math.max(1, c - 1)); }}
                                className="w-8 h-8 rounded-full border-2 border-[#E63946]/40 bg-white text-[#E63946] font-bold hover:bg-[#E63946] hover:text-white transition-all flex items-center justify-center text-lg"
                              >-</button>
                              <span className="w-8 text-center font-bold text-[#E63946] text-lg">{bathroomCount}</span>
                              <button
                                onClick={(e) => { e.stopPropagation(); setBathroomCount(c => c + 1); }}
                                className="w-8 h-8 rounded-full border-2 border-[#E63946]/40 bg-white text-[#E63946] font-bold hover:bg-[#E63946] hover:text-white transition-all flex items-center justify-center text-lg"
                              >+</button>
                              <span className="text-xs text-gray-500">{bathroomCount === 1 ? 'baño' : 'baños'}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </Card>
            )}

            {/* ──────── STEP 3: Quality ──────── */}
            {step === 3 && (
              <Card title="Nivel de calidad" subtitle="Elige la gama de materiales y acabados para tu proyecto">
                <div className="grid gap-4">
                  {QUALITY_OPTIONS.map((opt) => {
                    const selected = qualityTier === opt.value;
                    return (
                      <button
                        key={opt.value}
                        onClick={() => setQualityTier(opt.value)}
                        className={`
                          relative flex items-center gap-4 p-5 rounded-2xl border-2 text-left transition-all duration-300
                          ${selected
                            ? 'border-[#E63946] bg-white shadow-xl shadow-[#E63946]/10'
                            : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'}
                        `}
                      >
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center text-white text-xl font-bold shrink-0"
                          style={{ backgroundColor: opt.color }}
                        >
                          <Sparkles className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                          <div className="font-bold text-lg text-gray-900">{opt.label}</div>
                          <div className="text-sm text-gray-500 mt-0.5">{opt.desc}</div>
                        </div>
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                          selected ? 'border-[#E63946] bg-[#E63946]' : 'border-gray-300'
                        }`}>
                          {selected && <CheckCircle2 className="w-4 h-4 text-white" />}
                        </div>
                        {selected && (
                          <motion.div
                            layoutId="quality-indicator"
                            className="absolute inset-0 rounded-2xl border-2 border-[#E63946] pointer-events-none"
                          />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Live preview */}
                {selectedServices.length > 0 && areaM2 > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 p-4 rounded-xl bg-gray-50 border border-gray-100"
                  >
                    <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                      Vista previa — solo servicios
                    </div>
                    {selectedServices.map((svcId) => {
                      const svc = constructionServices.find((s) => s.id === svcId);
                      if (!svc) return null;
                      const price = svc.pricing[qualityTier].totalM2;
                      const M2_PER_BATHROOM = 4;
                      const effectiveArea =
                        svcId === 'divisiones_bano'
                          ? bathroomCount * M2_PER_BATHROOM
                          : CUSTOM_AREA_SERVICES.includes(svcId) && (serviceAreas[svcId] ?? 0) > 0
                            ? serviceAreas[svcId]!
                            : areaM2;
                      return (
                        <div key={svcId} className="flex items-center justify-between py-1 text-sm">
                          <span className="text-gray-600">
                            {svc.icon} {svc.label}
                            {svcId === 'divisiones_bano'
                              ? <span className="text-xs text-gray-400 ml-1">({bathroomCount} {bathroomCount === 1 ? 'baño' : 'baños'})</span>
                              : CUSTOM_AREA_SERVICES.includes(svcId)
                                ? <span className="text-xs text-gray-400 ml-1">({effectiveArea} m²)</span>
                                : null}
                          </span>
                          <span className="font-semibold text-gray-800">{fmt(price * effectiveArea)}</span>
                        </div>
                      );
                    })}
                  </motion.div>
                )}
              </Card>
            )}

            {/* ──────── STEP 4: Extras ──────── */}
            {step === 4 && (
              <Card title="Condiciones adicionales" subtitle="Factores que pueden afectar el presupuesto final">
                {/* Difficulty */}
                <label className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-[#F77F00]" />
                  Dificultad de acceso
                </label>
                <div className="grid sm:grid-cols-3 gap-3 mb-6">
                  {DIFFICULTY_OPTIONS.map((opt) => {
                    const selected = difficulty === opt.value;
                    return (
                      <button
                        key={opt.value}
                        onClick={() => setDifficulty(opt.value)}
                        className={`
                          p-4 rounded-xl border-2 text-left transition-all duration-200
                          ${selected
                            ? 'border-[#E63946] bg-[#E63946]/5 shadow-md'
                            : 'border-gray-200 bg-white hover:border-gray-300'}
                        `}
                      >
                        <div className="font-semibold text-sm text-gray-800">{opt.label}</div>
                        <div className="text-xs text-gray-400 mt-1">{opt.desc}</div>
                        <div className={`text-xs font-bold mt-2 ${selected ? 'text-[#E63946]' : 'text-gray-400'}`}>
                          {opt.factor}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Toggle extras */}
                <div className="space-y-3 mb-6">
                  <ToggleRow
                    icon={<Trash2 className="w-4 h-4" />}
                    label="Incluir demolición previa"
                    desc="Remoción de estructuras existentes"
                    checked={includesDemolition}
                    onChange={setIncludesDemolition}
                  />
                  <ToggleRow
                    icon={<Truck className="w-4 h-4" />}
                    label="Retiro de escombros"
                    desc="Transporte y disposición final"
                    checked={includesDebrisRemoval}
                    onChange={setIncludesDebrisRemoval}
                  />
                </div>

                {/* Notes */}
                <label className="text-sm font-semibold text-gray-700 mb-2 block">
                  Notas adicionales (opcional)
                </label>
                <textarea
                  value={additionalNotes}
                  onChange={(e) => setAdditionalNotes(e.target.value)}
                  rows={3}
                  placeholder="Describe cualquier detalle adicional sobre el proyecto..."
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:border-[#E63946] focus:ring-2 focus:ring-[#E63946]/20 outline-none transition-all resize-none text-sm"
                />
              </Card>
            )}

            {/* ──────── STEP 5: Result ──────── */}
            {step === 5 && result && (
              <div className="space-y-6">
                {/* Success header */}
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-[#E63946] to-[#c62833] flex items-center justify-center mb-4 shadow-xl shadow-[#E63946]/30">
                    <CheckCircle2 className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-[#1a1a1a]">¡Cotización lista!</h2>
                  <p className="text-gray-500 text-sm mt-1">
                    Este es un estimado basado en los datos suministrados.
                    <br />Una visita técnica confirmará el presupuesto definitivo.
                  </p>
                </motion.div>

                {/* Line items */}
                <Card title="Desglose de servicios" subtitle={`${areaM2} m² · Gama ${QUALITY_OPTIONS.find(q => q.value === qualityTier)?.label}`}>
                  <div className="divide-y divide-gray-100">
                    {result.lineItems.map((li, i) => (
                      <div key={i} className="flex items-center justify-between py-3">
                        <div>
                          <div className="font-medium text-gray-800 text-sm">{li.service}</div>
                          <div className="text-xs text-gray-400">{li.area} m² × {fmt(li.unitPrice)}/m²</div>
                        </div>
                        <div className="font-semibold text-gray-900">{fmt(li.subtotal)}</div>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Totals breakdown */}
                <Card title="Resumen financiero" subtitle="">
                  <div className="space-y-2 text-sm">
                    <Row label="Subtotal servicios" value={fmt(result.subtotalServices)} />
                    {result.difficultyAmount > 0 && (
                      <Row label={`Dificultad de acceso (×${result.difficultyMultiplier})`} value={`+${fmt(result.difficultyAmount)}`} accent />
                    )}
                    {result.demolitionCost > 0 && (
                      <Row label="Demolición previa" value={`+${fmt(result.demolitionCost)}`} accent />
                    )}
                    {result.debrisRemovalCost > 0 && (
                      <Row label="Retiro de escombros" value={`+${fmt(result.debrisRemovalCost)}`} accent />
                    )}
                    <div className="border-t border-gray-200 pt-2 mt-2" />
                    <Row label="Subtotal neto" value={fmt(result.subtotalBeforeMargin)} bold />

                    {/* Desglose de márgenes */}
                    <div className="mt-3 rounded-xl border border-gray-100 bg-gray-50 p-3 space-y-1.5">
                      <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Desglose de costos indirectos</div>
                      <Row label={`Administración (${(result.adminRate * 100).toFixed(0)}%)`} value={`+${fmt(result.adminAmount)}`} />
                      <Row label={`Imprevistos (${(result.imprevistosRate * 100).toFixed(0)}%)`} value={`+${fmt(result.imprevistosAmount)}`} />
                      <Row label={`Utilidad (${(result.utilidadRate * 100).toFixed(0)}%)`} value={`+${fmt(result.utilidadAmount)}`} />
                      <div className="border-t border-dashed border-gray-200 pt-1.5">
                        <Row label={`IVA sobre utilidad (${(result.ivaRate * 100).toFixed(0)}%)`} value={`+${fmt(result.ivaAmount)}`} accent />
                      </div>
                    </div>

                    <div className="border-t-2 border-[#E63946]/30 pt-3 mt-3" />
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-[#1a1a1a]">TOTAL ESTIMADO</span>
                      <span className="text-2xl font-extrabold text-[#E63946]">{fmt(result.grandTotal)}</span>
                    </div>
                    <div className="text-xs text-gray-400 text-right">
                      Tiempo estimado: ~{result.estimatedDays} días hábiles
                    </div>
                  </div>
                </Card>

                {/* Banner Cross-sell to Habitat IQ */}
                <div className="mt-6 bg-gradient-to-r from-[#00A8E8]/20 to-transparent border border-[#00A8E8]/30 rounded-2xl p-6 relative overflow-hidden">
                  <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-bold text-[#1a1a1a] flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-[#00A8E8]" /> ¿Buscas domótica y seguridad?
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">Cotiza tecnología para tu proyecto con Habitat IQ.</p>
                    </div>
                    <Link to="/cotizador-iq" className="px-6 py-2 bg-white hover:bg-gray-50 text-[#00A8E8] border border-[#00A8E8]/50 rounded-lg text-sm font-semibold transition-colors whitespace-nowrap shadow-sm">
                      Ir a Habitat IQ →
                    </Link>
                  </div>
                </div>

                {/* ── Tutorial de próximos pasos ── */}
                <NextStepsTutorial theme="red" />

                {/* CTA */}
                <div className="flex flex-col sm:flex-row gap-3 flex-wrap">
                  <button
                    onClick={generatePDF}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-[#1a1a1a] hover:bg-black text-white font-bold rounded-2xl transition-all shadow-lg shadow-black/20"
                  >
                    <FileDown className="w-5 h-5" />
                    Descargar PDF
                  </button>
                  <a
                    href={`https://wa.me/573133540258?text=${encodeURIComponent(buildWhatsAppMessage())}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-[#25D366] hover:bg-[#1ebe57] text-white font-bold rounded-2xl transition-all shadow-lg shadow-[#25D366]/30"
                  >
                    <Send className="w-5 h-5" />
                    Enviar WhatsApp
                  </a>
                  <button
                    onClick={() => { setStep(1); setResult(null); }}
                    className="flex-none sm:flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-white border-2 border-gray-200 hover:border-[#E63946] text-gray-700 hover:text-[#E63946] font-bold rounded-2xl transition-all"
                  >
                    <Calculator className="w-5 h-5" />
                    Nueva
                  </button>
                </div>

                {/* Client info recap */}
                <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 text-xs text-gray-400 space-y-1">
                  <div>👤 {clientName} · 📞 {clientPhone} {clientEmail && `· ✉️ ${clientEmail}`}</div>
                  {projectLocation && <div>📍 {projectLocation}</div>}
                  {additionalNotes && <div>📝 {additionalNotes}</div>}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* ── Navigation buttons ──────────────────────────────────── */}
        {step < TOTAL_STEPS && (
          <div className="flex items-center justify-between mt-8 gap-4">
            {step > 1 ? (
              <button
                onClick={goBack}
                className="flex items-center gap-2 px-5 py-3 rounded-xl text-gray-600 hover:text-[#E63946] hover:bg-[#E63946]/5 transition-all font-semibold text-sm"
              >
                <ArrowLeft className="w-4 h-4" />
                Anterior
              </button>
            ) : (
              <div />
            )}
            <button
              onClick={goNext}
              disabled={!canProceed()}
              className={`
                flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold transition-all text-sm
                ${canProceed()
                  ? 'bg-[#E63946] text-white hover:bg-[#c62833] shadow-lg shadow-[#E63946]/30 hover:shadow-xl hover:shadow-[#E63946]/40'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'}
              `}
            >
              {step === 4 ? 'Generar cotización' : 'Siguiente'}
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </main>

      <WhatsAppButton message="¡Hola! Estoy usando el cotizador de Inalumh y tengo dudas." />
    </div>
  );
}


// ═══════════════════════════════════════════════════════════════════════
//  SUB-COMPONENTS (local to this file)
// ═══════════════════════════════════════════════════════════════════════

function Card({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-lg shadow-gray-200/50 p-6 sm:p-8">
      <h2 className="text-xl font-bold text-[#1a1a1a] mb-1">{title}</h2>
      {subtitle && <p className="text-sm text-gray-400 mb-6">{subtitle}</p>}
      {children}
    </div>
  );
}

function InputField({ icon, label, placeholder, value, onChange, type = 'text' }: {
  icon: React.ReactNode;
  label: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <div>
      <label className="text-sm font-semibold text-gray-700 mb-1.5 flex items-center gap-1.5">
        <span className="text-[#E63946]">{icon}</span>
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:border-[#E63946] focus:ring-2 focus:ring-[#E63946]/20 outline-none transition-all text-sm"
      />
    </div>
  );
}

function ToggleRow({ icon, label, desc, checked, onChange }: {
  icon: React.ReactNode;
  label: string;
  desc: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={`
        w-full flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all duration-200
        ${checked ? 'border-[#E63946] bg-[#E63946]/5' : 'border-gray-200 bg-white hover:border-gray-300'}
      `}
    >
      <div className={`${checked ? 'text-[#E63946]' : 'text-gray-400'}`}>{icon}</div>
      <div className="flex-1">
        <div className="font-semibold text-sm text-gray-800">{label}</div>
        <div className="text-xs text-gray-400">{desc}</div>
      </div>
      <div className={`
        w-10 h-6 rounded-full p-0.5 transition-all duration-300
        ${checked ? 'bg-[#E63946]' : 'bg-gray-300'}
      `}>
        <div className={`
          w-5 h-5 rounded-full bg-white shadow transition-transform duration-300
          ${checked ? 'translate-x-4' : 'translate-x-0'}
        `} />
      </div>
    </button>
  );
}

function Row({ label, value, bold, accent }: { label: string; value: string; bold?: boolean; accent?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className={`${bold ? 'font-semibold text-gray-800' : 'text-gray-500'}`}>{label}</span>
      <span className={`font-semibold ${accent ? 'text-[#F77F00]' : bold ? 'text-gray-900' : 'text-gray-700'}`}>{value}</span>
    </div>
  );
}

function NextStepsTutorial({ theme }: { theme: 'red' | 'cyan' }) {
  const accent = theme === 'red' ? '#E63946' : '#00A8E8';
  const accentLight = theme === 'red' ? 'rgba(230,57,70,0.08)' : 'rgba(0,168,232,0.08)';
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
      desc: 'Un experto visitará tu proyecto para confirmar medidas, materiales y ajustar el presupuesto final.',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15, duration: 0.4 }}
      className={`rounded-2xl border p-6 sm:p-7 ${bgLight} ${borderLight} shadow-lg ${shadowAccent}`}
    >
      <div className="flex items-center gap-2 mb-5">
        <div className="w-1 h-6 rounded-full" style={{ backgroundColor: accent }} />
        <h3 className={`font-bold text-base ${textAccent}`}>¿Qué sigue después de tu cotización?</h3>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        {steps.map((s, idx) => (
          <div key={idx} className="flex-1 flex flex-col gap-2">
            <div className="flex items-start gap-3">
              {/* Step bubble */}
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
            {/* Arrow between steps */}
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
        💡 Este estimado no es un contrato. La visita técnica confirma medidas, materiales y precios definitivos.
      </div>
    </motion.div>
  );
}
