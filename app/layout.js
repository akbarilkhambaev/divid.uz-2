'use client';
import './globals.css'; // Tailwind стили
import { Roboto, Oswald, Inter } from 'next/font/google';
import Header from '@components/Header';
import Footer from '@components/Footer';
import { usePathname } from 'next/navigation';

const roboto = Roboto({
  weight: ['400', '700'],
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
});

const oswald = Oswald({
  weight: ['400', '700'],
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  variable: '--font-oswald',
  fallback: ['sans-serif'],
  fallbackWeight: '400',
  fallbackStyle: 'normal',
  fallbackDisplay: 'swap',
  fallbackLineHeight: '1.5',
  fallbackLetterSpacing: '0',
  fallbackFontFeatureSettings: 'normal',
  fallbackFontVariationSettings: 'normal',
  fallbackFontSynthesis: 'weight style size',
  fallbackFontKerning: 'auto',
  fallbackFontLanguageOverride: 'en',
  fallbackFontSize: '1rem',
});

const inter = Inter({
  weight: ['400', '700'],
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  variable: '--font-oswald',
  fallback: ['sans-serif'],
  fallbackWeight: '400',
  fallbackStyle: 'normal',
  fallbackDisplay: 'swap',
  fallbackLineHeight: '1.5',
  fallbackLetterSpacing: '0',
  fallbackFontFeatureSettings: 'normal',
  fallbackFontVariationSettings: 'normal',
  fallbackFontSynthesis: 'weight style size',
  fallbackFontKerning: 'auto',
  fallbackFontLanguageOverride: 'en',
  fallbackFontSize: '1rem',
});

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith('/admin');
  return (
    <html
      lang="ru"
      className={`${oswald.className} h-full`}
    >
      <body className="h-full flex flex-col">
        {!isAdmin && <Header />}

        <main className="flex-1 max-w-screen">{children}</main>
        {!isAdmin && <Footer />}
      </body>
    </html>
  );
}
