export interface ProductColor {
  name: string;
  hex: string;
  inStock: boolean;
}

export interface ProductReview {
  id: string;
  author: string;
  location: string;
  date: string;
  rating: number;
  comment: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: 'Home Goods' | 'Audio Gear' | 'Apparel';
  price: number;
  summary: string;
  fullDescription: string;
  stock: number;
  featured: boolean;
  images: string[];
  colors: ProductColor[];
  specs: Record<string, string>;
  origin: string;
  dimensions: string;
  careInstructions: string;
  reviews: ProductReview[];
}

export const PRODUCTS: Product[] = [
  {
    id: 'KST-019',
    slug: 'osa-terracotta-carafe',
    name: 'Osa Terracotta Carafe & Tumbler',
    category: 'Home Goods',
    price: 78,
    summary: 'Unglazed mineral exterior with high-fire vitreous enamel lining. Keeps spring water chilled naturally.',
    fullDescription: 'The Osa Carafe is wheel-thrown from coarse reduction terracotta by fifth-generation potters in Tokoname. The porous outer walls slowly absorb ambient moisture, creating a natural evaporative cooling effect that lowers liquid temperature without ice. The interior is sealed with a non-toxic matte feldspar glaze suitable for wine, cold brew, or filtered well water.',
    stock: 18,
    featured: true,
    images: [
      'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&q=80',
    ],
    colors: [
      { name: 'Terracotta Clay', hex: '#B85D43', inStock: true },
      { name: 'Sand Glaze', hex: '#E5DFD3', inStock: true },
      { name: 'Basalt Grey', hex: '#404344', inStock: true },
    ],
    specs: {
      'Volume': '920ml Carafe / 240ml Tumbler',
      'Firing Method': '1,280°C wood kiln reduction',
      'Glaze': 'Food-safe interior feldspar enamel',
      'Tolerance': 'Handcrafted variance ±5%',
    },
    origin: 'Tokoname, Aichi Prefecture, Japan',
    dimensions: '22cm H × 11cm Ø (Carafe)',
    careInstructions: 'Rinse with warm water and neutral mild soap. Do not subject to thermal shock. Air dry completely before storage.',
    reviews: [
      {
        id: 'rev-1',
        author: 'Julian V.',
        location: 'Stockholm, Sweden',
        date: 'October 12, 2026',
        rating: 5,
        comment: 'Remarkable thermal retention. The unglazed clay feels grounding in the morning, and the pour lip does not drip a single drop.'
      },
      {
        id: 'rev-2',
        author: 'Emi N.',
        location: 'Kyoto, Japan',
        date: 'September 28, 2026',
        rating: 5,
        comment: 'A quiet presence on the cedar work desk. The weight and balance are immaculate.'
      }
    ]
  },
  {
    id: 'KST-044',
    slug: 'verre-walnut-hifi-monitor',
    name: 'Verre Walnut Hi-Fi Monitor',
    category: 'Audio Gear',
    price: 340,
    summary: 'Dual 4-inch paper cone transducers enclosed in hand-finished American black walnut. Zero crossover distortion.',
    fullDescription: 'Sculpted from air-seasoned American black walnut heartwood, the Verre Monitor rejects synthetic composite cabinets and plastic internal dampening. Each enclosure is milled to exacting ±0.02mm acoustic tolerances, producing a coherent point-source acoustic image that faithfully renders acoustic guitars, upright bass, and quiet vocals.',
    stock: 9,
    featured: true,
    images: [
      'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80',
    ],
    colors: [
      { name: 'Solid Walnut', hex: '#6B442A', inStock: true },
      { name: 'Smoked Oak', hex: '#2F2722', inStock: true },
      { name: 'Brushed Brass', hex: '#C8A766', inStock: false },
    ],
    specs: {
      'Frequency Response': '48 Hz – 22 kHz (±2.5 dB)',
      'Impedance': '8 Ohms nominal',
      'Sensitivity': '88 dB @ 1W/1m',
      'Driver Complement': '4.5" treated hemp cone + 1" silk dome',
    },
    origin: 'Copenhagen & Portland Studio',
    dimensions: '28cm H × 17cm W × 21cm D',
    careInstructions: 'Dust with dry microfiber cloth. Treat walnut veneer with natural beeswax twice per year.',
    reviews: [
      {
        id: 'rev-3',
        author: 'Marcus K.',
        location: 'Berlin, Germany',
        date: 'November 4, 2026',
        rating: 5,
        comment: 'The mid-range purity is startling. Completely non-fatiguing even after 6 hours of near-field listening.'
      }
    ]
  },
  {
    id: 'KST-082',
    slug: 'atelier-raw-wool-overshirt',
    name: 'Atelier Raw Wool Overshirt',
    category: 'Apparel',
    price: 195,
    summary: 'Unlined heavy virgin wool milled in Scotland. Dropped shoulders, horn buttons, and reinforced gussets.',
    fullDescription: 'Constructed from 420 GSM undyed virgin Shetland wool, this garment represents pure textile architecture. The loose, structured drape provides insulating warmth while remaining breathable across fluctuating temperatures. Finished with hand-turned buffalo horn buttons and clean French seams.',
    stock: 14,
    featured: true,
    images: [
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=80',
    ],
    colors: [
      { name: 'Unbleached Ecru', hex: '#E8E4DA', inStock: true },
      { name: 'Moss Heather', hex: '#4F5346', inStock: true },
      { name: 'Pitch Noir', hex: '#27282A', inStock: true },
    ],
    specs: {
      'Weight': '420 GSM heavy twill',
      'Fibers': '100% Shetland virgin fleece',
      'Buttons': 'Ethically sourced genuine horn',
      'Seams': 'Double-needle flat-felled construction',
    },
    origin: 'Porto, Portugal & Galashiels, Scotland',
    dimensions: 'Relaxed tailored fit (S, M, L, XL)',
    careInstructions: 'Spot clean or gentle dry clean. Do not tumble dry. Store folded or on broad cedar hanger.',
    reviews: [
      {
        id: 'rev-4',
        author: 'Claire D.',
        location: 'Montreal, Canada',
        date: 'October 30, 2026',
        rating: 5,
        comment: 'Drapes with substantial architectural presence. The ecru color contains subtle mineral flecks that look stunning in daylight.'
      }
    ]
  },
  {
    id: 'KST-031',
    slug: 'soren-field-canvas-headphones',
    name: 'Søren Field Canvas Headphones',
    category: 'Audio Gear',
    price: 265,
    summary: 'Waxed canvas headband, anodized aluminum gimbal, and lambskin ear cushions. Passive spatial isolation.',
    fullDescription: 'Built for acoustic clarity in transient environments. The Søren Headphones feature custom 40mm beryllium-coated dynamic drivers tuned to reproduce balanced, natural frequency response without artificial bass bloat. Memory foam cushions wrapped in supple vegetable-tanned lambskin create a fatigue-free acoustic seal.',
    stock: 22,
    featured: true,
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=1200&q=80',
    ],
    colors: [
      { name: 'Olive Canvas', hex: '#4D5344', inStock: true },
      { name: 'Desert Twill', hex: '#D4C3A3', inStock: true },
      { name: 'Matte Obsidian', hex: '#1F2124', inStock: true },
    ],
    specs: {
      'Transducer': '40mm Beryllium dynamic driver',
      'Cable': '1.8m braided Kevlar with 3.5mm gold-plated jack',
      'Weight': '270 grams',
      'Total Harmonic Distortion': '<0.2% @ 1kHz',
    },
    origin: 'Taichung & Copenhagen',
    dimensions: 'Adjustable universal headband',
    careInstructions: 'Wipe metal parts with dry cloth. Condition leather pads with natural balm once a year.',
    reviews: [
      {
        id: 'rev-5',
        author: 'Henrik S.',
        location: 'Oslo, Norway',
        date: 'November 15, 2026',
        rating: 5,
        comment: 'The analog warmth and spatial separation are superb. Very lightweight on the crown.'
      }
    ]
  },
  {
    id: 'KST-012',
    slug: 'kyoto-cast-bronze-incense-well',
    name: 'Kyoto Cast Bronze Incense Well',
    category: 'Home Goods',
    price: 92,
    summary: 'Poured in Takaoka using 400-year-old brass casting techniques. Catches ash cleanly with balanced weight.',
    fullDescription: 'An anchor for your quiet morning rituals. Cast in sand-molds by generational metalsmiths in Toyama Prefecture, each incense burner carries slight textural grain from the sand matrix. The internal brass well holds both Japanese stick incense and Tibetan rope incense securely.',
    stock: 26,
    featured: true,
    images: [
      'https://images.unsplash.com/photo-1544457070-4cd773b4d71e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
    ],
    colors: [
      { name: 'Raw Bronze', hex: '#9E7B4F', inStock: true },
      { name: 'Aged Verdigris', hex: '#465A54', inStock: true },
      { name: 'Blackened Iron', hex: '#242526', inStock: true },
    ],
    specs: {
      'Material': 'Solid cast phosphor bronze',
      'Finish': 'Natural wax patina, unvarnished',
      'Weight': '680 grams solid metal',
      'Incense Gauge': '1.2mm to 3.5mm stick diameter',
    },
    origin: 'Takaoka, Toyama Prefecture, Japan',
    dimensions: '14cm L × 5cm W × 3.5cm H',
    careInstructions: 'Bronze will naturally darken and develop patina over time. Polish with soft cloth or leave to age gracefully.',
    reviews: [
      {
        id: 'rev-6',
        author: 'Sora T.',
        location: 'San Francisco, USA',
        date: 'October 22, 2026',
        rating: 5,
        comment: 'The tactile heft is deeply satisfying. A minimal sculpture when not in use.'
      }
    ]
  },
  {
    id: 'KST-077',
    slug: 'heavy-cotton-kimono-coat',
    name: 'Heavy Cotton Kimono Robe-Coat',
    category: 'Apparel',
    price: 220,
    summary: 'Structured architectural silhouette woven from unmercerized organic cotton. Double-needle stitch construction.',
    fullDescription: 'Designed as an all-season overlayer for relaxed studio life and city transit. Woven on narrow shuttle looms from 100% GOTS-certified organic cotton with a dry, tactile grain. Features deep inset hip pockets and an internal sash tie that allows you to wear it open or fastened.',
    stock: 11,
    featured: true,
    images: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=80',
    ],
    colors: [
      { name: 'Washed Terracotta', hex: '#B85D43', inStock: true },
      { name: 'Kuro Indigo', hex: '#18191B', inStock: true },
      { name: 'Bone Ash', hex: '#ECE8E1', inStock: true },
    ],
    specs: {
      'Fabric': '14oz Japanese organic selvedge canvas',
      'Dye': 'Low-impact mineral wash',
      'Stitching': 'Reinforced stress points with bar tacks',
      'Closure': 'Concealed internal organic cotton sash',
    },
    origin: 'Kurashiki, Okayama, Japan',
    dimensions: 'Unisex oversized drape (One Size / S-XL compatible)',
    careInstructions: 'Machine wash cold on gentle cycle. Hang dry in shade. Avoid chemical detergents.',
    reviews: [
      {
        id: 'rev-7',
        author: 'Lina B.',
        location: 'Paris, France',
        date: 'November 8, 2026',
        rating: 5,
        comment: 'Impeccable collar line and structural volume. It feels like wearing fine architecture.'
      }
    ]
  }
];

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}
