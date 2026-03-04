// ═══════════════════════════════════════════════
// ETERNA — Cenovna Struktura
// Vse maloprodajne cene vključujejo DDV (22%)
//
// Formula: (veleprodajna + impasto_gel + delo) × markup × DDV = maloprodajna
//
// ─── Veleprodajne cene (brez DDV) ───
// Platno + sublimacija + napenjanje:
//   13×18 ≈ 12,00€ | 20×25 ≈ 18,00€ | 28×35 ≈ 26,00€
//   30×40 = 32,05€ | 40×50 = 41,92€ | 45×60 = 50,58€
//   50×70 = 59,23€ | 60×90 = 76,54€ | 76×102 = 93,36€
//
// ─── Dodatni stroški na kos ───
// Impasto gel medij: 5,00 € (500ml = 15€, ~3 tiske)
// Ročno delo (1 ura): 25,00 € marža
// AI obdelava: ~0,04 € (Nano Banana, zanemarljivo)
//
// ─── Faktorji ───
// Markup: 2.5×
// DDV: 22% (skupni faktor: 2.5 × 1.22 = 3.05)
// ═══════════════════════════════════════════════

// DDV stopnja (Slovenija)
export const DDV_RATE = 0.22;

// Markup faktor
export const MARKUP = 2.5;

// Dodatni stroški na kos (EUR, brez DDV)
export const IMPASTO_GEL_COST = 5.00;
export const LABOR_COST = 25.00;
export const AI_COST = 0.04;
export const PER_PIECE_EXTRA = IMPASTO_GEL_COST + LABOR_COST + AI_COST; // = 30.04€

// ═══════════════════════════════════════════════
// VSE VELIKOSTI — od 13×18 do 76×102
// ═══════════════════════════════════════════════
export const canvasSizes = [
  {
    id: '13x18',
    label: '13 × 18 cm',
    displayName: 'Kabinet',
    dimensions: '13cm × 18cm',
    priceCanvas: 128,
    priceFramed: null, // dinamično iz getPrice()
    wholesale: { canvas: 12.00 },
    printSpecs: {
      dpi: 300, colorSpace: 'CMYK', bleed: '3mm', format: 'TIFF',
      widthPx: 1535, heightPx: 2126,
    },
  },
  {
    id: '20x25',
    label: '20 × 25 cm',
    displayName: 'Imperial',
    dimensions: '20cm × 25cm',
    priceCanvas: 147,
    priceFramed: null,
    wholesale: { canvas: 18.00 },
    printSpecs: {
      dpi: 300, colorSpace: 'CMYK', bleed: '3mm', format: 'TIFF',
      widthPx: 2362, heightPx: 2953,
    },
  },
  {
    id: '28x35',
    label: '28 × 35 cm',
    displayName: 'Salon',
    dimensions: '28cm × 35cm',
    priceCanvas: 171,
    priceFramed: null,
    wholesale: { canvas: 26.00 },
    printSpecs: {
      dpi: 300, colorSpace: 'CMYK', bleed: '3mm', format: 'TIFF',
      widthPx: 3307, heightPx: 4134,
    },
  },
  {
    id: '30x40',
    label: '30 × 40 cm',
    displayName: 'Kabinet L',
    dimensions: '30cm × 40cm',
    priceCanvas: 189,
    priceFramed: null,
    wholesale: { canvas: 32.05 },
    printSpecs: {
      dpi: 300, colorSpace: 'CMYK', bleed: '3mm', format: 'TIFF',
      widthPx: 3543, heightPx: 4724,
    },
  },
  {
    id: '40x50',
    label: '40 × 50 cm',
    displayName: 'Imperial L',
    dimensions: '40cm × 50cm',
    priceCanvas: 219,
    priceFramed: null,
    wholesale: { canvas: 41.92 },
    printSpecs: {
      dpi: 300, colorSpace: 'CMYK', bleed: '3mm', format: 'TIFF',
      widthPx: 4724, heightPx: 5906,
    },
  },
  {
    id: '45x60',
    label: '45 × 60 cm',
    displayName: 'Salon L',
    dimensions: '45cm × 60cm',
    priceCanvas: 245,
    priceFramed: null,
    wholesale: { canvas: 50.58 },
    printSpecs: {
      dpi: 300, colorSpace: 'CMYK', bleed: '3mm', format: 'TIFF',
      widthPx: 5315, heightPx: 7087,
    },
  },
  {
    id: '50x70',
    label: '50 × 70 cm',
    displayName: 'Razstava',
    dimensions: '50cm × 70cm',
    priceCanvas: 269,
    priceFramed: null,
    wholesale: { canvas: 59.23 },
    printSpecs: {
      dpi: 300, colorSpace: 'CMYK', bleed: '3mm', format: 'TIFF',
      widthPx: 5906, heightPx: 8268,
    },
  },
  {
    id: '60x90',
    label: '60 × 90 cm',
    displayName: 'Razstava L',
    dimensions: '60cm × 90cm',
    priceCanvas: 325,
    priceFramed: null,
    wholesale: { canvas: 76.54 },
    printSpecs: {
      dpi: 300, colorSpace: 'CMYK', bleed: '3mm', format: 'TIFF',
      widthPx: 7087, heightPx: 10630,
    },
  },
  {
    id: '76x102',
    label: '76 × 102 cm',
    displayName: 'Razstava XL',
    dimensions: '76cm × 102cm',
    priceCanvas: 375,
    priceFramed: null,
    wholesale: { canvas: 93.36 },
    printSpecs: {
      dpi: 300, colorSpace: 'CMYK', bleed: '3mm', format: 'TIFF',
      widthPx: 8976, heightPx: 12047,
    },
  },
];

