import './globals.css';
import { Inter } from 'next/font/google';
import LayoutWrapper from '@components/LayoutWrapper';

const inter = Inter({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata = {
  title: 'Dividendgroup.uz - Konsalting',
  description: 'Professional konsalting xizmatlari',
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="uz"
      className={`${inter.className} h-full`}
      suppressHydrationWarning
    >
      <head>
        <link
          rel="icon"
          type="image/x-icon"
          href="/favicon.ico"
        />
      </head>
      <body
        className="h-full flex flex-col bg-slate-950"
        suppressHydrationWarning
      >
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
