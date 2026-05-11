import Link from 'next/link'
import { Mountain, Mail, Instagram, Linkedin } from 'lucide-react'

const footerLinks = {
  Business: [
    { label: 'Wholesale', href: '/wholesale' },
    { label: 'Sample Requests', href: '/wholesale#samples' },
    { label: 'Pricing Tiers', href: '/wholesale#pricing' },
    { label: 'Export Docs', href: '/wholesale#docs' },
  ],
  Company: [
    { label: 'About Us', href: '/about' },
    { label: 'Sourcing Story', href: '/about#sourcing' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
  ],
}

export function Footer() {
  return (
    <footer className="bg-forest-900 text-cream-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top */}
        <div className="py-16 grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-himalaya-500 text-white">
                <Mountain className="h-4 w-4" />
              </div>
              <span className="font-serif text-lg font-bold text-white">
                HimalayanTrader
              </span>
            </Link>
            <p className="text-sm text-cream-300 leading-relaxed mb-6">
              Direct-trade green coffee from Nepal's finest small-lot farms.
              Full lot traceability from farmer to roaster.
            </p>
            <div className="flex gap-3">
              <a
                href="mailto:hello@himalayantrader.com"
                className="text-cream-400 hover:text-himalaya-400 transition-colors"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com/himalayantrader"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cream-400 hover:text-himalaya-400 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com/company/himalayantrader"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cream-400 hover:text-himalaya-400 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                {heading}
              </h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-cream-400 hover:text-himalaya-400 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-forest-700 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-cream-500">
            © {new Date().getFullYear()} Himalayan Origin Imports LLC. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-xs text-cream-500">
              🌱 Certified Organic &nbsp;·&nbsp; ✓ Direct Trade &nbsp;·&nbsp; 🇳🇵 Nepal Origin
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
