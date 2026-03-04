// ═══════════════════════════════════════════════
// ETERNA — Cenovna Struktura (v3)
// Vse maloprodajne cene vključujejo DDV (22%)
//
// 3 plasti izdelka:
//   1. Samo tisk na platno (canvas print)
//   2. Tisk + podokvirjanje + napenjanje (stretched)
//   3. Umetnina z okvirjem (framed artwork)
//
// Formula: veleprodajna × markup × DDV + AI flat fee
// Extras (delo, impasto) samo pri okvirjeni umetnini
//
// ─── Veleprodajne cene (brez DDV) ───
// Samo tisk:
//   30×40 = 15€ | 40×50 = 20€ | 45×60 = 25€
//   50×70 = 30€ | 60×90 = 40€ | 76×102 = 50€
//
// Tisk + podokvir + napenjanje:
//   30×40 = 32,05€ | 40×50 = 41,92€ | 45×60 = 50,58€
//   50×70 = 59,23€ | 60×90 = 76,54€ | 76×102 = 93,36€
//
// ─── Faktorji ───
// Markup: 2.5×
// DDV: 22% (skupni faktor: 2.5 × 1.22 = 3.05)
// AI obdelava: 1,00 € flat fee (maloprodajna)
// Ročno delo: 25,00 € (samo pri okvirjanju)
// Impasto gel: 5,00 € (opcijsko, samo pri okvirjanju)
// ═══════════════════════════════════════════════

// DDV stopnja (Slovenija)
export const DDV_RATE = 0.22;

// Markup faktor
export const MARKUP = 2.5;

// Skupni faktor: markup × DDV
const FACTOR = MARKUP * (1 + DDV_RATE); // = 3.05

// Dodatni stroški (EUR, brez DDV)
export const LABOR_COST = 25.00;        // Ročno delo — samo pri okvirjanju
export const IMPASTO_GEL_COST = 5.00;   // Impasto gel — opcijsko pri okvirjanju
export const AI_FEE = 1.00;             // AI obdelava — flat maloprodajna cena

// ═══════════════════════════════════════════════
// TIPI IZDELKOV
// ═══════════════════════════════════════════════
export const PRODUCT_TYPES = {
  PRINT: 'print',           // Samo tisk na platno
  STRETCHED: 'stretched',   // Tisk + podokvir + napenjanje
  FRAMED: 'framed',         // Umetnina z okvirjem
};

// ═══════════════════════════════════════════════
// 6 VELIKOSTI — od 30×40 do 76×102
// ═══════════════════════════════════════════════
export const canvasSizes = [
  {
    id: '30x40',
    label: '30 × 40 cm',
    displayName: 'Kabinet',
    dimensions: '30cm × 40cm',
    wholesale: {
      canvasPrint: 15.00,      // Samo tisk
      canvasStretched: 32.05,  // Tisk + podokvir + napenjanje
    },
    printSpecs: {
      dpi: 300, colorSpace: 'CMYK', bleed: '3mm', format: 'TIFF',
      widthPx: 3543, heightPx: 4724,
    },
  },
  {
    id: '40x50',
    label: '40 × 50 cm',
    displayName: 'Imperial',
    dimensions: '40cm × 50cm',
    wholesale: {
      canvasPrint: 20.00,
      canvasStretched: 41.92,
    },
    printSpecs: {
      dpi: 300, colorSpace: 'CMYK', bleed: '3mm', format: 'TIFF',
      widthPx: 4724, heightPx: 5906,
    },
  },
  {
    id: '45x60',
    label: '45 × 60 cm',
    displayName: 'Salon',
    dimensions: '45cm × 60cm',
    wholesale: {
      canvasPrint: 25.00,
      canvasStretched: 50.58,
    },
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
    wholesale: {
      canvasPrint: 30.00,
      canvasStretched: 59.23,
    },
    printSpecs: {
      dpi: 300, colorSpace: 'CMYK', bleed: '3mm', format: 'TIFF',
      widthPx: 5906, heightPx: 8268,
    },
  },
  {
    id: '60x90',
    label: '60 × 90 cm',
    displayName: 'Panorama',
    dimensions: '60cm × 90cm',
    wholesale: {
      canvasPrint: 40.00,
      canvasStretched: 76.54,
    },
    printSpecs: {
      dpi: 300, colorSpace: 'CMYK', bleed: '3mm', format: 'TIFF',
      widthPx: 7087, heightPx: 10630,
    },
  },
  {
    id: '76x102',
    label: '76 × 102 cm',
    displayName: 'Galerija',
    dimensions: '76cm × 102cm',
    wholesale: {
      canvasPrint: 50.00,
      canvasStretched: 93.36,
    },
    printSpecs: {
      dpi: 300, colorSpace: 'CMYK', bleed: '3mm', format: 'TIFF',
      widthPx: 8976, heightPx: 12047,
    },
  },
];

// Velikosti za prikaz v studiu
export const displaySizes = canvasSizes;

