import Link from 'next/link';
import { GraduationCap, Mail, Github, Instagram, Youtube } from 'lucide-react';

const productLinks = [
  { label: 'Features', href: '/features' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'How It Works', href: '/#how-it-works' },
];

const companyLinks = [
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

const supportLinks = [{ label: 'Request Demo', href: '/contact' }];

export function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-neutral-50 dark:bg-neutral-900 dark:border-neutral-800">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link
              href="/"
              className="flex items-center gap-2 font-bold text-brand-600 text-lg mb-3"
            >
              <GraduationCap className="h-6 w-6" aria-hidden="true" />
              <span>EduSphere Myanmar</span>
            </Link>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 max-w-[200px]">
              Transforming Myanmar&apos;s education through technology.
            </p>
            {/* Social links */}
            <div className="mt-4 flex gap-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="text-neutral-400 hover:text-brand-600 transition-colors"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-neutral-400 hover:text-brand-600 transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="text-neutral-400 hover:text-brand-600 transition-colors"
              >
                <Youtube className="h-5 w-5" />
              </a>
              <a
                href="mailto:info@edusphere.mm"
                aria-label="Email"
                className="text-neutral-400 hover:text-brand-600 transition-colors"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 mb-3">
              Product
            </h3>
            <ul className="space-y-2" role="list">
              {productLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-brand-600 transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 mb-3">
              Company
            </h3>
            <ul className="space-y-2" role="list">
              {companyLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-brand-600 transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 mb-3">
              Support
            </h3>
            <ul className="space-y-2" role="list">
              {supportLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-brand-600 transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-neutral-200 dark:border-neutral-800 pt-6 text-center text-xs text-neutral-500 dark:text-neutral-500">
          © {new Date().getFullYear()} EduSphere Myanmar · Developed by iTech Solutions. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
}
