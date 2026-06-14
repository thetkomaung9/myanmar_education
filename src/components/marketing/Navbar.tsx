'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, GraduationCap } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { LanguageToggle } from './LanguageToggle';

const navLinks = [
  { key: 'nav.features', href: '/features' },
  { key: 'nav.howItWorks', href: '/#how-it-works' },
  { key: 'nav.pricing', href: '/pricing' },
  { key: 'nav.about', href: '/about' },
  { key: 'nav.contact', href: '/contact' },
];

export function Navbar() {
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full bg-background/95 backdrop-blur-sm transition-shadow duration-150 ${
        scrolled ? 'shadow-md' : 'shadow-none'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8" aria-label="Main navigation">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-brand-600 text-lg">
          <GraduationCap className="h-7 w-7" aria-hidden="true" />
          <span>EduSphere</span>
          <span className="text-neutral-600 font-normal text-sm hidden sm:inline">Myanmar</span>
        </Link>

        {/* Desktop nav links */}
        <ul className="hidden md:flex items-center gap-6 text-sm font-medium" role="list">
          {navLinks.map(({ key, href }) => (
            <li key={key}>
              <Link
                href={href}
                className="text-neutral-600 hover:text-brand-600 transition-colors"
              >
                {t(key)}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop right controls */}
        <div className="hidden md:flex items-center gap-3">
          <LanguageToggle />
          <Link
            href="/contact"
            className="rounded-md bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
          >
            {t('nav.requestDemo')}
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden rounded-md p-2 text-neutral-600 hover:text-brand-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div id="mobile-menu" className="md:hidden border-t border-neutral-200 bg-background px-4 pb-4 pt-2">
          <ul className="flex flex-col gap-1" role="list">
            {navLinks.map(({ key, href }) => (
              <li key={key}>
                <Link
                  href={href}
                  className="block rounded-md px-3 py-2 text-sm font-medium text-neutral-700 hover:bg-brand-50 hover:text-brand-600 transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {t(key)}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-3 flex items-center gap-3 border-t border-neutral-200 pt-3">
            <LanguageToggle />
            <Link
              href="/contact"
              className="flex-1 rounded-md bg-brand-600 px-4 py-2 text-center text-sm font-semibold text-white hover:bg-brand-800 transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {t('nav.requestDemo')}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
