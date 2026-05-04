import Link from "next/link"
import { COMPANY_NAME, NAV_LINKS, SERVICES, CONTACT_EMAIL, CONTACT_PHONE, ADDRESS } from "@/constants"
import { Heading } from "@/components/ui/heading"
import { Text } from "@/components/ui/text"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/ui/container"

export function Footer() {
  return (
    <footer className="bg-primary-950 text-white pt-20 pb-10">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="flex flex-col gap-6">
            <Link href="/" className="font-heading text-3xl font-bold text-white tracking-tight">
              EVP.
            </Link>
            <Text variant="light" size="sm" className="max-w-xs text-primary-200 leading-relaxed">
              Thoughtfully crafted, beautifully produced. We bring your story to life with premium publishing support from start to finish.
            </Text>
            <div className="flex flex-col gap-1 mt-2">
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-sm font-body text-white hover:text-secondary-400 transition-colors">
                {CONTACT_EMAIL}
              </a>
              <a href={`tel:${CONTACT_PHONE.replace(/[^0-9+]/g, '')}`} className="text-sm font-body text-white hover:text-secondary-400 transition-colors">
                {CONTACT_PHONE}
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-6 lg:pl-8">
            <Heading as="h4" size="h6" className="text-white uppercase tracking-wider text-sm">Quick Links</Heading>
            <ul className="flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-primary-300 hover:text-white transition-colors text-sm font-body inline-flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="flex flex-col gap-6">
            <Heading as="h4" size="h6" className="text-white uppercase tracking-wider text-sm">Services</Heading>
            <ul className="flex flex-col gap-3">
              {SERVICES.slice(0, 5).map((service) => (
                <li key={service.title}>
                  <Link href={service.href} className="text-primary-300 hover:text-white transition-colors text-sm font-body inline-flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div className="flex flex-col gap-6">
            <Heading as="h4" size="h6" className="text-white uppercase tracking-wider text-sm">Stay Updated</Heading>
            <Text variant="light" size="sm" className="text-primary-200">
              Subscribe to our newsletter for publishing insights and exclusive offers.
            </Text>
            <form className="flex flex-col gap-3 mt-2" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Email Address" 
                className="bg-primary-900 border border-primary-800 text-white px-4 py-3 rounded-sm focus:outline-none focus:ring-1 focus:ring-secondary-400 text-sm font-body placeholder:text-primary-500 w-full"
              />
              <Button variant="secondary" className="w-full">Subscribe</Button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <Text variant="light" size="xs" className="text-primary-400">
            © {new Date().getFullYear()} {COMPANY_NAME}. All rights reserved.
          </Text>
          <div className="flex gap-6">
            <Link href="/privacy-policy" className="text-primary-400 hover:text-white text-xs font-body transition-colors">Privacy Policy</Link>
            <Link href="/terms-and-conditions" className="text-primary-400 hover:text-white text-xs font-body transition-colors">Terms & Conditions</Link>
          </div>
        </div>
      </Container>
    </footer>
  )
}