// Vse velikosti so na voljo v studiu
export const displaySizes = canvasSizes;

// ═══════════════════════════════════════════════
// OKVIRI — 10 stilov iz Vidal cenika
// Cene: veleprodajna €/tm obsega (brez DDV)
// Vir: Vidal d.o.o., Pod jelšami 8, 1290 Grosuplje
//
// Slike: izvlečene iz Vidal Katalog Letvic 2026 PDF
// ═══════════════════════════════════════════════
export const frameStyles = [
  {
    id: 'slim-natur',
    label: 'Slim Natur',
    profile: '231',
    description: 'Ultra-tanek natur okvir 14 × 14 mm',
    profileDimensions: '14 × 14 mm',
    pricePerTm: 11.13,
    stripImage: '/frames/strips/slim-natur.png',
    borderWidth: 5,
    cssStyle: {
      borderWidth: '5px',
      borderStyle: 'solid',
      borderImage: 'linear-gradient(135deg, #e8dcc8 0%, #d4c4a0 30%, #f0e6d0 50%, #c8b88c 70%, #e0d4bc 100%) 1',
      boxShadow: 'inset 0 0 4px rgba(0,0,0,0.15), 0 2px 8px rgba(0,0,0,0.3)',
    },
  },
  {
    id: 'mini-barvni',
    label: 'Mini Barvni',
    profile: '1717',
    description: 'Majhen barvit okvir 17 × 17 mm',
    profileDimensions: '17 × 17 mm',
    pricePerTm: 12.98,
    stripImage: '/frames/strips/mini-barvni.png',
    borderWidth: 7,
    cssStyle: {
      borderWidth: '7px',
      borderStyle: 'solid',
      borderImage: 'linear-gradient(135deg, #2d5a3d 0%, #3a7a52 50%, #2d5a3d 100%) 1',
      boxShadow: 'inset 0 0 5px rgba(0,0,0,0.2), 0 2px 10px rgba(0,0,0,0.3)',
    },
  },
  {
    id: 'moderni-crni',
    label: 'Moderni Črni',
    profile: '1335',
    description: 'Sodobni ploski črni okvir 34 × 13 mm',
    profileDimensions: '34 × 13 mm',
    pricePerTm: 15.79,
    stripImage: '/frames/strips/moderni-crni.png',
    borderWidth: 14,
    cssStyle: {
      borderWidth: '14px',
      borderStyle: 'solid',
      borderImage: 'linear-gradient(135deg, #1a1a1a 0%, #333333 40%, #1a1a1a 60%, #2a2a2a 100%) 1',
      boxShadow: 'inset 0 0 8px rgba(0,0,0,0.5), 0 3px 15px rgba(0,0,0,0.6)',
    },
  },
  {
    id: 'klasicni-les',
    label: 'Klasični Les',
    profile: '048',
    description: 'Klasičen leseni okvir 25 × 22 mm',
    profileDimensions: '25 × 22 mm',
    pricePerTm: 16.59,
    stripImage: '/frames/strips/klasicni-les.png',
    borderWidth: 11,
    cssStyle: {
      borderWidth: '11px',
      borderStyle: 'solid',
      borderImage: 'linear-gradient(135deg, #6b4226 0%, #8b5e3c 25%, #a0703c 50%, #7a4f30 75%, #6b4226 100%) 1',
      boxShadow: 'inset 0 0 8px rgba(0,0,0,0.3), 0 3px 12px rgba(0,0,0,0.4)',
    },
  },
  {
    id: 'barvni-kocka',
    label: 'Barvni Kocka',
    profile: '3507',
    description: 'Drzni barvni okvir 33 × 33 mm',
    profileDimensions: '33 × 33 mm',
    pricePerTm: 20.83,
    stripImage: '/frames/strips/barvni-kocka.png',
    borderWidth: 16,
    cssStyle: {
      borderWidth: '16px',
      borderStyle: 'solid',
      borderImage: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 40%, #0f3460 60%, #1a1a2e 100%) 1',
      boxShadow: 'inset 0 0 10px rgba(0,0,0,0.4), 0 4px 16px rgba(0,0,0,0.5)',
    },
  },
  {
    id: 'siena-ornament',
    label: 'Siena Ornament',
    profile: 'SIENA',
    description: 'Tradicionalni ornamentni okvir 32 × 33 mm',
    profileDimensions: '32 × 33 mm',
    pricePerTm: 22.80,
    stripImage: '/frames/strips/siena-ornament.png',
    borderWidth: 16,
    cssStyle: {
      borderWidth: '16px',
      borderStyle: 'solid',
      borderImage: 'linear-gradient(135deg, #8b6914 0%, #c9a227 20%, #dbb83a 40%, #c9a227 60%, #8b6914 80%, #a67c1a 100%) 1',
      boxShadow: 'inset 0 0 10px rgba(0,0,0,0.35), inset 0 0 3px rgba(255,215,0,0.15), 0 4px 16px rgba(0,0,0,0.5)',
    },
  },
  {
    id: 'aluminij-satin',
    label: 'Aluminij Satin',
    profile: 'AL',
    description: 'Sodobni brušeni aluminijasti okvir 36 × 36 mm',
    profileDimensions: '36 × 36 mm',
    pricePerTm: 21.20,
    stripImage: '/frames/strips/aluminij-satin.png',
    borderWidth: 16,
    cssStyle: {
      borderWidth: '16px',
      borderStyle: 'solid',
      borderImage: 'linear-gradient(135deg, #a8a8a8 0%, #d0d0d0 20%, #e8e8e8 40%, #b8b8b8 60%, #c8c8c8 80%, #a8a8a8 100%) 1',
      boxShadow: 'inset 0 0 8px rgba(0,0,0,0.2), 0 3px 14px rgba(0,0,0,0.4)',
    },
  },
  {
    id: 'zlati-klasik',
    label: 'Zlati Klasik',
    profile: '184',
    description: 'Klasični zlati okvir 46 × 26 mm',
    profileDimensions: '46 × 26 mm',
    pricePerTm: 29.23,
    stripImage: '/frames/strips/zlati-klasik.png',
    borderWidth: 22,
    cssStyle: {
      borderWidth: '22px',
      borderStyle: 'solid',
      borderImage: 'linear-gradient(135deg, #d4a843 0%, #b8922e 25%, #e8c45a 50%, #b8922e 75%, #d4a843 100%) 1',
      boxShadow: 'inset 0 0 12px rgba(0,0,0,0.4), 0 4px 20px rgba(0,0,0,0.5)',
    },
  },
  {
    id: 'siroki-ornament',
    label: 'Široki Ornament',
    profile: '076',
    description: 'Širok ornamentni okvir 50 × 25 mm',
    profileDimensions: '50 × 25 mm',
    pricePerTm: 29.43,
    stripImage: '/frames/strips/siroki-ornament.png',
    borderWidth: 24,
    cssStyle: {
      borderWidth: '24px',
      borderStyle: 'solid',
      borderImage: 'linear-gradient(135deg, #b8860b 0%, #daa520 15%, #ffd700 30%, #daa520 50%, #b8860b 70%, #cd950c 85%, #b8860b 100%) 1',
      boxShadow: 'inset 0 0 14px rgba(0,0,0,0.4), inset 0 0 4px rgba(255,215,0,0.2), 0 5px 22px rgba(0,0,0,0.5)',
    },
  },
  {
    id: 'luksuzni-salon',
    label: 'Luksuzni Salon',
    profile: '370',
    description: 'Premium široki salon okvir 83 × 43 mm',
    profileDimensions: '83 × 43 mm',
    pricePerTm: 39.86,
    stripImage: '/frames/strips/luksuzni-salon.png',
    borderWidth: 32,
    cssStyle: {
      borderWidth: '32px',
      borderStyle: 'solid',
      borderImage: 'linear-gradient(135deg, #5c3a1e 0%, #7a4f30 15%, #a0703c 30%, #c9a227 50%, #a0703c 70%, #7a4f30 85%, #5c3a1e 100%) 1',
      boxShadow: 'inset 0 0 16px rgba(0,0,0,0.45), inset 0 0 4px rgba(201,162,39,0.15), 0 6px 28px rgba(0,0,0,0.55)',
    },
  },
];

