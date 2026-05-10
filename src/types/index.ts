export type ProcessingMethod = 'washed' | 'natural' | 'honey' | 'wet-hulled'
export type AcidityLevel = 'low' | 'medium' | 'bright' | 'vibrant'
export type BodyLevel = 'light' | 'medium' | 'full'
export type SweetnessLevel = 'low' | 'medium' | 'high'
export type CartItemSize = '250g' | '500g' | '1kg'

export interface Origin {
  country: 'Nepal'
  region: string
  district: string
  altitude: number
  coordinates?: { lat: number; lng: number }
}

export interface CuppingProfile {
  aroma: string[]
  flavor: string[]
  aftertaste: string
  acidity: AcidityLevel
  body: BodyLevel
  sweetness: SweetnessLevel
  overall: number
}

export interface RetailPricing {
  '250g': number
  '500g': number
  '1kg': number
}

export interface WholesalePricing {
  pricePerKg: number
  minimumKg: number
}

export interface Pricing {
  retail: RetailPricing
  wholesale: WholesalePricing
}

export interface Farm {
  id: string
  slug: string
  name: string
  farmerName: string
  farmerTitle: string
  farmerImage: string
  region: string
  district: string
  altitude: { min: number; max: number }
  farmSize: number
  treesCount: number
  certifications: string[]
  story: string
  shortBio: string
  images: string[]
  coordinates?: { lat: number; lng: number }
  yearEstablished: number
  familyGenerations: number
  lotsPerYear: number
}

export interface CoffeeLot {
  id: string
  slug: string
  name: string
  tagline: string
  origin: Origin
  farm: Farm
  varietal: string[]
  processing: ProcessingMethod
  harvestSeason: string
  harvestYear: number
  lotSize: number
  lotNumber: string
  certifications: string[]
  gradeScore: number
  cuppingProfile: CuppingProfile
  pricing: Pricing
  images: string[]
  story: string
  shortDescription: string
  available: boolean
  featured: boolean
  bestFor: string[]
  dryingMethod: string
  millingLocation: string
  exportReadyDate: string
}

export interface CartItem {
  lotId: string
  lotSlug: string
  lotNumber: string
  name: string
  size: CartItemSize
  price: number
  quantity: number
  image: string
}

export interface WholesaleInquiry {
  companyName: string
  contactName: string
  email: string
  phone?: string
  country: string
  monthlyVolume: string
  interestedLots: string[]
  message: string
}

export interface ShippingAddress {
  name: string
  email: string
  line1: string
  line2?: string
  city: string
  state: string
  postalCode: string
  country: string
}
