import type { CoffeeLot } from '@/types'
import { farms } from './farms'

const [sherpa, gulmi, palpa, ilam, kaski] = farms

export const coffeeLots: CoffeeLot[] = [
  {
    id: 'lot-001',
    slug: 'solukhumbu-sunrise-washed',
    name: 'Solukhumbu Sunrise',
    tagline: 'High-altitude clarity from the Everest foothills',
    lotNumber: 'HTN-2024-001',
    origin: {
      country: 'Nepal',
      region: 'Solukhumbu',
      district: 'Khumbu Pasanglhamu',
      altitude: 1920,
      coordinates: { lat: 27.7867, lng: 86.7314 },
    },
    farm: sherpa,
    varietal: ['Typica', 'Bourbon'],
    processing: 'washed',
    harvestSeason: 'Winter Harvest',
    harvestYear: 2024,
    lotSize: 240,
    certifications: ['Organic', 'Direct Trade'],
    gradeScore: 87.5,
    cuppingProfile: {
      aroma: ['Jasmine', 'Brown Sugar', 'Green Apple'],
      flavor: ['Stone Fruit', 'Honey', 'Citrus Zest', 'Caramel'],
      aftertaste: 'Long, sweet finish with lingering florals',
      acidity: 'bright',
      body: 'medium',
      sweetness: 'high',
      overall: 87.5,
    },
    pricing: {
      retail: { '250g': 18.99, '500g': 34.99, '1kg': 64.99 },
      wholesale: { pricePerKg: 46.0, minimumKg: 25 },
    },
    images: [
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80',
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&q=80',
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&q=80',
    ],
    story: `Grown at nearly 2,000 metres in the shadow of the world's highest peaks, this lot represents the finest expression of Nepalese high-altitude coffee. The Sherpa family has been cultivating these terraced gardens for three generations, applying meticulous hand-picking and a traditional fully-washed process that showcases the inherent brightness of Typica at altitude.

The glacial spring water used in processing imparts a mineral clarity that is immediately apparent in the cup — this is a coffee that rewards careful brewing. At pour-over temperatures of 93–95°C it opens with jasmine and green apple; as the cup cools, stone fruit and caramel emerge. Body is medium-full, acidity is bright but not aggressive, and the finish lingers pleasantly for over a minute.

Only 240 kg of this lot exists. When it's gone, it's gone until the next harvest.`,
    shortDescription:
      'Bright and floral with stone fruit sweetness, from the Everest foothills at 1,920m.',
    available: true,
    featured: true,
    bestFor: ['Pour Over', 'Filter Drip', 'AeroPress'],
    dryingMethod: 'Raised bamboo beds, 21 days',
    millingLocation: 'Lukla Wet Mill, Solukhumbu',
    exportReadyDate: 'March 2025',
  },
  {
    id: 'lot-002',
    slug: 'gulmi-honey-process',
    name: 'Gulmi Golden Honey',
    tagline: 'Velvety sweetness from twelve cooperative families',
    lotNumber: 'HTN-2024-002',
    origin: {
      country: 'Nepal',
      region: 'Gulmi',
      district: 'Gulmi',
      altitude: 1620,
      coordinates: { lat: 28.0833, lng: 83.2667 },
    },
    farm: gulmi,
    varietal: ['Bourbon', 'Typica'],
    processing: 'honey',
    harvestSeason: 'Winter Harvest',
    harvestYear: 2024,
    lotSize: 380,
    certifications: ['Organic', 'Fair Trade'],
    gradeScore: 86.75,
    cuppingProfile: {
      aroma: ['Brown Sugar', 'Peach', 'Vanilla'],
      flavor: ['Dried Apricot', 'Milk Chocolate', 'Walnut', 'Cane Sugar'],
      aftertaste: 'Warm, chocolatey finish with dried fruit',
      acidity: 'medium',
      body: 'full',
      sweetness: 'high',
      overall: 86.75,
    },
    pricing: {
      retail: { '250g': 16.99, '500g': 30.99, '1kg': 56.99 },
      wholesale: { pricePerKg: 40.0, minimumKg: 25 },
    },
    images: [
      'https://images.unsplash.com/photo-1562888219-81427a9c36d3?w=800&q=80',
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80',
      'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800&q=80',
    ],
    story: `Honey processing in Nepal is a collective endeavour at Himalayan Heights. After depulping, each family's cherries retain a precise 50–60% mucilage layer, carefully controlled using custom-built pulpers calibrated by Bishnu himself. The cherries then dry on shared raised beds for 28 days, turned every four hours for the first week.

The result is a coffee that bridges the transparency of washed processing with the fruit-forward sweetness of natural. In the cup it's immediately welcoming: dried apricot and peach dominate, with a milk chocolate base that makes this an outstanding choice for milk-based espresso as well as filter brewing. The acidity is present but mellow, carried on a full, velvety body that distinguishes this from the region's typical washed lots.

This is a lot that works for a wide range of brewing methods and customer palates — a confident choice for roasters building an accessible origin-focused menu.`,
    shortDescription:
      'Velvety body with apricot, chocolate and brown sugar. Full-range honey process.',
    available: true,
    featured: true,
    bestFor: ['Espresso', 'Milk Drinks', 'Filter Drip', 'French Press'],
    dryingMethod: 'Raised bamboo beds, 28 days, 50% mucilage',
    millingLocation: 'Gulmi Cooperative Processing Station',
    exportReadyDate: 'February 2025',
  },
  {
    id: 'lot-003',
    slug: 'palpa-natural-bourbon',
    name: 'Palpa Natural',
    tagline: 'Nepal\'s finest natural process — clean and fruit-forward',
    lotNumber: 'HTN-2024-003',
    origin: {
      country: 'Nepal',
      region: 'Palpa',
      district: 'Palpa',
      altitude: 1480,
      coordinates: { lat: 27.8667, lng: 83.5333 },
    },
    farm: palpa,
    varietal: ['Bourbon'],
    processing: 'natural',
    harvestSeason: 'Winter Harvest',
    harvestYear: 2024,
    lotSize: 190,
    certifications: ['Organic', 'Women-Owned'],
    gradeScore: 88.0,
    cuppingProfile: {
      aroma: ['Blueberry', 'Dark Cherry', 'Floral'],
      flavor: ['Ripe Strawberry', 'Blackcurrant', 'Dark Chocolate', 'Wine'],
      aftertaste: 'Rich berry finish, grape-like wine notes',
      acidity: 'vibrant',
      body: 'full',
      sweetness: 'high',
      overall: 88.0,
    },
    pricing: {
      retail: { '250g': 21.99, '500g': 40.99, '1kg': 76.99 },
      wholesale: { pricePerKg: 56.0, minimumKg: 20 },
    },
    images: [
      'https://images.unsplash.com/photo-1611854779393-1b2da9d400fe?w=800&q=80',
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&q=80',
      'https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?w=800&q=80',
    ],
    story: `Sita Devi's natural process protocol has been refined over twelve years of experiment. Whole cherries are sorted in water (floaters removed), then spread on raised bamboo beds at a depth of no more than 3cm — far thinner than the industry norm. This shallow bed allows airflow on all sides and dramatically reduces the risk of uneven fermentation.

The result is a natural-process coffee with unusual clarity. There are no fermentation defects, no vegetal notes, no over-ripe funk: just clean, intense fruit. Blueberry and dark cherry dominate the aroma; the flavour profile delivers ripe strawberry, blackcurrant and a dark chocolate base with a wine-like acidity that makes this one of the most distinctive Nepalese lots available.

This lot scored 88.0 by a licensed Q-grader in Kathmandu and has been accepted into a Tokyo micro-roasters competition. Extremely limited — only 190kg exists.`,
    shortDescription:
      'Intense berry and dark chocolate. Nepal\'s most impressive natural process lot.',
    available: true,
    featured: true,
    bestFor: ['Pour Over', 'Cold Brew', 'AeroPress'],
    dryingMethod: 'Raised bamboo beds, 3cm depth, 35 days',
    millingLocation: 'Ancient Palpa Estate dry mill',
    exportReadyDate: 'April 2025',
  },
  {
    id: 'lot-004',
    slug: 'ilam-first-flush-washed',
    name: 'Ilam First Flush',
    tagline: 'Eastern Nepal\'s bergamot brightness, harvested first of season',
    lotNumber: 'HTN-2024-004',
    origin: {
      country: 'Nepal',
      region: 'Ilam',
      district: 'Ilam',
      altitude: 1680,
      coordinates: { lat: 26.9133, lng: 87.9267 },
    },
    farm: ilam,
    varietal: ['Typica', 'Local Heritage'],
    processing: 'washed',
    harvestSeason: 'Early Winter Harvest',
    harvestYear: 2024,
    lotSize: 480,
    certifications: ['Organic', 'UTZ Certified', 'Direct Trade'],
    gradeScore: 86.25,
    cuppingProfile: {
      aroma: ['Bergamot', 'Lime Blossom', 'Black Tea'],
      flavor: ['Earl Grey', 'Meyer Lemon', 'Jasmine', 'Nougat'],
      aftertaste: 'Clean, tea-like, refreshing',
      acidity: 'bright',
      body: 'light',
      sweetness: 'medium',
      overall: 86.25,
    },
    pricing: {
      retail: { '250g': 15.99, '500g': 28.99, '1kg': 52.99 },
      wholesale: { pricePerKg: 37.0, minimumKg: 50 },
    },
    images: [
      'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&q=80',
      'https://images.unsplash.com/photo-1596952954288-16862d37405b?w=800&q=80',
      'https://images.unsplash.com/photo-1481833761820-0509d3217039?w=800&q=80',
    ],
    story: `Ilam district shares a border with the Darjeeling tea estates, and experienced tasters immediately detect a kinship. The "first flush" designation here mirrors tea tradition: this lot is from the very first picking of the season, before the main harvest. First-flush cherries are the most selectively picked, chosen exclusively when they reach deep burgundy — never the transitional red that suffices for later lots.

The washed process uses cold water from the upper Ilam river tributaries, producing a cup of exceptional brightness and clarity. Bergamot and lime blossom are the defining aroma notes; in the cup, Earl Grey and Meyer lemon give way to a delicate jasmine and nougat finish. The body is lighter than Nepal's western lots — this is coffee designed for clarity, not weight.

An exceptional single-origin filter option for roasters whose customers appreciate tea-like complexity and aromatic precision. Available in larger volume given the cooperative's scale.`,
    shortDescription:
      'Earl Grey brightness and jasmine aromatics — Nepal\'s most tea-like single origin.',
    available: true,
    featured: false,
    bestFor: ['Pour Over', 'Filter Drip', 'Cold Brew', 'Chemex'],
    dryingMethod: 'Raised beds, 18 days',
    millingLocation: 'Ilam Sunrise Cooperative Central Mill',
    exportReadyDate: 'January 2025',
  },
  {
    id: 'lot-005',
    slug: 'kaski-annapurna-washed',
    name: 'Kaski Annapurna Reserve',
    tagline: 'Mineral-clean sweetness from glacier-fed washing',
    lotNumber: 'HTN-2024-005',
    origin: {
      country: 'Nepal',
      region: 'Kaski',
      district: 'Kaski',
      altitude: 1780,
      coordinates: { lat: 28.2096, lng: 83.9856 },
    },
    farm: kaski,
    varietal: ['Typica'],
    processing: 'washed',
    harvestSeason: 'Winter Harvest',
    harvestYear: 2024,
    lotSize: 160,
    certifications: ['Organic', 'Direct Trade'],
    gradeScore: 87.0,
    cuppingProfile: {
      aroma: ['White Peach', 'Honeysuckle', 'Almond'],
      flavor: ['Nectarine', 'Brown Sugar', 'Lemon Verbena', 'Butterscotch'],
      aftertaste: 'Sweet, clean, almond finish',
      acidity: 'medium',
      body: 'medium',
      sweetness: 'high',
      overall: 87.0,
    },
    pricing: {
      retail: { '250g': 17.99, '500g': 32.99, '1kg': 60.99 },
      wholesale: { pricePerKg: 44.0, minimumKg: 20 },
    },
    images: [
      'https://images.unsplash.com/photo-1466976498618-c1a89b45c697?w=800&q=80',
      'https://images.unsplash.com/photo-1512568400610-62da28bc8a13?w=800&q=80',
      'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800&q=80',
    ],
    story: `The Annapurna Conservation Area's strict agricultural controls mean that Dinesh's trees develop in slow, organic rhythms dictated entirely by season and elevation. At 1,780m average altitude, the growing season extends four to six weeks beyond lower farms, allowing sugars to concentrate in the cherry before the winter's first frost triggers the final ripening.

What sets this lot apart is the washing water. Glacier-fed spring water at 7–9°C imparts a mineral clarity that no chlorinated municipal supply can replicate. The water's natural calcium content acts as a buffer, stabilising the coffee's pH during fermentation and preventing the sour defects that plague lower-altitude Nepal lots in wet conditions.

In the cup, white peach and honeysuckle open the aroma. Nectarine and brown sugar lead the flavour, with a lemon verbena acidity that's clean and integrated rather than sharp. The butterscotch finish lingers. A balanced, crowd-pleasing lot that also has the nuance to reward careful brewing.`,
    shortDescription:
      'White peach, butterscotch and clean sweetness. Annapurna Conservation Area.',
    available: true,
    featured: false,
    bestFor: ['Espresso', 'Pour Over', 'Filter Drip', 'Milk Drinks'],
    dryingMethod: 'Raised beds, 20 days, hand-turned every 6h',
    millingLocation: 'Kaski Alpine Gardens on-site mill',
    exportReadyDate: 'March 2025',
  },
  {
    id: 'lot-006',
    slug: 'jumla-high-altitude-heritage',
    name: 'Jumla Heritage Lot',
    tagline: 'Nepal\'s highest-grown coffee — extreme altitude, extreme rarity',
    lotNumber: 'HTN-2024-006',
    origin: {
      country: 'Nepal',
      region: 'Karnali',
      district: 'Jumla',
      altitude: 2180,
      coordinates: { lat: 29.2747, lng: 82.1837 },
    },
    farm: sherpa,
    varietal: ['Local Heritage Variety', 'Typica'],
    processing: 'washed',
    harvestSeason: 'Late Winter Harvest',
    harvestYear: 2024,
    lotSize: 85,
    certifications: ['Organic', 'Direct Trade', 'Altitude Verified'],
    gradeScore: 89.25,
    cuppingProfile: {
      aroma: ['Jasmine', 'Bergamot', 'Rose Water', 'Peach Blossom'],
      flavor: ['White Peach', 'Lychee', 'Honey', 'Vanilla', 'Apricot'],
      aftertaste: 'Exceptional length, jasmine and honey, 90+ seconds',
      acidity: 'vibrant',
      body: 'medium',
      sweetness: 'high',
      overall: 89.25,
    },
    pricing: {
      retail: { '250g': 29.99, '500g': 54.99, '1kg': 99.99 },
      wholesale: { pricePerKg: 74.0, minimumKg: 10 },
    },
    images: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&q=80',
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80',
    ],
    story: `At 2,180 metres, this is among the highest-grown arabica in the world. Jumla's extreme altitude means a growing season stretched to near eighteen months. The trees here — some over sixty years old, local heritage varieties with no known cultivar designation — produce tiny, dense beans that take on a complexity that lower-altitude growing simply cannot manufacture.

Temperature swings of 25°C between day and night force the coffee plant into almost suspended animation during the cold months, allowing slow sugar conversion and remarkable aromatic development. The result is a lot that qualified Q-grader Ramesh Adhikari scored at 89.25 — the highest score ever recorded by HimalayanTrader for a Nepalese lot.

Only 85 kg of this lot exists. At this altitude, production is always unpredictable: the 2024 lot is the first we have been able to export from Jumla in three years. For collectors, competition roasters, and roasteries with adventurous menus, this is unmissable.`,
    shortDescription:
      'World-class 89.25 scoring. Nepal\'s highest-grown lot at 2,180m. 85kg only.',
    available: true,
    featured: true,
    bestFor: ['Pour Over', 'Chemex', 'Competition Use'],
    dryingMethod: 'Raised beds, 25 days, cold-climate slow-dry',
    millingLocation: 'Jumla Community Wet Mill',
    exportReadyDate: 'May 2025',
  },
]

export function getLotBySlug(slug: string): CoffeeLot | undefined {
  return coffeeLots.find((lot) => lot.slug === slug)
}

export function getFeaturedLots(): CoffeeLot[] {
  return coffeeLots.filter((lot) => lot.featured && lot.available)
}

export function getLotsByRegion(region: string): CoffeeLot[] {
  return coffeeLots.filter(
    (lot) => lot.origin.region.toLowerCase() === region.toLowerCase(),
  )
}

export function getLotsByProcessing(method: string): CoffeeLot[] {
  return coffeeLots.filter((lot) => lot.processing === method)
}

export function getAvailableLots(): CoffeeLot[] {
  return coffeeLots.filter((lot) => lot.available)
}