// ═══════════════════════════════════════════════
// OKVIRI — 10 stilov iz Vidal cenika
// Cene: veleprodajna €/tm obsega (brez DDV)
// Vir: Vidal d.o.o., Pod jelšami 8, 1290 Grosuplje
// ═══════════════════════════════════════════════
export const frameStyles = [
  {
    id: 'slim-natur',
    label: '231 Barvna Mat',
    profile: '231',
    description: 'Profil 231 — barvna mat, 14 × 14 mm',
    profileDimensions: '14 × 14 mm',
    pricePerTm: 11.13,
    stripImage: '/frames/strips/siroki-ornament-231.png',
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
    label: '1717',
    profile: '1717',
    description: 'Profil 1717, 17 × 17 mm',
    profileDimensions: '17 × 17 mm',
    pricePerTm: 12.98,
    stripImage: '/frames/strips/ozki-ornament-1717.png',
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
    label: '1335 Barvne',
    profile: '1335',
    description: 'Profil 1335 — barvne, 34 × 13 mm',
    profileDimensions: '34 × 13 mm',
    pricePerTm: 15.79,
    stripImage: '/frames/strips/sirok-gladek-1335.png',
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
    label: '048',
    profile: '048',
    description: 'Profil 048, 25 × 22 mm',
    profileDimensions: '25 × 22 mm',
    pricePerTm: 16.59,
    stripImage: '/frames/strips/ozki-gladek-048.png',
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
    label: '3507 Barvne',
    profile: '3507',
    description: 'Profil 3507 — barvne, 33 × 33 mm',
    profileDimensions: '33 × 33 mm',
    pricePerTm: 20.83,
    stripImage: '/frames/strips/cassetta-3507.png',
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
    label: 'Siena 011',
    profile: 'SIENA',
    description: 'Profil Siena/011, 111 — 32 × 33 mm',
    profileDimensions: '32 × 33 mm',
    pricePerTm: 22.80,
    stripImage: '/frames/strips/siena-rustic.png',
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
    label: 'AL Barvna',
    profile: 'AL',
    description: 'Profil AL — barvna, FO/FA, 36 × 36 mm',
    profileDimensions: '36 × 36 mm',
    pricePerTm: 21.20,
    stripImage: '/frames/strips/alu-srebrn.png',
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
    label: '184',
    profile: '184',
    description: 'Profil 184, 46 × 26 mm — ODPRODAJA (do razprodaje zalog)',
    profileDimensions: '46 × 26 mm',
    pricePerTm: 29.23,
    odprodaja: true,
    stripImage: '/frames/strips/classic-184.png',
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
    label: '076',
    profile: '076',
    description: 'Profil 076/A, B, AC — 50 × 25 mm',
    profileDimensions: '50 × 25 mm',
    pricePerTm: 29.43,
    stripImage: '/frames/strips/modern-076.png',
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
    label: '370',
    profile: '370',
    description: 'Profil 370/A, B, OB — 83 × 43 mm',
    profileDimensions: '83 × 43 mm',
    pricePerTm: 39.86,
    stripImage: '/frames/strips/tanka-370.png',
    borderWidth: 32,
    cssStyle: {
      borderWidth: '32px',
      borderStyle: 'solid',
      borderImage: 'linear-gradient(135deg, #5c3a1e 0%, #7a4f30 15%, #a0703c 30%, #c9a227 50%, #a0703c 70%, #7a4f30 85%, #5c3a1e 100%) 1',
      boxShadow: 'inset 0 0 16px rgba(0,0,0,0.45), inset 0 0 4px rgba(201,162,39,0.15), 0 6px 28px rgba(0,0,0,0.55)',
    },
  },
];

// ═══════════════════════════════════════════════
// IZRAČUN OBSEGA
// ═══════════════════════════════════════════════
export function getPerimeter(sizeId) {
  const parts = sizeId.split('x').map(Number);
  if (parts.length !== 2) return 0;
  return 2 * (parts[0] + parts[1]) / 100; // cm → m
}

// ═══════════════════════════════════════════════
// CENOVNA FUNKCIJA — 3 plasti + opcijski impasto
//
// productType: 'print' | 'stretched' | 'framed'
// frameId: ID okvirja (samo pri 'framed')
// withImpasto: boolean (opcijsko, samo pri 'framed')
// ═══════════════════════════════════════════════
export function getPrice(sizeId, productType = 'print', frameId = null, withImpasto = false) {
  const size = canvasSizes.find((s) => s.id === sizeId);
  if (!size) return 0;

  let wholesale = 0;

  if (productType === PRODUCT_TYPES.PRINT) {
    // Plast 1: samo tisk
    wholesale = size.wholesale.canvasPrint;
  } else if (productType === PRODUCT_TYPES.STRETCHED) {
    // Plast 2: tisk + podokvir + napenjanje
    wholesale = size.wholesale.canvasStretched;
  } else if (productType === PRODUCT_TYPES.FRAMED) {
    // Plast 3: tisk + podokvir + okvir + delo
    const frame = frameStyles.find((f) => f.id === frameId);
    if (!frame) return 0;
    const perimeter = getPerimeter(sizeId);
    const frameCost = frame.pricePerTm * perimeter;
    wholesale = size.wholesale.canvasStretched + frameCost + LABOR_COST;

    // Opcijski impasto gel
    if (withImpasto) {
      wholesale += IMPASTO_GEL_COST;
    }
  }

  // Maloprodajna: veleprodajna × markup × DDV + AI fee
  const retail = wholesale * FACTOR + AI_FEE;
  return Math.round(retail);
}

// ═══════════════════════════════════════════════
// POMOŽNE FUNKCIJE
// ═══════════════════════════════════════════════
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
