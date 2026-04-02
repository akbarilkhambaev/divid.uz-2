'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import Image from 'next/image';
import { RxFileText, RxPencil2 } from 'react-icons/rx';
import { GiPapers } from 'react-icons/gi';
import { HiCog, HiAcademicCap } from 'react-icons/hi';

export default function Sidebar() {
  const pathname = usePathname();

  const navLinks = [
    {
      label: 'Barcha xizmatlar',
      href: '/admin',
      icon: <RxFileText className="inline-flex mb-1" />,
    },

    {
      label: 'Kategoriya qo\u2018shish',
      href: '/admin/categories',
      icon: <RxPencil2 className="inline-flex mb-1" />,
    },
    {
      label: 'Podkategoriya qo\u2018shish',
      href: '/admin/subcategories',
      icon: <RxPencil2 className="inline-flex mb-1" />,
    },
    {
      label: 'Xizmat qo\u2018shish',
      href: '/admin/add',
      icon: <RxPencil2 className="inline-flex mb-1" />,
    },
    {
      label: 'Yangiliklar',
      href: '/admin/news',
      icon: <GiPapers className="inline-flex mb-1" />,
    },
    {
      label: 'Slayder',
      href: '/admin/slider',
      icon: <RxPencil2 className="inline-flex mb-1" />,
    },
    {
      label: 'Jamoa',
      href: '/admin/team',
      icon: <RxPencil2 className="inline-flex mb-1" />,
    },
    {
      label: 'Sharhlar',
      href: '/admin/reviews',
      icon: <RxPencil2 className="inline-flex mb-1" />,
    },
    {
      label: 'Hamkorlar',
      href: '/admin/partners',
      icon: <RxPencil2 className="inline-flex mb-1" />,
    },
    {
      label: 'Tajriba tarixchasi',
      href: '/admin/experience-timeline',
      icon: <RxPencil2 className="inline-flex mb-1" />,
    },
    {
      label: 'Akademiya',
      href: '/admin/academy',
      icon: <HiAcademicCap className="inline-flex mb-1" />,
    },
    {
      label: 'FAQ',
      href: '/admin/faq',
      icon: <RxPencil2 className="inline-flex mb-1" />,
    },
    {
      label: 'SEO Bo\u2018limlari',
      href: '/admin/seo-sections',
      icon: <RxPencil2 className="inline-flex mb-1" />,
    },
    {
      label: 'Xizmatlar (Asosiy)',
      href: '/admin/home-services',
      icon: <RxPencil2 className="inline-flex mb-1" />,
    },
    {
      label: 'Biz haqimizda',
      href: '/admin/about-us',
      icon: <RxPencil2 className="inline-flex mb-1" />,
    },
    {
      label: 'CRM - Arizalar',
      href: '/admin/crm',
      icon: <GiPapers className="inline-flex mb-1" />,
    },
    {
      label: 'Sozlamalar',
      href: '/admin/settings',
      icon: <HiCog className="inline-flex mb-1" />,
    },
  ];

  return (
    <aside className="fixed top-0 left-0 z-30 h-screen w-64 overflow-y-auto bg-white shadow-md p-4">
      <Image
        width={377}
        height={402}
        src="/DIVIDEND 1.svg"
        alt="feedback"
        className="pb-10 w-100"
      />
      <h2 className="text-xl font-bold mb-6">Admin-panel</h2>
      <nav className="space-y-2 row justify-center items-center">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={clsx(
              'block px-2 py-1 rounded hover:bg-gray-200',
              pathname === link.href && 'bg-gray-200 font-semibold',
            )}
          >
            {link.icon && <span className="mr-2">{link.icon}</span>}
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
