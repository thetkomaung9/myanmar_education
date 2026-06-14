import type { Metadata } from 'next';
import { Inter, Noto_Sans } from 'next/font/google';
import '@/styles/globals.css';
import { ThemeProvider } from '@/components/shared/ThemeProvider';
import { ToastProvider } from '@/components/shared/ToastProvider';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

// Noto Sans is used as a Unicode-compatible fallback; Myanmar-specific glyphs
// are served by Noto Sans Myanmar loaded in globals.css via @font-face.
const notoSans = Noto_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-noto',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'EduSphere Myanmar — School Management & E-Class Platform',
    template: '%s | EduSphere Myanmar',
  },
  description:
    'EduSphere Myanmar is a comprehensive school management and e-class system designed for Myanmar schools — developed by iTech Solutions.',
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? 'https://edusphere.mm'
  ),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${notoSans.variable} font-sans antialiased`}>
        <ThemeProvider>
          <ToastProvider />
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