// Izračun obsega (perimetra) iz velikosti v metrih
function getPerimeter(sizeId) {
  const parts = sizeId.split('x').map(Number);
  if (parts.length !== 2) return 0;
  return 2 * (parts[0] + parts[1]) / 100; // cm → m
}

// ═══════════════════════════════════════════════
// CENOVNA FUNKCIJA — dinamičen izračun za vse kombinacije
// ═══════════════════════════════════════════════
export function getPrice(sizeId, withFrame = true, frameId = 'zlati-klasik') {
  const size = canvasSizes.find((s) => s.id === sizeId);
  if (!size) return 0;

  // Brez okvirja — samo platno
  if (!withFrame) return size.priceCanvas;

  const frame = frameStyles.find((f) => f.id === frameId);
  if (!frame) return size.priceCanvas; // fallback

  // Veleprodajna cena okvirjanja = platno + (okvir €/tm × obseg)
  const perimeter = getPerimeter(sizeId);
  const wholesaleFramed = size.wholesale.canvas + (frame.pricePerTm * perimeter);

  // Maloprodajna: (veleprodajna + dodatki) × markup × DDV
  const retail = (wholesaleFramed + PER_PIECE_EXTRA) * MARKUP * (1 + DDV_RATE);
  return Math.round(retail);
}

export function getSizeLabel(sizeId) {
  const size = canvasSizes.find((s) => s.id === sizeId);
  if (!size) return '';
  return size.displayName
    ? `${size.displayName} (${size.dimensions})`
    : size.dimensions;
}

export function getFrameLabel(frameId) {
  const frame = frameStyles.find((f) => f.id === frameId);
  return frame?.label || null;
}

export function getPrintSpecs(sizeId) {
  const size = canvasSizes.find((s) => s.id === sizeId);
  return size?.printSpecs || null;
}
