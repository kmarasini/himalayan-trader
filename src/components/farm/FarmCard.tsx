import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { MapPin, ArrowRight, Trees } from 'lucide-react'
import type { Farm } from '@/types'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

interface FarmCardProps {
  farm: Farm
}

export function FarmCard({ farm }: FarmCardProps) {
  return (
    <div className="group flex flex-col bg-white rounded-2xl border border-cream-200 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
      {/* Hero image */}
      <Link href={`/farms/${farm.slug}`} className="relative block aspect-[16/9] overflow-hidden bg-cream-100">
        <Image
          src={farm.images[0]}
          alt={farm.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5">
          <MapPin className="h-3.5 w-3.5 text-white" />
          <span className="text-sm font-medium text-white">{farm.region}</span>
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        {/* Farmer avatar + name */}
        <div className="flex items-center gap-3 mb-3">
          <div className="relative h-10 w-10 rounded-full overflow-hidden border-2 border-cream-200 flex-shrink-0">
            <Image
              src={farm.farmerImage}
              alt={farm.farmerName}
              fill
              className="object-cover"
              sizes="40px"
            />
          </div>
          <div>
            <p className="text-sm font-semibold text-charcoal-800">{farm.farmerName}</p>
            <p className="text-xs text-charcoal-500">{farm.farmerTitle}</p>
          </div>
        </div>

        <Link href={`/farms/${farm.slug}`}>
          <h3 className="font-serif text-xl font-semibold text-charcoal-900 group-hover:text-forest-700 transition-colors mb-2">
            {farm.name}
          </h3>
        </Link>

        <p className="text-sm text-charcoal-500 line-clamp-2 mb-4">{farm.shortBio}</p>

        {/* Stats row */}
        <div className="flex items-center gap-4 mb-4 text-xs text-charcoal-600">
          <span className="flex items-center gap-1">
            <Trees className="h-3.5 w-3.5 text-forest-600" />
            {farm.altitude.min}–{farm.altitude.max}m
          </span>
          <span>{farm.farmSize} ha</span>
          <span>Est. {farm.yearEstablished}</span>
        </div>

        {/* Certifications */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {farm.certifications.slice(0, 2).map((cert) => (
            <Badge key={cert} variant="outline" className="text-xs">
              {cert}
            </Badge>
          ))}
        </div>

        <Button variant="outline" size="sm" asChild className="mt-auto w-full">
          <Link href={`/farms/${farm.slug}`}>
            Farm Profile
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </Button>
      </div>
    </div>
  )
}
