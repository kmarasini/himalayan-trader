import { getLotBySlug, coffeeLots } from '@/lib/products'
import { notFound } from 'next/navigation'
import { ProductDetailClient } from '@/components/product/ProductDetailClient'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return coffeeLots.map((lot) => ({ slug: lot.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const lot = getLotBySlug(slug)
  if (!lot) return { title: 'Product not found' }
  return {
    title: `${lot.name} — Specialty Green Coffee · HimalayanTrader`,
    description: lot.tagline,
  }
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params
  const lot = getLotBySlug(slug)
  if (!lot) notFound()
  return <ProductDetailClient lot={lot} />
}
