import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center gap-6 px-4 text-center bg-cream-50">
      <p className="font-mono text-himalaya-600 font-bold text-6xl">404</p>
      <h1 className="font-serif text-3xl font-bold text-charcoal-900">
        Page not found
      </h1>
      <p className="text-charcoal-500 max-w-sm">
        This page has moved, or the lot you're looking for may already be sold out.
      </p>
      <div className="flex gap-3">
        <Button asChild>
          <Link href="/shop">Shop lots</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/">Home</Link>
        </Button>
      </div>
    </div>
  )
}
