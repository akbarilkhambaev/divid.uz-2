'use client';

import { usePathname } from 'next/navigation';
import Header from '@components/Header';
import Footer from '@components/Footer';

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');
  const isAcademy = pathname?.startsWith('/academy');
  const isServices = pathname?.startsWith('/services');

  return (
    <>
      {!isAdmin && !isAcademy && <Header />}
      <main className="flex-1 max-w-screen">{children}</main>
      {!isAdmin && !isAcademy && !isServices && <Footer />}
    </>
  );
}
