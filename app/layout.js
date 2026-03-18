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
  title: 'Divid.uz - Консалтинг',
  description: 'Профессиональные консалтинговые услуги',
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="ru"
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
        className="h-full flex flex-col"
        suppressHydrationWarning
      >
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
